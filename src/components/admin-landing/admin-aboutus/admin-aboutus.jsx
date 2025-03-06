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

  const [sectionFourAboutUs, setSectioFourAboutUs] = useState({
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
        setSectioFourAboutUs(response.data[0].section_four);
        setSectionSixAboutUs(response.data[0].section_six);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // --------------------------------------

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getDataAbout();
    }
  }, [context.token]);

  return (
    <>
      {/* --------------- */}
      {/* -- Nosotros -- */}
      {/* --------------- */}

      <h1 className="title__admin-section">Nosotros</h1>

      <ul className="list__admin-section">
        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Conócenos</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionOneAboutUs.title}
            readOnly
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionOneAboutUs.description}
            readOnly
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => console.log("Lógica de edición aquí")}
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
            readOnly
          />

          <input
            type="text"
            className="input__admin-section"
            value={sectionTwoAboutUs.title2}
            readOnly
          />

          <input
            type="text"
            className="input__admin-section"
            value={sectionTwoAboutUs.subtitle}
            readOnly
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionTwoAboutUs.description}
            readOnly
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => console.log("Lógica de edición aquí")}
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
            readOnly
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionThreeAboutUs.description}
            readOnly
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => console.log("Lógica de edición aquí")}
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
            readOnly
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionFourAboutUs.description}
            readOnly
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => console.log("Lógica de edición aquí")}
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
            readOnly
          />

          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionSixAboutUs.description}
            readOnly
          ></textarea>

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => console.log("Lógica de edición aquí")}
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
