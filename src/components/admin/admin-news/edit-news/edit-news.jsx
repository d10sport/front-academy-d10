/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import axios from "axios";

export default function EditNews({ isOpen, onClose, indice, refreshCourses }) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newNews, setNewNews] = useState({
    date: "",
    image: "",
    title: "",
    description: "",
  });

  async function handleUpdateNews() {
    if (
      !newNews.date.trim() ||
      !newNews.image.trim() ||
      !newNews.title.trim() ||
      !newNews.description.trim()
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-news-admin/1`,
        {
          index: indice,
          ...newNews,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        alert("Noticia guardada con éxito");
        setNewNews({ date: "", image: "", title: "", description: "" });
        refreshCourses();
        onClose();
      } else {
        throw new Error("Error al guardar la noticia");
      }
    } catch (error) {
      setError("Hubo un problema al guardar la noticia.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Noticia"
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
      <section className="edit-class">
        <h1 className="title__edit-class sm-margin-bottom">Editar Noticia</h1>

        <label className="label__edit-class sm-margin-bottom">Fecha</label>
        <input
          className="input__edit-class sm-margin-bottom"
          type="text"
          placeholder="Ej: 2025-03 (Año - mes)"
          value={newNews.date}
          onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
          required
        />

        <label className="label__edit-class sm-margin-bottom">
          Imagen (URL)
        </label>
        <input
          className="input__edit-class sm-margin-bottom"
          type="text"
          placeholder="Ej: https://mi_img.com/imagen.jpg"
          value={newNews.image}
          onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
          required
        />

        <label className="label__edit-class sm-margin-bottom">Título</label>
        <input
          className="input__edit-class sm-margin-bottom"
          type="text"
          placeholder="Ej: Nueva noticia"
          value={newNews.title}
          onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
          required
        />

        <label className="label__edit-class sm-margin-bottom">
          Descripción
        </label>
        <textarea
          className="textarea__edit-class sm-margin-bottom"
          placeholder="Ingresa la descripción aquí..."
          value={newNews.description}
          onChange={(e) =>
            setNewNews({ ...newNews, description: e.target.value })
          }
          required
        ></textarea>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          className="btn-edit__edit-class lg-margin-bottom"
          onClick={handleUpdateNews}
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar Noticia"}
        </button>

        <button onClick={onClose} className="btn-back__edit-class">
          Cancelar
        </button>
      </section>
    </Modal>
  );
}
