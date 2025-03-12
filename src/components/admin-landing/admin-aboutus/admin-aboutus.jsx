import { useContext, useState, useEffect } from "react";
import AppContext from "@context/app/app-context";
// import "./admin-aboutus.css";
import axios from "axios";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [isEditing, setIsEditing] = useState(false);

  // --------------------------------------

  const [sectionOneAboutUs, setSectionOneAboutUs] = useState({
    title: "",
    description: "",
  });

  const [sectionTwoAboutUs, setSectionTwoAboutUs] = useState({
    title1: "",
    title2: "",
    bg_photo: "",
    subtitle: "",
    description: "",
  });

  const [sectionThreeAboutUs, setSectionThreeAboutUs] = useState({
    title: "",
    description: "",
  });

  const [sectionFourAboutUs, setSectionFourAboutUs] = useState({
    title: "",
    bg_photo: "",
    description: "",
  });

  const [sectionSixAboutUs, setSectionSixAboutUs] = useState({
    title: "",
    bg_photo: "",
    description: "",
  });

  function getDataAbout() {
    axios
      .get(`${urlApi}landing/g/aboutus`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (response.data?.length == 0 || response.data[0] == undefined) return;
        setSectionOneAboutUs(response.data[0].section_one);
        setSectionTwoAboutUs(response.data[0].section_two);
        setSectionThreeAboutUs(response.data[0].section_three);
        setSectionFourAboutUs(response.data[0].section_four);
        setSectionSixAboutUs(response.data[0].section_six);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ----------------------------- Update About Us Conócenos ---------------------------------

  async function handleUpdateAboutUsConocenos() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-conocenos/1`,
        sectionOneAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        setIsEditing(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Fundador ---------------------------------

  async function handleUpdateAboutUsFundador() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-fundador/1`,
        sectionTwoAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        setIsEditing(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Objetivos ---------------------------------

  async function handleUpdateAboutUsObjetivos() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-objetivos/1`,
        sectionThreeAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        setIsEditing(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Misión ---------------------------------

  async function handleUpdateAboutUsMision() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-mision/1`,
        sectionFourAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        setIsEditing(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Vision ---------------------------------

  async function handleUpdateAboutUsVision() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-vision/1`,
        sectionSixAboutUs,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        setIsEditing(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // -----------------------------------------------------------------------------

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getDataAbout();
    }
  }, [context.token]);

  return (
    <>
      <h1 className="title__admin-section">Nosotros</h1>

      <ul className="list__admin-section">
        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Conócenos</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionOneAboutUs.title}
            onChange={(e) =>
              setSectionOneAboutUs({
                ...sectionOneAboutUs,
                title: e.target.value,
              })
            }
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionOneAboutUs.description}
            onChange={(e) =>
              setSectionOneAboutUs({
                ...sectionOneAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsConocenos}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditing(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Fundador</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionTwoAboutUs.title1}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                title1: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="input__admin-section"
            value={sectionTwoAboutUs.title2}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                title2: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="input__admin-section"
            value={sectionTwoAboutUs.subtitle}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                subtitle: e.target.value,
              })
            }
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionTwoAboutUs.description}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsFundador}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditing(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Objetivos</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionThreeAboutUs.title}
            onChange={(e) =>
              setSectionThreeAboutUs({
                ...sectionThreeAboutUs,
                title: e.target.value,
              })
            }
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionThreeAboutUs.description}
            onChange={(e) =>
              setSectionThreeAboutUs({
                ...sectionThreeAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsObjetivos}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditing(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Misión</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionFourAboutUs.title}
            onChange={(e) =>
              setSectionFourAboutUs({
                ...sectionFourAboutUs,
                title: e.target.value,
              })
            }
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionFourAboutUs.description}
            onChange={(e) =>
              setSectionFourAboutUs({
                ...sectionFourAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsMision}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditing(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Visión</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionSixAboutUs.title}
            onChange={(e) =>
              setSectionSixAboutUs({
                ...sectionSixAboutUs,
                title: e.target.value,
              })
            }
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionSixAboutUs.description}
            onChange={(e) =>
              setSectionSixAboutUs({
                ...sectionSixAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAboutUsVision}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditing(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditing(true)}
            >
              Editar
            </button>
          )}
        </li>
      </ul>
    </>
  );
}
