import { useContext, useState, useEffect } from "react";
import AppContext from "@context/app/app-context";
// import "./admin-services.css";
import axios from "axios";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [isEditing, setIsEditing] = useState(false);

  // const [sectionOneServices, setSectionOneServices] = useState({
  //   title: "",
  // });

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

  const [sectionFourServices, setSectionFourServices] = useState({
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
        setSectionFourServices(response.data[0].section_four);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ----------------------------- Update Title ---------------------------------

  // async function handleUpdateTitle() {
  //   try {
  //     const response = await axios.put(
  //       `${urlApi}landing/u/update-services-title/1`,
  //       sectionOneServices,
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

  // ----------------------------- Update Services One ---------------------------------

  async function handleUpdateServicesOne() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-services-one/1`,
        sectionTwoServices,
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

  // ----------------------------- Update Services Two ---------------------------------

  async function handleUpdateServicesTwo() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-services-two/1`,
        sectionThreeServices,
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

  // ----------------------------- Update Services Three ---------------------------------

  async function handleUpdateServicesThree() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-services-three/1`,
        sectionFourServices,
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
      getServices();
    }
  }, [context.token]);

  return (
    <>
      <h1 className="title__admin-section">Service</h1>

      <ul className="list__admin-section">
        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Vestuario</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoServices.title}
            onChange={(e) =>
              setSectionTwoServices({
                ...sectionTwoServices,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Subtitle:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoServices.subtitle}
            onChange={(e) =>
              setSectionTwoServices({
                ...sectionTwoServices,
                subtitle: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionTwoServices.description}
            onChange={(e) =>
              setSectionTwoServices({
                ...sectionTwoServices,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoServices.photo}
            onChange={(e) =>
              setSectionTwoServices({
                ...sectionTwoServices,
                photo: e.target.value,
              })
            }
          />

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateServicesOne}
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
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionThreeServices.title}
            onChange={(e) =>
              setSectionThreeServices({
                ...sectionThreeServices,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Subtitle:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionThreeServices.subtitle}
            onChange={(e) =>
              setSectionThreeServices({
                ...sectionThreeServices,
                subtitle: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionThreeServices.description}
            onChange={(e) =>
              setSectionThreeServices({
                ...sectionThreeServices,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionThreeServices.photo}
            onChange={(e) =>
              setSectionThreeServices({
                ...sectionThreeServices,
                photo: e.target.value,
              })
            }
          />

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateServicesTwo}
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
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFourServices.title}
            onChange={(e) =>
              setSectionFourServices({
                ...sectionFourServices,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Subtitle:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFourServices.subtitle}
            onChange={(e) =>
              setSectionFourServices({
                ...sectionFourServices,
                subtitle: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionFourServices.description}
            onChange={(e) =>
              setSectionFourServices({
                ...sectionFourServices,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFourServices.photo}
            onChange={(e) =>
              setSectionFourServices({
                ...sectionFourServices,
                photo: e.target.value,
              })
            }
          />

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateServicesThree}
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
