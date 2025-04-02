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

  const [imageOpenOne, setImageOpenOne] = useState(false);
  const [imageOpenTwo, setImageOpenTwo] = useState(false);
  const [imageOpenThree, setImageOpenThree] = useState(false);

  const [imageUploadOne, setImageUploadOne] = useState("");
  const [imageUploadTwo, setImageUploadTwo] = useState("");
  const [imageUploadThree, setImageUploadThree] = useState("");

  const [formImageUploadOne, setFormImageUploadOne] = useState("");
  const [formImageUploadTwo, setFormImageUploadTwo] = useState("");
  const [formImageUploadThree, setFormImageUploadThree] = useState("");

  const [filesOne, setFilesOne] = useState([]);
  const [filesTwo, setFilesTwo] = useState([]);
  const [filesThree, setFilesThree] = useState([]);

  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles, rootRef, inputRef) => {
    const parentIdDrag = inputRef.nativeEvent.srcElement.parentElement.parentElement.id;
    const parentIdDrop = inputRef.nativeEvent.srcElement.parentElement.id;
    let parentId = "";
    if(parentIdDrag != ""){
      parentId = parentIdDrag;
    } else {
      parentId = parentIdDrop;
    }
    if (acceptedFiles.length > 0) {
      if (parentId === "dropzone-one") {
        setFilesOne(acceptedFiles);
        setImageUploadOne(URL.createObjectURL(acceptedFiles[0]));
        setFormImageUploadOne(acceptedFiles[0]);
      } else if (parentId === "dropzone-two") {
        setFilesTwo(acceptedFiles);
        setImageUploadTwo(URL.createObjectURL(acceptedFiles[0]));
        setFormImageUploadTwo(acceptedFiles[0]);
      } else if (parentId === "dropzone-three") {
        setFilesThree(acceptedFiles);
        setImageUploadThree(URL.createObjectURL(acceptedFiles[0]));
        setFormImageUploadThree(acceptedFiles[0]);
      } else {
        setError("No se ha podido subir la imagen");
      }
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/webp, video/mp4",
  });

  function cancelUploadImage() {
    setImageOpenOne(false);
    setImageOpenTwo(false);
    setImageOpenThree(false);
    setFilesOne([]);
    setFilesTwo([]);
    setFilesThree([]);
    setImageUploadOne("");
    setImageUploadTwo("");
    setImageUploadThree("");
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
    if (imageOpenOne && imageUploadOne.length == 0) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }
    try {
      const formData = new FormData();
      formData.append("file", formImageUploadOne);
      formData.append("page", "landing");
      formData.append("data", JSON.stringify(sectionTwoAboutUs));

      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-fundador/1`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
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
    if (imageOpenTwo && imageUploadTwo.length == 0) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }
    try {
      const formData = new FormData();
      formData.append("file", formImageUploadTwo);
      formData.append("page", "landing");
      formData.append("data", JSON.stringify(sectionFourAboutUs));

      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-mision/1`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
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
    if (imageOpenThree && imageUploadThree.length == 0) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }
    try {
      const formData = new FormData();
      formData.append("file", formImageUploadThree);
      formData.append("page", "landing");
      formData.append("data", JSON.stringify(sectionSixAboutUs));

      const response = await axios.put(
        `${urlApi}landing/u/update-aboutus-vision/1`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Datos actualizados con éxito:", response.data);
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
          {!imageOpenOne && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionTwoAboutUs.bg_photo}
                  alt={`Img`}
                />
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  onClick={() => setImageOpenOne(true)}
                  className="btn-upload__add-course"
                >
                  Cambiar imagen
                </button>
              </div>
            </>
          )}

          {imageOpenOne && (
            <section className="upload-section">
              <h1 className="title__add-class sm-margin-bottom">
                Añadir nueva imagen
              </h1>
              <br />

              {filesOne.length === 0 ? (
                <div
                  id="dropzone-one"
                  {...getRootProps()}
                  className={`w-full max-w-md p-8 rounded-lg border-2 border-dashed transition-colors ${
                    isDragActive ? "border-neutral-400" : "border-neutral-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center text-center">
                    <Upload className="w-12 h-12 mb-4 text-neutral-400" />
                    <p className="mb-2 text-lg font-medium text-neutral-300">
                      {isDragActive
                        ? "Suelta los archivos aquí"
                        : "Arrastre y suelte archivos aquí"}
                    </p>
                    <p className="mb-4 text-sm text-neutral-500">or</p>
                    <button className="px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-800 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600">
                      Select Files
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  {imageUploadOne && (
                    <img
                      src={imageUploadOne}
                      alt="Preview"
                      className="w-full h-50 max-h-52 object-cover rounded-md mb-4"
                    />
                  )}
                  <button
                    onClick={() => {
                      setFilesOne([]);
                      setImageUploadOne("");
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar archivo
                  </button>
                </div>
              )}

              {error && <p style={{ color: "red" }}>{error}</p>}
              <br />
              <div className="flex justify-center mt-4 items-center gap-8">
                <button
                  onClick={() => cancelUploadImage()}
                  className="btn-back__edit-course"
                >
                  Cancelar
                </button>
              </div>
            </section>
          )}

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
          {!imageOpenTwo && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionFourAboutUs.bg_photo}
                  alt={`Img`}
                />
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  onClick={() => setImageOpenTwo(true)}
                  className="btn-upload__add-course"
                >
                  Cambiar imagen
                </button>
              </div>
            </>
          )}

          {imageOpenTwo && (
            <section className="upload-section">
              <h1 className="title__add-class sm-margin-bottom">
                Añadir nueva imagen
              </h1>
              <br />

              {filesTwo.length === 0 ? (
                <div
                  id="dropzone-two"
                  {...getRootProps()}
                  className={`w-full max-w-md p-8 rounded-lg border-2 border-dashed transition-colors ${
                    isDragActive ? "border-neutral-400" : "border-neutral-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center text-center">
                    <Upload className="w-12 h-12 mb-4 text-neutral-400" />
                    <p className="mb-2 text-lg font-medium text-neutral-300">
                      {isDragActive
                        ? "Suelta los archivos aquí"
                        : "Arrastre y suelte archivos aquí"}
                    </p>
                    <p className="mb-4 text-sm text-neutral-500">or</p>
                    <button className="px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-800 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600">
                      Select Files
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  {imageUploadTwo && (
                    <img
                      src={imageUploadTwo}
                      alt="Preview"
                      className="w-full h-50 max-h-52 object-cover rounded-md mb-4"
                    />
                  )}
                  <button
                    onClick={() => {
                      setFilesTwo([]);
                      setImageUploadTwo("");
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar archivo
                  </button>
                </div>
              )}

              {error && <p style={{ color: "red" }}>{error}</p>}
              <br />
              <div className="flex justify-center mt-4 items-center gap-8">
                <button
                  onClick={() => cancelUploadImage()}
                  className="btn-back__edit-course"
                >
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
          {!imageOpenThree && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionSixAboutUs.bg_photo}
                  alt={`Img`}
                />
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  onClick={() => setImageOpenThree(true)}
                  className="btn-upload__add-course"
                >
                  Cambiar imagen
                </button>
              </div>
            </>
          )}

          {imageOpenThree && (
            <section className="upload-section">
              <h1 className="title__add-class sm-margin-bottom">
                Añadir nueva imagen
              </h1>
              <br />

              {filesThree.length === 0 ? (
                <div
                  id="dropzone-three"
                  {...getRootProps()}
                  className={`w-full max-w-md p-8 rounded-lg border-2 border-dashed transition-colors ${
                    isDragActive ? "border-neutral-400" : "border-neutral-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center text-center">
                    <Upload className="w-12 h-12 mb-4 text-neutral-400" />
                    <p className="mb-2 text-lg font-medium text-neutral-300">
                      {isDragActive
                        ? "Suelta los archivos aquí"
                        : "Arrastre y suelte archivos aquí"}
                    </p>
                    <p className="mb-4 text-sm text-neutral-500">or</p>
                    <button className="px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-800 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600">
                      Select Files
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  {imageUploadThree && (
                    <img
                      src={imageUploadThree}
                      alt="Preview"
                      className="w-full h-50 max-h-52 object-cover rounded-md mb-4"
                    />
                  )}
                  <button
                    onClick={() => {
                      setFilesThree([]);
                      setImageUploadThree("");
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Eliminar archivo
                  </button>
                </div>
              )}

              {error && <p style={{ color: "red" }}>{error}</p>}
              <br />
              <div className="flex justify-center mt-4 items-center gap-8">
                <button
                  onClick={() => cancelUploadImage()}
                  className="btn-back__edit-course"
                >
                  Cancelar
                </button>
              </div>
            </section>
          )}

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
