import { useContext, useState, useEffect } from "react";
// import getTokenDecoded from "../../../token/token-data.js";
import AddImg from "./add-img/add-img.jsx";
import AppContext from "@context/app/app-context";
import axios from "axios";
import "./admin-gallery.css";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  // const [isEditing, setIsEditing] = useState(false);
  const [modalIsOpenOne, setModalIsOpenOne] = useState(false);
  const [indice, setIndice] = useState(false)

  const [sectionOne, setSectionOne] = useState({
    gallery: "",
  });

  function getDataGallery() {
    axios
      .get(`${urlApi}landing/g/gallery`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (response.data?.length == 0 || response.data[0] == undefined) return;
        setSectionOne(response.data[0].section_one);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // function handleGetIndex(indice){

  // }

  // ----------------------------- Update Home ---------------------------------

  // async function handleUpdateHome() {
  //   try {
  //     const response = await axios.put(
  //       `${urlApi}landing/u/update-home/1`,
  //       sectionOne,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "api-key": apiKey,
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       console.log("Datos actualizados con éxito:", response.data);
  //       setIsEditing(false);
  //     } else {
  //       console.error("Error en la actualización:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error en la solicitud de actualización:", error);
  //   }
  // }

  // ----------------------------- Update Nosotros ---------------------------------

  // async function handleUpdateNosotros() {
  //   try {
  //     const response = await axios.put(
  //       `${urlApi}landing/u/update-nosotros/1`,
  //       sectionTwo,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "api-key": apiKey,
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       console.log("Datos actualizados con éxito:", response.data);
  //       setIsEditing(false);
  //     } else {
  //       console.error("Error en la actualización:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error en la solicitud de actualización:", error);
  //   }
  // }

  // -----------------------------------------------------------------------------

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getDataGallery();
    }
  }, [context.token]);

  return (
    <>
      <section className="gallery" id="section-destination-galeria">
        <h1 className="title__gallery">Galería</h1>
        <button
          onClick={() => setModalIsOpenOne(true)}
          className="btn-add__gallery"
        >
          Add Img
        </button>
        <ul className="list__gallery">
          {sectionOne.length > 0 ? (
            sectionOne.map((item, index) => (
              <li key={index} className="item__gallery">
                <img
                  className="img__gallery"
                  src={item.gallery}
                  alt={`Img ${index + 1}`}
                />
                <div className="cntr-btn__gallery">
                  <button className="btn-update__gallery" >Update</button>
                  <button className="btn-delete__gallery">Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay imágenes disponibles</p>
          )}
        </ul>
      </section>

      <AddImg
        isOpen={modalIsOpenOne}
        onClose={() => setModalIsOpenOne(false)}
        index={indice}
      ></AddImg>
    </>
  );
}
