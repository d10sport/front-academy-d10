/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import axios from "axios";

export default function DeleteImg({ isOpen, onClose, indice, refreshCourses }) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleDeleteImg() {
    if (!indice) {
      console.error("No hay un indice válido para actualizar");
      return;
    }

    try {
      const response = await axios.put(
        `${urlApi}landing/d/delete-gallery/1`,
        {
          index: indice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Imagen actualizado con éxito:", response.data);
        onClose();
      } else {
        console.error("Error al actualizar la imagen:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  const handleDeleteReload = async () => {
    setLoading(true);
    setError(null);

    const success = await handleDeleteImg();

    if (success) {
      refreshCourses();
      onClose();
    } else {
      setError("Error al eliminar el curso. Intenta de nuevo.");
    }

    setLoading(false);
  };

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
            onClick={handleDeleteReload}
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
