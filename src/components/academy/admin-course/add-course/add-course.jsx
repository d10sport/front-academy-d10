/* eslint-disable react/prop-types */
import { useContext, useState, useCallback } from "react";
import AppContext from "@context/app/app-context";
import { Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import axios from "axios";
import "./add-course.css";

export default function AddCourse({ isOpen, onClose, refreshCourses }) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [courseTitle, setCourseTitle] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  // --------------------------------------

  async function handleAddCourse() {
    if (imageOpen && imageUpload.length == 0) {
      setError("Por favor, suba una imagen");
      return;
    } else {
      setError("");
    }

    if (!courseTitle.trim() || !courseDescription.trim()) {
      setError("Los campos no pueden estar vacíos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", formImageUpload);
      formData.append("page", "academy");
      formData.append(
        "data",
        JSON.stringify({
          course_title: courseTitle,
          main_photo: courseImage,
          description_course: courseDescription,
        })
      );

      const response = await axios.post(
        `${urlApi}academy/i/add-course`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        alert("Curso agregado con éxito");
        setCourseTitle("");
        setCourseImage("");
        setImageUpload("");
        setFormImageUpload("");
        setCourseDescription("");
      } else {
        throw new Error("Error al agregar el curso");
      }
    } catch (error) {
      setError("Hubo un problema al agregar el curso");
      console.error("Error:", error);
    } finally {
      setLoading(false);
      refreshCourses();
      onClose();
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Agregar Nuevo Curso"
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
            overflowY: "scroll",
          },
        }}
      >
        <section className="add-course">
          <h1 className="title__add-course sm-margin-bottom">Add New Class</h1>
          <p className="text__add-course lg-margin-bottom">
            Create a new course.
          </p>
          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Course Title
          </label>
          <input
            className="input__add-course sm-margin-bottom"
            type="text"
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Course Description
          </label>
          <textarea
            className="textarea__add-course sm-margin-bottom"
            placeholder="Enter course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          ></textarea>

          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Image Upload
          </label>

          {!imageOpen && (
            <>
              <div className="cntr-input__add-course lg-margin-bottom">
                <button
                  onClick={() => setImageOpen(true)}
                  className="btn-upload__add-course"
                >
                  Cambiar imagen
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            className="btn-add__add-course lg-margin-bottom"
            onClick={handleAddCourse}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>

          <button onClick={onClose} className="btn-back__edit-course">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
