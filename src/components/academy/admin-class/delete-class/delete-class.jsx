/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import axios from "axios";
import "./delete-class.css";
import Modal from "react-modal";
import { toast } from "sonner";

export default function DeleteClass({
  isOpen,
  onClose,
  classId,
  classContent,
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

  async function handleDeleteDateClass() {
    debugger;
    if (!classId) return;

    // console.log("ID del curso a eliminar:", classId);

    toast.promise(
      axios
        .delete(`${urlApi}academy/d/delete-class/${classId}`, {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
          data: {
            url: classContent,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setLoading(false);
            refreshCourses();
            onClose();
            return "Clase eliminada con éxito";
          } else {
            throw new Error(
              "Error al eliminar la clase: " + response.data.message
            );
          }
        }),
      {
        loading: "Guardando cambios...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de eliminado",
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
            ¿Estás seguro de que quieres eliminar el curso con ID {classId}?
          </h1>
          <p className="text__delete-course lg-margin-bottom">
            Esta acción no se puede deshacer.
          </p>

          {error && <p className="error-message">{error}</p>}

          <button
            className="btn-delete__delete-course lg-margin-bottom"
            onClick={() => handleDeleteDateClass()}
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
