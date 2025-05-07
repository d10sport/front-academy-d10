/* eslint-disable react/prop-types */
// import Example from "../../assets/img/example-img.png";
// import { Link } from "react-router-dom";
import AppContext from "@context/app/app-context";
import { useEffect, useState, useContext, useCallback } from "react";
import { Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import { toast } from "sonner";
import "./edit-course.css";
import axios from "axios";

export default function EditCourse({
  isOpen,
  onClose,
  course,
  refreshCourses,
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  // Nueva subida de image
  const [imageOpen, setImageOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState("");
  const [formImageUpload, setFormImageUpload] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
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
    if (course) {
      setTitle(course.course_title || "");
      setImage(course.main_photo.bg_photo || "");
      setDescription(course.description_course || "");
    }
  }, [course]);

  async function handleUpdateCourse() {
    if (!course || !course.id) {
      setError("Los campos no pueden estar vacíos");
      console.error("No hay un curso válido para actualizar");
      return;
    }

    if (imageOpen && imageUpload.length == 0) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", formImageUpload);
    formData.append("page", "academy");
    formData.append(
      "data",
      JSON.stringify({
        course_title: title,
        main_photo: image,
        description_course: description,
      })
    );

    toast.promise(
      axios
        .put(`${urlApi}academy/u/update-course/${course.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            console.log();
            setLoading(false);
            refreshCourses();
            onClose();
            return "Curso actualizado con éxito:";
          } else {
            throw new Error(
              "Error al actualizar el curso:" + response.data.message
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
        <section className="edit-course">
          <h1 className="title__edit-course lg-margin-bottom">Editar Curso</h1>
          <label
            htmlFor="course-title-edit"
            className="label__edit-course sm-margin-bottom"
          >
            Título del curso
          </label>
          <input
            id="course-title-edit"
            type="text"
            className="input__edit-course lg-margin-bottom"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="course-description-edit"
            className="label__edit-course sm-margin-bottom"
          >
            Descripción del curso
          </label>
          <textarea
            id="course-description-edit"
            type="text"
            className="textarea__edit-course lg-margin-bottom"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Carga de imagen
          </label>

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
              <h1 className="title__add-class sm-margin-bottom">
                Añadir nueva imagen
              </h1>
              <br />

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
                    <p className="mb-4 text-sm text-neutral-500">o</p>
                    <button className="px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-800 rounded-md hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600">
                      Seleccionar archivos
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            className="btn-edit__edit-course lg-margin-bottom"
            onClick={handleUpdateCourse}
            disabled={loading}
          >
            {loading ? "Editando..." : "Editar curso"}
          </button>

          <button onClick={onClose} className="btn-back__edit-course">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
