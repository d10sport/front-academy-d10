import { useContext, useState, useEffect, useCallback } from "react";
import getTokenDecoded from "../../../token/token-data.js";
import AppContext from "@context/app/app-context";
import { Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import axios from "axios";

export default function Admin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [isEditingOne, setIsEditingOne] = useState(false);
  const [isEditingTwo, setIsEditingTwo] = useState(false);
  const [isEditingThree, setIsEditingThree] = useState(false);
  const [isEditingFour, setIsEditingFour] = useState(false);
  const [isEditingFive, setIsEditingFive] = useState(false);
  const [isEditingSix, setIsEditingSix] = useState(false);

  // Nueva subida de image
  const [imageOpenOne, setImageOpenOne] = useState(false);
  const [imageOpenTwo, setImageOpenTwo] = useState(false);
  const [imageOpenThree, setImageOpenThree] = useState(false);
  const [imageOpenFour, setImageOpenFour] = useState(false);
  const [imageOpenFive, setImageOpenFive] = useState(false);

  const [imageUploadOne, setImageUploadOne] = useState("");
  const [imageUploadTwo, setImageUploadTwo] = useState("");
  const [imageUploadThree, setImageUploadThree] = useState("");
  const [imageUploadFour, setImageUploadFour] = useState("");
  const [imageUploadFive, setImageUploadFive] = useState("");

  const [formImageUploadOne, setFormImageUploadOne] = useState("");
  const [formImageUploadTwo, setFormImageUploadTwo] = useState("");
  const [formImageUploadThree, setFormImageUploadThree] = useState("");
  const [formImageUploadFour, setFormImageUploadFour] = useState("");
  const [formImageUploadFive, setFormImageUploadFive] = useState("");

  const [filesOne, setFilesOne] = useState([]);
  const [filesTwo, setFilesTwo] = useState([]);
  const [filesThree, setFilesThree] = useState([]);
  const [filesFour, setFilesFour] = useState([]);
  const [filesFive, setFilesFive] = useState([]);

  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles, rootRef, inputRef) => {
    const parentIdDrag =
      inputRef.nativeEvent.srcElement.parentElement.parentElement.id;
    const parentIdDrop = inputRef.nativeEvent.srcElement.parentElement.id;
    let parentId = "";
    if (parentIdDrag != "") {
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
      } else if (parentId === "dropzone-four") {
        setFilesFour(acceptedFiles);
        setImageUploadFour(URL.createObjectURL(acceptedFiles[0]));
        setFormImageUploadFour(acceptedFiles[0]);
      } else if (parentId === "dropzone-five") {
        setFilesFive(acceptedFiles);
        setImageUploadFive(URL.createObjectURL(acceptedFiles[0]));
        setFormImageUploadFive(acceptedFiles[0]);
      } else {
        setError("No se ha podido subir la imagen");
      }
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // onDropAccepted,
    accept: "image/jpeg, image/png, image/webp, video/mp4",
  });

  function cancelUploadImage() {
    setImageOpenOne(false);
    setImageOpenTwo(false);
    setImageOpenThree(false);
    setImageOpenFour(false);
    setImageOpenFive(false);
    setFilesOne([]);
    setFilesTwo([]);
    setFilesThree([]);
    setFilesFour([]);
    setFilesFive([]);
    setImageUploadOne("");
    setImageUploadTwo("");
    setImageUploadThree("");
    setImageUploadFour("");
    setImageUploadFive("");
  }

  function cancelUploadImageOne() {
    setImageOpenOne(false);
    setFilesOne([]);
    setImageUploadOne("");
  }

  function cancelUploadImageTwo() {
    setImageOpenTwo(false);
    setFilesTwo([]);
    setImageUploadTwo("");
  }

  function cancelUploadImageThree() {
    setImageOpenThree(false);
    setFilesThree([]);
    setImageUploadThree("");
  }

  function cancelUploadImageFour() {
    setImageOpenFour(false);
    setFilesFour([]);
    setImageUploadFour("");
  }

  function cancelUploadImageFive() {
    setImageOpenFive(false);
    setFilesFive([]);
    setImageUploadFive("");
  }

  function openOrCloseImage(e) {
    const idBtn = e.target.id;
    if (idBtn == "btn_one") {
      setImageOpenOne(true);
      cancelUploadImageThree();
      cancelUploadImageFour();
      cancelUploadImageFive();
    } else if (idBtn == "btn_two") {
      setImageOpenTwo(true);
      cancelUploadImageThree();
      cancelUploadImageFour();
      cancelUploadImageFive();
    } else if (idBtn == "btn_three") {
      setImageOpenThree(true);
      cancelUploadImageOne();
      cancelUploadImageTwo();
      cancelUploadImageFour();
      cancelUploadImageFive();
    } else if (idBtn == "btn_four") {
      setImageOpenFour(true);
      cancelUploadImageOne();
      cancelUploadImageTwo();
      cancelUploadImageThree();
      cancelUploadImageFive();
    } else if (idBtn == "btn_five") {
      setImageOpenFive(true);
      cancelUploadImageOne();
      cancelUploadImageTwo();
      cancelUploadImageThree();
      cancelUploadImageFour();
    }
  }

  // --------------------------------------

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
    if (
      imageOpenOne &&
      imageUploadOne.length == 0 &&
      imageOpenTwo &&
      imageUploadTwo.length == 0
    ) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }

    const formData = new FormData();

    if (formImageUploadOne) {
      formData.append("file", formImageUploadOne);
      formData.append("fileType", "bg_photo");
    }

    if (formImageUploadTwo) {
      formData.append("file", formImageUploadTwo);
      formData.append("fileType", "bg_photo_res");
    }

    formData.append("page", "landing");
    formData.append("data", JSON.stringify(sectionOne));

    toast.promise(
      axios
        .put(`${urlApi}landing/u/update-home/1`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setIsEditingOne(false);
            cancelUploadImage();
            getDateHome();
            return "Datos actualizados con éxito";
          } else {
            throw new Error(
              "Error en la actualización: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de actualización",
      }
    );
  }

  // ----------------------------- Update Nosotros ---------------------------------

  async function handleUpdateNosotros() {
    if (imageOpenThree && imageUploadThree.length == 0) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }

    const formData = new FormData();
    formData.append("file", formImageUploadThree);
    formData.append("page", "landing");
    formData.append("data", JSON.stringify(sectionTwo));

    toast.promise(
      axios
        .put(`${urlApi}landing/u/update-nosotros/1`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setIsEditingTwo(false);
            cancelUploadImage();
            getDateHome();
            return "Datos actualizados con éxito";
          } else {
            throw new Error(
              "Error en la actualización: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de actualización",
      }
    );
  }

  // ----------------------------- Update Comercial ---------------------------------

  async function handleUpdateComercial() {
    if (imageOpenFour && imageUploadFour.length == 0) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }

    const formData = new FormData();
    formData.append("file", formImageUploadFour);
    formData.append("page", "landing");
    formData.append("data", JSON.stringify(sectionThree));

    toast.promise(
      axios
        .put(`${urlApi}landing/u/update-comercial/1`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setIsEditingThree(false);
            cancelUploadImage();
            getDateHome();
            return "Datos actualizados con éxito";
          } else {
            throw new Error(
              "Error en la actualización: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de actualización",
      }
    );
  }

  // ----------------------------- Update News ---------------------------------

  async function handleUpdateNews() {
    const { h1, title, description } = sectionFour.news;

    toast.promise(
      axios
        .put(
          `${urlApi}landing/u/update-news/1`,
          { h1, title, description },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setIsEditingFour(false);
            cancelUploadImage();
            getDateHome();
            return "Datos actualizados con éxito";
          } else {
            throw new Error(
              "Error en la actualización: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de actualización",
      }
    );
  }

  // ----------------------------- Update Academia ---------------------------------

  async function handleUpdateAcademia() {
    if (imageOpenFive && imageUploadFive.length == 0) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }

    const formData = new FormData();
    formData.append("file", formImageUploadFive);
    formData.append("page", "landing");
    formData.append("data", JSON.stringify(sectionFive));

    toast.promise(
      axios
        .put(`${urlApi}landing/u/update-academia/1`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setIsEditingFive(false);
            cancelUploadImage();
            getDateHome();
            return "Datos actualizados con éxito";
          } else {
            throw new Error(
              "Error en la actualización: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de actualización",
      }
    );
  }

  // ----------------------------- Update Aliados ---------------------------------

  async function handleUpdateAliados() {
    toast.promise(
      axios
        .put(`${urlApi}landing/u/update-aliados/1`, sectionSix, {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setIsEditingSix(false);
            cancelUploadImage();
            getDateHome();
            return "Datos actualizados con éxito";
          } else {
            throw new Error(
              "Error en la actualización: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de actualización",
      }
    );
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
            style={{ cursor: !isEditingOne ? "not-allowed" : "text" }}
            disabled={!isEditingOne}
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
            style={{ cursor: !isEditingOne ? "not-allowed" : "text" }}
            disabled={!isEditingOne}
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
            style={{ cursor: !isEditingOne ? "not-allowed" : "text" }}
            disabled={!isEditingOne}
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
            style={{ cursor: !isEditingOne ? "not-allowed" : "text" }}
            disabled={!isEditingOne}
          />
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo para monitores:
          </label>

          {!imageOpenOne && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionOne.bg_photo}
                  alt={`Img`}
                />
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  id="btn_one"
                  onClick={(e) => openOrCloseImage(e)}
                  className={
                    !isEditingOne
                      ? "btn-cursor-disabled"
                      : "btn-upload__add-course"
                  }
                  disabled={!isEditingOne}
                >
                  Cambiar imagen
                </button>
              </div>
            </>
          )}

          {imageOpenOne && (
            <section className="upload-section">
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

          <label htmlFor="" className="label__admin-section">
            Imagen de fondo para celulares:
          </label>

          {!imageOpenTwo && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionOne.bg_photo_res}
                  alt={`Img`}
                />
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  id="btn_two"
                  onClick={(e) => openOrCloseImage(e)}
                  className={
                    !isEditingOne
                      ? "btn-cursor-disabled"
                      : "btn-upload__add-course"
                  }
                  disabled={!isEditingOne}
                >
                  Cambiar imagen
                </button>
              </div>
            </>
          )}

          {imageOpenTwo && (
            <section className="upload-section">
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

          {isEditingOne ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">
                ¿Estás seguro de guardar los cambios?
              </p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => handleUpdateHome()}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => {
                  setIsEditingOne(false);
                  cancelUploadImage();
                }}
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
            style={{ cursor: !isEditingTwo ? "not-allowed" : "text" }}
            disabled={!isEditingTwo}
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
            style={{ cursor: !isEditingTwo ? "not-allowed" : "text" }}
            disabled={!isEditingTwo}
          ></textarea>
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>

          {!imageOpenThree && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionTwo.bg_photo}
                  alt={`Img`}
                />
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  id="btn_three"
                  onClick={(e) => openOrCloseImage(e)}
                  className={
                    !isEditingTwo
                      ? "btn-cursor-disabled"
                      : "btn-upload__add-course"
                  }
                  disabled={!isEditingTwo}
                >
                  Cambiar imagen
                </button>
              </div>
            </>
          )}

          {imageOpenThree && (
            <section className="upload-section">
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

          {isEditingTwo ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">
                ¿Estás seguro de guardar los cambios?
              </p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => handleUpdateNosotros()}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => {
                  setIsEditingTwo(false);
                  cancelUploadImage();
                }}
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
          <h1 className="subtitle__admin-section">Comercial</h1>
          <label htmlFor="" className="label__admin-section">
            Video comercial:
          </label>
          {!imageOpenFour && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <video
                  src={sectionThree.video}
                  className="img__admin-section"
                  muted
                  loop
                  autoPlay
                ></video>
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  id="btn_four"
                  onClick={(e) => openOrCloseImage(e)}
                  className={
                    !isEditingThree
                      ? "btn-cursor-disabled"
                      : "btn-upload__add-course"
                  }
                  disabled={!isEditingThree}
                >
                  Cambiar video
                </button>
              </div>
            </>
          )}

          {imageOpenFour && (
            <section className="upload-section">
              {filesFour.length === 0 ? (
                <div
                  id="dropzone-four"
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
                  {imageUploadFour && (
                    <img
                      src={imageUploadFour}
                      alt="Preview"
                      className="w-full h-50 max-h-52 object-cover rounded-md mb-4"
                    />
                  )}
                  <button
                    onClick={() => {
                      setFilesFour([]);
                      setImageUploadFour("");
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
              <p className="text__admin-section">
                ¿Estás seguro de guardar los cambios?
              </p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => handleUpdateComercial()}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => {
                  setIsEditingThree(false);
                  cancelUploadImage();
                }}
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
            style={{ cursor: !isEditingFour ? "not-allowed" : "text" }}
            disabled={!isEditingFour}
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
            style={{ cursor: !isEditingFour ? "not-allowed" : "text" }}
            disabled={!isEditingFour}
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
            style={{ cursor: !isEditingFour ? "not-allowed" : "text" }}
            disabled={!isEditingFour}
          />

          {isEditingFour ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">
                ¿Estás seguro de guardar los cambios?
              </p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => handleUpdateNews()}
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
            style={{ cursor: !isEditingFive ? "not-allowed" : "text" }}
            disabled={!isEditingFive}
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
            style={{ cursor: !isEditingFive ? "not-allowed" : "text" }}
            disabled={!isEditingFive}
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
            style={{ cursor: !isEditingFive ? "not-allowed" : "text" }}
            disabled={!isEditingFive}
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
            style={{ cursor: !isEditingFive ? "not-allowed" : "text" }}
            disabled={!isEditingFive}
          />
          <label htmlFor="" className="label__admin-section">
            Imagen de fondo:
          </label>
          {!imageOpenFive && (
            <>
              <div className="cntr-img__admin-section sm-margin-bottom">
                <img
                  className="img__admin-section"
                  src={sectionFive.bg_photo}
                  alt={`Img`}
                />
              </div>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  id="btn_five"
                  onClick={(e) => openOrCloseImage(e)}
                  className={
                    !isEditingFive
                      ? "btn-cursor-disabled"
                      : "btn-upload__add-course"
                  }
                  disabled={!isEditingFive}
                >
                  Cambiar imagen
                </button>
              </div>
            </>
          )}

          {imageOpenFive && (
            <section className="upload-section">
              {filesFive.length === 0 ? (
                <div
                  id="dropzone-five"
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
                  {imageUploadFive && (
                    <img
                      src={imageUploadFive}
                      alt="Preview"
                      className="w-full h-50 max-h-52 object-cover rounded-md mb-4"
                    />
                  )}
                  <button
                    onClick={() => {
                      setFilesFive([]);
                      setImageUploadFive("");
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
              <p className="text__admin-section">
                ¿Estás seguro de guardar los cambios?
              </p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => handleUpdateAcademia()}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => {
                  setIsEditingFive(false);
                  cancelUploadImage();
                }}
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
            style={{ cursor: !isEditingSix ? "not-allowed" : "text" }}
            disabled={!isEditingSix}
          />

          {isEditingSix ? (
            <div className="confirm-edit__admin-section">
              <p className="text__admin-section">
                ¿Estás seguro de guardar los cambios?
              </p>
              <button
                className="btn-confirm__admin-section"
                onClick={() => handleUpdateAliados()}
              >
                Sí
              </button>
              <button
                className="btn-cancel__admin-section"
                onClick={() => setIsEditingSix(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className="btn-edit__admin-section"
              onClick={() => setIsEditingSix(true)}
            >
              Editar
            </button>
          )}
        </li>
      </ul>
    </>
  );
}
