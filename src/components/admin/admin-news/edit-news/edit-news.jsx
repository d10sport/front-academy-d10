/* eslint-disable react/prop-types */
import { useEffect, useContext, useState, useCallback } from "react";
import AppContext from "@context/app/app-context";
import { Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import { toast } from "sonner";
import axios from "axios";
import "./edit-news.css";

export default function EditClass({
  isOpen,
  onClose,
  newsContent,
  refreshCourses,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  // Nueva subida de video
  const [imageOpen, setImageOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState("");
  const [formImageUpload, setFormImageUpload] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (acceptedFiles.length > 0) {
      if (acceptedFiles[0].size > maxSize) {
        setError("El archivo es demasiado grande. Máximo 400KB.");
        return;
      }
      setFiles(acceptedFiles);
      setImageUpload(URL.createObjectURL(acceptedFiles[0]));
      setFormImageUpload(acceptedFiles[0]);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/webp, video/mp4",
  });

  function cancelUploadImage() {
    setImageOpen(false);
    setFiles([]);
    setImageUpload("");
  }

  useEffect(() => {
    if (newsContent) {
      setTitle(newsContent.title || "");
      setDescription(newsContent.description || "");
      setContent(newsContent.image || "");
      setDate(newsContent.date || "");
      setCategoryId(newsContent.category_id || "");
    }
  }, [newsContent]);

  // --------------------------------------

  async function handleUpdateClass() {
    if (!newsContent || !newsContent.id) {
      setError("No hay un curso válido para actualizar");
      return;
    }

    if (imageOpen && imageUpload.length == 0) {
      setError("Por favor, suba un video");
      return;
    } else {
      setError("");
    }

    if (imageOpen && !formImageUpload) {
      setError("Por favor, suba un archivo multimedia");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", formImageUpload);
    formData.append("page", "academy");
    formData.append(
      "data",
      JSON.stringify({
        title: title,
        description: description,
        image: content,
        date: date,
        category_id: categoryId,
      })
    );

    toast.promise(
      axios
        .put(
          `${urlApi}landing/u/update-news-admin/${newsContent.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "api-key": apiKey,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            refreshCourses();
            onClose();
            return "Curso actualizado con éxito";
          } else {
            throw new Error("Error al actualizar el curso");
          }
        }),
      {
        loading: "Editando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de edición",
      }
    );
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Editar Curso"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
          content: {
            width: "fit-content",
            height: "fit-content",
            margin: "auto",
            borderRadius: "8px",
            padding: "40px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <section className="edit-class">
          <h1 className="title__edit-class lg-margin-bottom">Editar clase</h1>
          <label className="label__add-class sm-margin-bottom">Fecha</label>
          <input
            className="input__add-class sm-margin-bottom"
            type="date"
            placeholder="Ej: 2025-03 (Año - mes)"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label className="label__add-class sm-margin-bottom">Imagen</label>
          {!imageOpen && (
            <>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  onClick={() => setImageOpen(true)}
                  className="btn-upload__add-course"
                >
                  Agregar imagen
                </button>
              </div>
            </>
          )}

          {imageOpen && (
            <section className="upload-section">
              {files.length === 0 ? (
                <div
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
                  {imageUpload && (
                    <img
                      src={imageUpload}
                      alt="Preview"
                      className="w-full h-50 max-h-52 object-cover rounded-md mb-4"
                    />
                  )}
                  <button
                    onClick={() => {
                      setFiles([]);
                      setImageUpload("");
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

          <label
            htmlFor="course-title-edit"
            className="label__edit-class sm-margin-bottom"
          >
            Título de la clase
          </label>
          <input
            id="course-title-edit"
            type="text"
            className="input__edit-class lg-margin-bottom"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="course-description-edit"
            className="label__edit-class sm-margin-bottom"
          >
            Descripción de la clase
          </label>
          <textarea
            id="course-description-edit"
            type="text"
            className="textarea__edit-class lg-margin-bottom"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label className="label__add-class sm-margin-bottom">Categoría</label>
          <input
            className="input__add-class sm-margin-bottom"
            type="number"
            placeholder="Ej: General"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            className="btn-edit__edit-class lg-margin-bottom"
            onClick={handleUpdateClass}
            disabled={loading}
          >
            {loading ? "Editando..." : "Editar clase"}
          </button>

          <button onClick={onClose} className="btn-back__edit-class">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}

// /* eslint-disable react/prop-types */
// import { useContext, useState, useCallback, useEffect } from "react";
// import AppContext from "@context/app/app-context";
// import { useDropzone } from "react-dropzone";
// import Modal from "react-modal";
// import { toast } from "sonner";
// import axios from "axios";

// export default function EditNews({
//   isOpen,
//   onClose,
//   refreshCourses,
//   indice,
//   newsContent,
// }) {
//   const context = useContext(AppContext);
//   const urlApi = context.urlApi;
//   const apiKey = context.apiKey;

//   const [imageOpen, setImageOpen] = useState(false);
//   const [imageUpload, setImageUpload] = useState("");
//   const [formImageUpload, setFormImageUpload] = useState("");
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [newNews, setNewNews] = useState({
//     title: "",
//     description: "",
//     image: "",
//     date: "",
//     category_id: "",
//   });

//   // Cargar contenido cuando cambia newsContent
//   useEffect(() => {
//     if (newsContent) {
//       setNewNews({
//         title: newsContent.title || "",
//         description: newsContent.description || "",
//         image: newsContent.image || "",
//         date: newsContent.date || "",
//         category_id: newsContent.category_id || "",
//       });
//     }
//   }, [newsContent]);

//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles.length > 0) {
//       setFiles(acceptedFiles);
//       setImageUpload(URL.createObjectURL(acceptedFiles[0]));
//       setFormImageUpload(acceptedFiles[0]);
//       setError("");
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: "image/jpeg, image/png, image/webp, video/mp4",
//   });

//   function cancelUploadImage() {
//     setImageOpen(false);
//     setFiles([]);
//     setImageUpload("");
//   }

//   async function handleEditNews() {
//     if (imageOpen && imageUpload.length === 0) {
//       setError("Por favor, suba una imagen");
//       return;
//     }

//     const { title, description, date, category_id } = newNews;
//     if (
//       !title.trim() ||
//       !description.trim() ||
//       !date.trim() ||
//       !category_id.toString().trim()
//     ) {
//       setError("Todos los campos son obligatorios.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     const formData = new FormData();
//     if (formImageUpload) {
//       formData.append("file", formImageUpload);
//     }
//     formData.append("page", "landing");
//     formData.append(
//       "data",
//       JSON.stringify({
//         ...newNews,
//       })
//     );

//     toast.promise(
//       axios
//         .put(`${urlApi}landing/i/edit-news-admin/${indice}`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             "api-key": apiKey,
//           },
//         })
//         .then((response) => {
//           if (response.data.success) {
//             setNewNews({
//               title: "",
//               description: "",
//               image: "",
//               date: "",
//               category_id: "",
//             });
//             setImageUpload("");
//             setLoading(false);
//             refreshCourses();
//             onClose();
//             return "Noticia guardada con éxito";
//           } else {
//             throw new Error(
//               "Error al guardar la noticia: " + response.data.message
//             );
//           }
//         }),
//       {
//         loading: "Guardando cambios...",
//         success: (msg) => msg,
//         error: (err) => err.message || "Error en la solicitud de guardado",
//       }
//     );
//   }

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel="Editar Noticia"
//       style={{
//         overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
//         content: {
//           width: "fit-content",
//           height: "fit-content",
//           margin: "auto",
//           borderRadius: "8px",
//           padding: "20px",
//           backgroundColor: "white",
//           display: "flex",
//           flexDirection: "column",
//           overflowY: "scroll",
//         },
//       }}
//     >
//       <section className="add-class">
//         <h1 className="title__add-class sm-margin-bottom">Editar Noticia</h1>

//         <label className="label__add-class sm-margin-bottom">Fecha</label>
//         <input
//           className="input__add-class sm-margin-bottom"
//           type="date"
//           value={newNews.date}
//           onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
//           required
//         />

//         <label className="label__add-class sm-margin-bottom">Imagen</label>
//         <div {...getRootProps()} className="dropzone">
//           <input {...getInputProps()} />
//           {isDragActive ? (
//             <p>Suelta la imagen aquí...</p>
//           ) : (
//             <p>
//               Arrastra y suelta una imagen aquí, o haz clic para seleccionar
//               una.
//             </p>
//           )}
//           {imageUpload && (
//             <img src={imageUpload} alt="Previsualización" width="200" />
//           )}
//         </div>
//         {files.length > 0 && (
//           <button onClick={cancelUploadImage}>Cancelar imagen</button>
//         )}

//         <label className="label__add-class sm-margin-bottom">Título</label>
//         <input
//           className="input__add-class sm-margin-bottom"
//           type="text"
//           value={newNews.title}
//           onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
//           required
//         />

//         <label className="label__add-class sm-margin-bottom">Descripción</label>
//         <textarea
//           className="textarea__add-class sm-margin-bottom"
//           value={newNews.description}
//           onChange={(e) =>
//             setNewNews({ ...newNews, description: e.target.value })
//           }
//           required
//         ></textarea>

//         <label className="label__add-class sm-margin-bottom">Categoría</label>
//         <input
//           className="input__add-class sm-margin-bottom"
//           type="number"
//           value={newNews.category_id}
//           onChange={(e) =>
//             setNewNews({ ...newNews, category_id: e.target.value })
//           }
//           required
//         />

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <button
//           className="btn-add__add-class lg-margin-bottom"
//           onClick={handleEditNews}
//           disabled={loading}
//         >
//           {loading ? "Guardando..." : "Guardar Noticia"}
//         </button>

//         <button onClick={onClose} className="btn-back__edit-course">
//           Cancelar
//         </button>
//       </section>
//     </Modal>
//   );
// }
