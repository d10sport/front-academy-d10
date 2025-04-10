/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, useContext } from "react";
import AppContext from "@context/app/app-context";
import { Upload, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import Modal from "react-modal";
import axios from "axios";

export default function AddImg({ isOpen, onClose, refreshCourses }) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [galleryImg, setGalleryImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
      setGalleryImg(URL.createObjectURL(acceptedFiles[0]));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/webp, video/mp4",
  });

  useEffect(() => {
    setLoading(false);
    setError("");
  }, [galleryImg]);

  useEffect(() => {
    if (!isOpen) {
      setFiles([]);
      setGalleryImg("");
    }
  }, [isOpen]);

  async function handleAddImg() {
    if (files.length === 0) {
      setError("Debe seleccionar un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("page", "landing");

    setLoading(true);

    toast.promise(
      axios
        .put(`${urlApi}landing/i/save-gallery/1`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setGalleryImg(response.data.fileUrl);
            setFiles([]);
            setLoading(false);
            refreshCourses();
            onClose();
            return "La imagen se cargo con éxito";
          } else {
            throw new Error(
              "Error al subir la imagen: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de subida",
      }
    );
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
            padding: "20px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <section className="add-class">
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
              {galleryImg && (
                <img
                  src={galleryImg}
                  alt="Preview"
                  className="w-full h-50 max-h-52 object-cover rounded-md mb-4"
                />
              )}
              <button
                onClick={() => {
                  setFiles([]);
                  setGalleryImg("");
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
            <button onClick={onClose} className="btn-back__edit-course">
              Cancelar
            </button>
            <button
              className="btn-add__add-class"
              onClick={() => handleAddImg()}
              disabled={loading}
            >
              {loading ? "Añadiendo..." : "Guardar imagen"}
            </button>
          </div>
        </section>
      </Modal>
    </>
  );
}
