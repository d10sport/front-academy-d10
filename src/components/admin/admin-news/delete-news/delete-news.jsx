/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import { toast } from "sonner";
import axios from "axios";

export default function DeleteNews({
  isOpen,
  onClose,
  indice,
  newsContent,
  refreshCourses,
}) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDeleteNews() {
    if (indice === undefined || indice === null) {
      setError("No hay un índice válido para eliminar.");
      return;
    }

    toast.promise(
      axios
        .put(
          `${urlApi}landing/d/delete-news-admin/1`,
          { index: indice, url: newsContent },
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
            return "Noticia eliminada con éxito";
          } else {
            throw new Error(
              "Error al eliminar la noticia: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de eliminación",
      }
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Eliminar Noticia"
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
          ¿Estás seguro de que quieres eliminar esta noticia?
        </h1>
        <p className="text__delete-course lg-margin-bottom">
          Esta acción no se puede deshacer.
        </p>

        {error && <p className="error-message">{error}</p>}

        <button
          className="btn-delete__delete-course lg-margin-bottom"
          onClick={() => handleDeleteNews()}
          disabled={loading}
        >
          <div className="text-[white]">
            {loading ? "Eliminando..." : "Eliminar noticia de forma permanente"}
          </div>
        </button>

        <button onClick={onClose} className="btn-back__delete-course">
          Cancelar
        </button>
      </section>
    </Modal>
  );
}
