import { useContext, useState, useEffect, useCallback } from "react";
import AppContext from "@context/app/app-context";
// import "./admin-services.css";
import { Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [isEditingOne, setIsEditingOne] = useState(false);
  const [isEditingTwo, setIsEditingTwo] = useState(false);
  const [isEditingThree, setIsEditingThree] = useState(false);

  // Nueva subida de image
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
    const parentId = inputRef.nativeEvent.srcElement.parentElement.id;
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
      formData.append("data", JSON.stringify(sectionTwoServices));

      const response = await axios.put(
        `${urlApi}landing/u/update-services-one/1`,
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
        cancelUploadImage();
        getServices();
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update Services Two ---------------------------------

  async function handleUpdateServicesTwo() {
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
      formData.append("data", JSON.stringify(sectionThreeServices));

      const response = await axios.put(
        `${urlApi}landing/u/update-services-two/1`,
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
        setIsEditingTwo(false);
        cancelUploadImage();
        getServices();
      } else {
        console.error("Error en la actualización:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  // ----------------------------- Update Services Three ---------------------------------

  async function handleUpdateServicesThree() {
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
      formData.append("data", JSON.stringify(sectionFourServices));

      const response = await axios.put(
        `${urlApi}landing/u/update-services-three/1`,
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
        setIsEditingThree(false);
        cancelUploadImage();
        getServices();
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
          {!imageOpenOne && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionTwoServices.photo}
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

          {isEditingOne ? (
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
          {!imageOpenTwo && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionThreeServices.photo}
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

          {isEditingTwo ? (
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
          {!imageOpenThree && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionFourServices.photo}
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

          {isEditingThree ? (
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
      </ul>
    </>
  );
}
