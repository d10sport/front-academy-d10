import { useContext, useState, useEffect } from "react";
import getTokenDecoded from "../../../token/token-data.js";
import AppContext from "@context/app/app-context";
import axios from "axios";
// import "./admin-home.css";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [isEditing, setIsEditing] = useState(false);

  const [sectionOne, setSectionOne] = useState({
    slogan: "",
    company: "",
    bg_photo: "",
    slogan_two: "",
    bg_photo_res: "",
    slogan_three: "",
  });

  const [sectionTwo, setSectionTwo] = useState({
    title: "",
    bg_photo: "",
    description: "",
  });

  const [sectionThree, setSectionThree] = useState({
    video: "",
  });

  const [sectionFour, setSectionFour] = useState({
    collection: [
      {
        title: "",
        photo: "",
        link: "",
      },
    ],
    news: {
      h1: "",
      title: "",
      description: "",
      link: "",
    },
  });

  const [sectionFive, setSectionFive] = useState({
    link: "",
    title_1: "",
    title_2: "",
    bg_photo: "",
    text_link: "",
    logo: "",
  });

  const [sectionSix, setSectionSix] = useState({
    tile: "",
    icons: [{ icon: "" }],
  });

  function getDateHome() {
    axios
      .get(`${urlApi}landing/g/home`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then(async (response) => {
        if (!response.data.success) return;

        const decrypted = await getTokenDecoded(response.data.data);

        if (decrypted) {
          setSectionOne(decrypted.data[0].section_one);
          setSectionTwo(decrypted.data[0].section_two);
          setSectionThree(decrypted.data[0].section_three);
          setSectionFour(decrypted.data[0].section_four);
          setSectionFive(decrypted.data[0].section_five);
          setSectionSix(decrypted.data[0].section_six);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // ----------------------------- Update Home ---------------------------------

  async function handleUpdateHome() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-home/1`,
        sectionOne,
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

  // ----------------------------- Update Nosotros ---------------------------------

  async function handleUpdateNosotros() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-nosotros/1`,
        sectionTwo,
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

  // ----------------------------- Update Comercial ---------------------------------

  async function handleUpdateComercial() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-comercial/1`,
        sectionThree,
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

  // ----------------------------- Update News ---------------------------------

  async function handleUpdateNews() {
    try {
      const { h1, title, description } = sectionFour.news;

      const response = await axios.put(
        `${urlApi}landing/u/update-news/1`,
        { h1, title, description },
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

  // ----------------------------- Update Academia ---------------------------------

  async function handleUpdateAcademia() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-academia/1`,
        sectionFive,
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

  // ----------------------------- Update Aliados ---------------------------------

  async function handleUpdateAliados() {
    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-aliados/1`,
        sectionSix,
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
      getDateHome();
    }
  }, [context.token]);

  return (
    <>
      <h1 className="title__admin-section">Home</h1>

      <ul className="list__admin-section">
        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Inicio</h1>
          <label htmlFor="" className="label__admin-section">
            Nombre de la compañía:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionOne.company}
            onChange={(e) =>
              setSectionOne({ ...sectionOne, company: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Slogan #1:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionOne.slogan}
            onChange={(e) =>
              setSectionOne({ ...sectionOne, slogan: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Slogan #2:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionOne.slogan_two}
            onChange={(e) =>
              setSectionOne({ ...sectionOne, slogan_two: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Slogan #3:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionOne.slogan_three}
            onChange={(e) =>
              setSectionOne({ ...sectionOne, slogan_three: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo para monitores:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionOne.bg_photo}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionOne.bg_photo}
            onChange={(e) =>
              setSectionOne({ ...sectionOne, bg_photo: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo para celulares:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionOne.bg_photo_res}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionOne.bg_photo_res}
            onChange={(e) =>
              setSectionOne({ ...sectionOne, bg_photo_res: e.target.value })
            }
          />

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateHome}
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
          <h1 className="subtitle__admin-section">Nosotros</h1>
          <label htmlFor="" className="label__admin-section">
            Titulo:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwo.title}
            onChange={(e) =>
              setSectionTwo({ ...sectionTwo, title: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionTwo.description}
            onChange={(e) =>
              setSectionTwo({ ...sectionTwo, description: e.target.value })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionTwo.bg_photo}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwo.bg_photo}
            onChange={(e) =>
              setSectionTwo({ ...sectionTwo, bg_photo: e.target.value })
            }
          />

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateNosotros}
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
          <h1 className="subtitle__admin-section">Comercial</h1>
          <label htmlFor="" className="label__admin-section">
            Video comercial:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <video
              src={sectionThree.video}
              className="img__admin-section"
              muted
              loop
              autoPlay
            ></video>
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionThree.video}
            onChange={(e) =>
              setSectionThree({ ...sectionThree, video: e.target.value })
            }
          />

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateComercial}
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
          <h1 className="subtitle__admin-section">News</h1>
          <label htmlFor="" className="label__admin-section">
            Titulo de sección:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFour.news.h1}
            onChange={(e) =>
              setSectionFour({
                ...sectionFour,
                news: { ...sectionFour.news, h1: e.target.value },
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Titulo:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFour.news.title}
            onChange={(e) =>
              setSectionFour({
                ...sectionFour,
                news: { ...sectionFour.news, title: e.target.value },
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFour.news.description}
            onChange={(e) =>
              setSectionFour({
                ...sectionFour,
                news: { ...sectionFour.news, description: e.target.value },
              })
            }
          />

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateNews}
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
          <h1 className="subtitle__admin-section">Academia</h1>
          <label htmlFor="" className="label__admin-section">
            Link de redireccion:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFive.link}
            onChange={(e) =>
              setSectionFive({ ...sectionFive, link: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Titulo #1:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFive.title_1}
            onChange={(e) =>
              setSectionFive({ ...sectionFive, title_1: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Titulo #2:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFive.title_2}
            onChange={(e) =>
              setSectionFive({ ...sectionFive, title_2: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Texto del link:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFive.text_link}
            onChange={(e) =>
              setSectionFive({ ...sectionFive, text_link: e.target.value })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionFive.bg_photo}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFive.bg_photo}
            onChange={(e) =>
              setSectionFive({ ...sectionFive, bg_photo: e.target.value })
            }
          />
          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAcademia}
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
          <h1 className="subtitle__admin-section">Aliados</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionSix.tile}
            onChange={(e) =>
              setSectionSix({ ...sectionSix, tile: e.target.value })
            }
          />

          {isEditing ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">¿Estás seguro de editarlo?</p>
              <button
                className="btn-confirm__admin-section"
                onClick={handleUpdateAliados}
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
