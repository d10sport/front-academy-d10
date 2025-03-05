import { useContext, useState, useEffect } from "react";
import AppContext from "@context/app/app-context";
// import "./admin-services.css";
import axios from "axios";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [isEditing, setIsEditing] = useState(false);

  const [sectionTwoServices, setSectionTwoServices] = useState({
    photo: "",
    title: "",
    subtitle: "",
    description: "",
  });

  const [sectionThreeServices, setSectionThreeServices] = useState({
    photo: "",
    title: "",
    subtitle: "",
    description: "",
  });

  const [sectionFourServices, setSectioFourServices] = useState({
    photo: "",
    title: "",
    subtitle: "",
    description: "",
  });

  function getServices() {
    axios
      .get(`${urlApi}landing/g/services`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        setSectionTwoServices(response.data[0].section_two);
        setSectionThreeServices(response.data[0].section_three);
        setSectioFourServices(response.data[0].section_four);
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
      getServices();
    }
  }, [context.token]);

  return (
    <>
      {/* --------------- */}
      {/* -- Servicios -- */}
      {/* --------------- */}

      <h1 className="title__admin-section">Service</h1>

      <ul className="list__admin-section">
        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Vestuario</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionTwoServices.title}
            readOnly
          />
          <input
            type="text"
            className="input__admin-section"
            value={sectionTwoServices.subtitle}
            readOnly
          />
          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionTwoServices.description}
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
          <h1 className="subtitle__admin-section">Entrenamiento</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionThreeServices.title}
            readOnly
          />
          <input
            type="text"
            className="input__admin-section"
            value={sectionThreeServices.subtitle}
            readOnly
          />
          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionThreeServices.description}
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
          <h1 className="subtitle__admin-section">Capacitación</h1>
          <input
            type="text"
            className="input__admin-section"
            value={sectionFourServices.title}
            readOnly
          />
          <input
            type="text"
            className="input__admin-section"
            value={sectionFourServices.subtitle}
            readOnly
          />
          <textarea
            type="text"
            className="textarea__admin-section"
            value={sectionFourServices.description}
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
