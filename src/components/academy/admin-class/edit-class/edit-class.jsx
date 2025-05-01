/* eslint-disable react/prop-types */
import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "./edit-class.css";

export default function EditClass({
  isOpen,
  onClose,
  classCourse,
  refreshCourses,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  useEffect(() => {
    if (classCourse) {
      setTitle(classCourse.class_title || "");
      setDescription(classCourse.class_description || "");
      setContent(classCourse.class_content || "");
    }
  }, [classCourse]);

  async function handleUpdateClass() {
    if (!classCourse || !classCourse.class_id) {
      setError("Los campos no pueden estar vacíos");
      console.error("No hay un curso válido para actualizar");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `${urlApi}academy/u/update-class/${classCourse.class_id}`,
        {
          class_title: title,
          class_description: description,
          class_content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Curso actualizado con éxito:", response.data);
        onClose();
      } else {
        console.error("Error al actualizar el curso:", response.data.message);
      }
    } catch (error) {
      setError("Hubo un problema al actualizar la clase");
      console.error("Error en la solicitud de actualización:", error);
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
        contentLabel="Editar Curso"
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
        <section className="edit-class">
          <h1 className="title__edit-class lg-margin-bottom">Edit Class</h1>
          <label
            htmlFor="course-title-edit"
            className="label__edit-class sm-margin-bottom"
          >
            Class Title
          </label>
          <input
            id="course-title-edit"
            type="text"
            className="input__edit-class lg-margin-bottom"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="course-description-edit"
            className="label__edit-class sm-margin-bottom"
          >
            Class Description
          </label>
          <textarea
            id="course-description-edit"
            type="text"
            className="textarea__edit-class lg-margin-bottom"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Borrar según lo requerido */}

          <label className="label__add-class sm-margin-bottom" htmlFor="">
            Class Url Img
          </label>
          <input
            className="input__add-class sm-margin-bottom"
            type="text"
            placeholder="Enter course title"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
            className="btn-edit__edit-class lg-margin-bottom"
            onClick={handleUpdateClass}
            disabled={loading}
          >
            {loading ? "Editing..." : "Edit Course"}
          </button>

          <button onClick={onClose} className="btn-back__edit-class">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
