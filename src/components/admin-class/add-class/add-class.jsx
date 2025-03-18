/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import axios from "axios";
import "./add-class.css";
// import { DatabaseBackup } from "lucide-react";

export default function AddClass({
  isOpen,
  onClose,
  idCourse,
  refreshCourses,
}) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [classTitle, setClassTitle] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [classContent, setClassContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAddClass() {
    if (
      !classTitle.trim() ||
      !classDescription.trim() ||
      !classContent.trim()
    ) {
      setError("Los campos no pueden estar vacíos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${urlApi}academy/i/add-class`,
        {
          id_course: idCourse,
          class_title: classTitle,
          class_description: classDescription,
          class_content: classContent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        alert("Clase agregado con éxito");
        setClassTitle("");
        setClassDescription("");
        setClassContent("");
      } else {
        throw new Error("Error al agregar la clase");
      }
    } catch (error) {
      setError("Hubo un problema al agregar la clase");
      console.error("Error:", error);
    } finally {
      setLoading(false);
      refreshCourses();
      onClose();
    }
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
        <section className="add-class">
          <h1 className="title__add-class sm-margin-bottom">Add New Class</h1>
          <p className="text__add-class lg-margin-bottom">
            Create a new class.
          </p>
          <label className="label__add-class sm-margin-bottom" htmlFor="">
            Class Title
          </label>
          <input
            className="input__add-class sm-margin-bottom"
            type="text"
            placeholder="Enter course title"
            value={classTitle}
            onChange={(e) => setClassTitle(e.target.value)}
            required
          />
          <label className="label__add-class sm-margin-bottom" htmlFor="">
            Class Description
          </label>
          <textarea
            className="textarea__add-class sm-margin-bottom"
            placeholder="Enter course description"
            value={classDescription}
            onChange={(e) => setClassDescription(e.target.value)}
            required
          ></textarea>

          {/* Borrar según lo requerido */}

          <label className="label__add-class sm-margin-bottom" htmlFor="">
            Class Title
          </label>
          <input
            className="input__add-class sm-margin-bottom"
            type="text"
            placeholder="Enter course title"
            value={classContent}
            onChange={(e) => setClassContent(e.target.value)}
            required
          />

          {/* Quitar el disabled en caso de eliminar el anterior */}

          <label className="label__add-class sm-margin-bottom" htmlFor="">
            Image Upload
          </label>
          <div className="cntr-input__add-class lg-margin-bottom">
            <input className="file__add-class" type="file" disabled />
            <button className="btn-upload__add-class" disabled>
              ⬆
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            className="btn-add__add-class lg-margin-bottom"
            onClick={handleAddClass}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Class"}
          </button>

          <button onClick={onClose} className="btn-back__edit-course">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
