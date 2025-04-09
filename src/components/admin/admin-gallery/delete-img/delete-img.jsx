/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import { toast } from "sonner";
import axios from "axios";

export default function DeleteImg({
  isOpen,
  onClose,
  indice,
  urlS3,
  refreshCourses,
}) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
    setError("");
  }, []);

  async function handleDeleteImg() {
    if (!indice) {
      setError("No hay un indice válido para actualizar");
      return;
    }

    setLoading(true);

    toast.promise(
      axios
        .put(
          `${urlApi}landing/d/delete-gallery/1`,
          {
            index: indice,
            url: urlS3,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            refreshCourses();
            onClose();
            return "Imagen eliminada con éxito";
          } else {
            throw new Error(
              "Error al eliminar la imagen: " + response.data.message
            );
          }
        }),
      {
        loading: "Eliminando imagen...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de eliminación",
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
            padding: "40px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <section className="delete-course">
          <h1 className="title__delete-course sm-margin-bottom">
            ¿Estás seguro de que quieres eliminar esta imagen?
          </h1>
          <p className="text__delete-course lg-margin-bottom">
            Esta acción no se puede deshacer.
          </p>

          {error && <p className="error-message">{error}</p>}

          <button
            className="btn-delete__delete-course lg-margin-bottom"
            onClick={() => handleDeleteImg()}
            disabled={loading}
          >
            <div className="text-[white]">
              {loading
                ? "Eliminando..."
                : "Eliminar imagen de forma permanente"}
            </div>
          </button>

          <button onClick={onClose} className="btn-back__edit-course">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
