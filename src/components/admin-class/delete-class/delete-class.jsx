/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import axios from "axios";
import "./delete-class.css";
import Modal from "react-modal";

export default function DeleteClass({
  isOpen,
  onClose,
  classId,
  refreshCourses,
}) {

  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteDateCourse() {
    if (!classId) return;

    console.log("ID del curso a eliminar:", classId);

    try {
      await axios.delete(`${urlApi}academy/d/delete-class/${classId}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      return true;
    } catch (error) {
      console.error("Error eliminando la clase:", error);
      return false;
    }
  }

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    const success = await deleteDateCourse();

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
            ¿Estás seguro de que quieres eliminar el curso con ID {classId}?
          </h1>
          <p className="text__delete-course lg-margin-bottom">
            Esta acción no se puede deshacer.
          </p>

          {error && <p className="error-message">{error}</p>}

          <button
            className="btn-delete__delete-course lg-margin-bottom"
            onClick={handleDelete}
            disabled={loading}
          >
            <div className="text-[white]">
              {loading ? "Eliminando..." : "Eliminar curso de forma permanente"}
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
