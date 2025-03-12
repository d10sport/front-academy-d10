/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import axios from "axios";

export default function DeleteNews({
  isOpen,
  onClose,
  indice,
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

    try {
      const response = await axios.put(
        `${urlApi}landing/d/delete-news-admin/1`,
        { index: indice },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        alert("Noticia eliminada con éxito");
        refreshCourses();
        onClose();
      } else {
        throw new Error(
          response.data.message || "Error al eliminar la noticia"
        );
      }
    } catch (error) {
      setError("Hubo un problema al eliminar la noticia.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
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
          onClick={handleDeleteNews}
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
