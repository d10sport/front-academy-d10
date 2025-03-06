/* eslint-disable react/prop-types */
import { useState } from "react";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./delete-course.css";

export default function DeleteCourse({
  isOpen,
  onClose,
  courseId,
  refreshCourses,
}) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteDateCourse() {
    if (!courseId) return;

    console.log("ID del curso a eliminar:", courseId);

    try {
      await axios.delete(`${urlApi}academy/d/delete-course/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      return true;
    } catch (error) {
      console.error("Error eliminando el curso:", error);
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
            ¿Estás seguro de que quieres eliminar el curso con ID {courseId}?
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
            <div className="text-[black]">
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
