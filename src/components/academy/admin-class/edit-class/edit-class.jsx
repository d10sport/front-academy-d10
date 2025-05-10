/* eslint-disable react/prop-types */
import { useEffect, useContext, useState, useCallback } from "react";
import AppContext from "@context/app/app-context";
import { Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import { toast } from "sonner";
import axios from "axios";
import "./edit-class.css";

export default function EditClass({
  isOpen,
  onClose,
  classCourse,
  refreshCourses,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  // Nueva subida de video
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoUpload, setVideoUpload] = useState("");
  const [formVideoUpload, setFormVideoUpload] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (acceptedFiles.length > 0) {
      if (acceptedFiles[0].size > maxSize) {
        setError("El archivo es demasiado grande. Máximo 400KB.");
        return;
      }
      setFiles(acceptedFiles);
      setVideoUpload(URL.createObjectURL(acceptedFiles[0]));
      setFormVideoUpload(acceptedFiles[0]);
      setError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/webp, video/mp4",
  });

  function cancelUploadVideo() {
    setVideoOpen(false);
    setFiles([]);
    setVideoUpload("");
  }

  useEffect(() => {
    if (classCourse) {
      setTitle(classCourse.class_title || "");
      setDescription(classCourse.class_description || "");
      setContent(classCourse.class_content || "");
    }
  }, [classCourse]);

  // --------------------------------------

  async function handleUpdateClass() {
    if (!classCourse || !classCourse.class_id) {
      setError("No hay un curso válido para actualizar");
      return;
    }

    if (videoOpen && videoUpload.length == 0) {
      setError("Por favor, suba un video");
      return;
    } else {
      setError("");
    }

    if (videoOpen && !formVideoUpload) {
      setError("Por favor, suba un archivo multimedia");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", formVideoUpload);
    formData.append("page", "academy");
    formData.append(
      "data",
      JSON.stringify({
        id_course: classCourse.class_id,
        class_title: title,
        class_description: description,
        class_content: content,
      })
    );

    toast.promise(
      axios
        .put(
          `${urlApi}academy/u/update-class/${classCourse.class_id}`,
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

          <label className="label__add-class sm-margin-bottom" htmlFor="">
            Carga de video
          </label>
          {!videoOpen && (
            <>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  onClick={() => setVideoOpen(true)}
                  className="btn-upload__add-course"
                >
                  Cambiar video
                </button>
              </div>
            </>
          )}

          {videoOpen && (
            <section className="upload-section">
              <h1 className="title__add-class sm-margin-bottom">
                Añadir nueva video
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
                  {videoUpload && (
                    <video
                      src={videoUpload}
                      alt="Preview"
                      className="w-full h-50 max-h-52 object-cover rounded-md mb-4"
                    ></video>
                  )}
                  <button
                    onClick={() => {
                      setFiles([]);
                      setVideoUpload("");
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
                  onClick={() => cancelUploadVideo()}
                  className="btn-back__edit-course"
                >
                  Cancelar
                </button>
              </div>
            </section>
          )}

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
