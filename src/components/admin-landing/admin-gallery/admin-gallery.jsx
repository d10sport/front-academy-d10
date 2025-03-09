import { useContext, useState, useEffect } from "react";
// import getTokenDecoded from "../../../token/token-data.js";
import AddImg from "./add-img/add-img.jsx";
import EditImg from "./edit-img/edit-img.jsx";
import DeleteImg from "./delete-img/delete-img.jsx";
import AppContext from "@context/app/app-context";
import axios from "axios";
import "./admin-gallery.css";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [modalIsOpenOne, setModalIsOpenOne] = useState(false);
  const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);
  const [modalIsOpenThree, setModalIsOpenThree] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);

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
                  <button
                    onClick={() => {
                      setSelectedIndex(index);
                      setModalIsOpenTwo(true);
                    }}
                    className="btn-update__gallery"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIndex(index);
                      setModalIsOpenThree(true);
                    }}
                    className="btn-delete__gallery"
                  >
                    Delete
                  </button>
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
      ></AddImg>

      <EditImg
        isOpen={modalIsOpenTwo}
        onClose={() => setModalIsOpenTwo(false)}
        indice={selectedIndex}
        refreshCourses={() => getDataGallery()}
      ></EditImg>

      <DeleteImg
        isOpen={modalIsOpenThree}
        onClose={() => setModalIsOpenThree(false)}
        indice={selectedIndex}
        refreshCourses={() => getDataGallery()}
      ></DeleteImg>
    </>
  );
}
