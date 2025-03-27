import { useContext, useState, useEffect, useCallback } from "react";
import AppContext from "@context/app/app-context";
import { Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  // const [isEditing, setIsEditing] = useState(false);

  const [isEditingOne, setIsEditingOne] = useState(false);
  const [isEditingTwo, setIsEditingTwo] = useState(false);
  const [isEditingThree, setIsEditingThree] = useState(false);
  const [isEditingFour, setIsEditingFour] = useState(false);
  const [isEditingFive, setIsEditingFive] = useState(false);
  // --------------------------------------
  // Nueva subida de image

  const [imageOpen, setImageOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState("");
  const [formImageUpload, setFormImageUpload] = useState("");
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
      setImageUpload(URL.createObjectURL(acceptedFiles[0]));
      setFormImageUpload(acceptedFiles[0]);
      setError("")
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/webp, video/mp4'
  });

  function cancelUploadImage() {
    setImageOpen(false)
    setFiles([]);
    setImageUpload("");
  }

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
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
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
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
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
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update About Us Misión ---------------------------------

  async function handleUpdateAboutUsMision() {
    debugger
    if (imageOpen && imageUpload.length == 0) {
      setError("Por favor, suba una imagen")
      return
    } else {
      setError("")
    }
    try {
      const formData = new FormData();
      formData.append("file", formImageUpload);  // Archivo
      formData.append("page", "landing"); // Definir el bucket según el backend
      formData.append("data", JSON.stringify(sectionFourAboutUs)); // Datos en JSON

      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-mision/1`,
        formData,  // Pasamos el FormData
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
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
        // setIsEditing(false);
        setIsEditingOne(false);
        setIsEditingTwo(false);
        setIsEditingThree(false);
        setIsEditingFour(false);
        setIsEditingFive(false);
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
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionOneAboutUs.title}
            onChange={(e) =>
              setSectionOneAboutUs({
                ...sectionOneAboutUs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionOneAboutUs.description}
            onChange={(e) =>
              setSectionOneAboutUs({
                ...sectionOneAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditingOne ? (
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
                onClick={() => setIsEditingOne(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingOne(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Fundador</h1>
          <label htmlFor="" className="label__admin-section">
            Titulo #1:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.title1}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                title1: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Titulo #2:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.title2}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                title2: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Subtitulo:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.subtitle}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
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
            value={sectionTwoAboutUs.description}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionTwoAboutUs.bg_photo}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionTwoAboutUs.bg_photo}
            onChange={(e) =>
              setSectionTwoAboutUs({
                ...sectionTwoAboutUs,
                bg_photo: e.target.value,
              })
            }
            readOnly
          />
          <div className="cntr-input__add-course lg-margin-bottom">
            <input className="file__add-course" type="file" disabled required />
            <button className="btn-upload__add-course" disabled>
              ⬆
            </button>
          </div>

          {isEditingTwo ? (
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
                onClick={() => setIsEditingTwo(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingTwo(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Objetivos</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionThreeAboutUs.title}
            onChange={(e) =>
              setSectionThreeAboutUs({
                ...sectionThreeAboutUs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionThreeAboutUs.description}
            onChange={(e) =>
              setSectionThreeAboutUs({
                ...sectionThreeAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>

          {isEditingThree ? (
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
                onClick={() => setIsEditingThree(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingThree(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Misión</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionFourAboutUs.title}
            onChange={(e) =>
              setSectionFourAboutUs({
                ...sectionFourAboutUs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionFourAboutUs.description}
            onChange={(e) =>
              setSectionFourAboutUs({
                ...sectionFourAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          {!imageOpen && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionFourAboutUs.bg_photo}
                  alt={`Img`}
                />
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button onClick={() => setImageOpen(true)} className="btn-upload__add-course">
                  Cambiar imagen
                </button>
              </div>
            </>
          )}

          {imageOpen && (
            <section className="add-class">
              <h1 className="title__add-class sm-margin-bottom">Añadir nueva imagen</h1>
              <br />

              {files.length === 0 ? (
                <div
                  {...getRootProps()}
                  className={`w-full max-w-md p-8 rounded-lg border-2 border-dashed transition-colors ${isDragActive ? "border-neutral-400" : "border-neutral-600"}`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center text-center">
                    <Upload className="w-12 h-12 mb-4 text-neutral-400" />
                    <p className="mb-2 text-lg font-medium text-neutral-300">
                      {isDragActive ? "Suelta los archivos aquí" : "Arrastre y suelte archivos aquí"}
                    </p>
                    <p className="mb-4 text-sm text-neutral-500">or</p>
                    <button className="px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-800 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600">
                      Select Files
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  {imageUpload && (
                    <img src={imageUpload} alt="Preview" className="w-full h-50 max-h-52 object-cover rounded-md mb-4" />
                  )}
                  <button
                    onClick={() => { setFiles([]); setImageUpload(""); }}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar archivo
                  </button>
                </div>
              )}

              {error && <p style={{ color: "red" }}>{error}</p>}
              <br />
              <div className="flex justify-center mt-4 items-center gap-8">
                <button onClick={() => cancelUploadImage()} className="btn-back__edit-course">
                  Cancelar
                </button>
              </div>
            </section>
          )}

          {isEditingFour ? (
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
                onClick={() => setIsEditingFour(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingFour(true)}
            >
              Editar
            </button>
          )}
        </li>

        <li className="item__admin-section">
          <h1 className="subtitle__admin-section">Visión</h1>
          <label htmlFor="" className="label__admin-section">
            Title:
          </label>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionSixAboutUs.title}
            onChange={(e) =>
              setSectionSixAboutUs({
                ...sectionSixAboutUs,
                title: e.target.value,
              })
            }
          />
          <label htmlFor="" className="label__admin-section">
            Descripción:
          </label>
          <textarea
            type="text"
            className="textarea__admin-section sm-margin-bottom"
            value={sectionSixAboutUs.description}
            onChange={(e) =>
              setSectionSixAboutUs({
                ...sectionSixAboutUs,
                description: e.target.value,
              })
            }
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          <div className="cntr-img__admin-section sm-margin-bottom">
            <img
              className="img__admin-section"
              src={sectionSixAboutUs.bg_photo}
              alt={`Img`}
            />
          </div>
          <input
            type="text"
            className="input__admin-section sm-margin-bottom"
            value={sectionSixAboutUs.bg_photo}
            onChange={(e) =>
              setSectionSixAboutUs({
                ...sectionSixAboutUs,
                bg_photo: e.target.value,
              })
            }
            readOnly
          />
          <div className="cntr-input__add-course lg-margin-bottom">
            <input className="file__add-course" type="file" disabled required />
            <button className="btn-upload__add-course" disabled>
              ⬆
            </button>
          </div>

          {isEditingFive ? (
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
                onClick={() => setIsEditingFive(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingFive(true)}
            >
              Editar
            </button>
          )}
        </li>
      </ul>
    </>
  );
}
