/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import { useContext } from "react";
import Modal from "react-modal";
import { toast } from "sonner";
import axios from "axios";
import "./delete-course.css";

export default function DeleteCourse({
  isOpen,
  onClose,
  courseId,
  courseUrl,
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

  async function getClassVideos() {
    try {
      const response = await axios.get(
        `${urlApi}academy/g/admin-class-videos/${courseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );
      return response.data || [];
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      return [];
    }
  }

  async function handleDeleteDateCourse() {
    if (!courseId) return;

    const videos = await getClassVideos();

    toast.promise(
      axios
        .delete(`${urlApi}academy/d/delete-course/${courseId}`, {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
          data: {
            url: courseUrl,
            urlClassVideos: videos,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            refreshCourses();
            onClose();
            return "Curso eliminado con éxito";
          } else {
            throw new Error(
              "Error al eliminar el curso: " + response.data.message
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
            onClick={() => handleDeleteDateCourse()}
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
