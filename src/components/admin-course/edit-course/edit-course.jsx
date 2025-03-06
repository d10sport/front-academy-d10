/* eslint-disable react/prop-types */
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import "./edit-course.css";

export default function EditCourse({ isOpen, onClose, course }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  useEffect(() => {
    if (course) {
      setTitle(course.course_title || "");
      setDescription(course.description_course || "");
    }
  }, [course]);

  async function handleUpdateCourse() {
    if (!course || !course.id) {
      console.error("No hay un curso válido para actualizar");
      return;
    }

    try {
      const response = await axios.put(
        `${urlApi}academy/u/update-course/${course.id}`,
        {
          course_title: title,
          description_course: description,
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
      console.error("Error en la solicitud de actualización:", error);
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
        <section className="edit-course">
          <h1 className="title__edit-course lg-margin-bottom">Edit Course</h1>
          <label
            htmlFor="course-title-edit"
            className="label__edit-course sm-margin-bottom"
          >
            Course Title
          </label>
          <input
            id="course-title-edit"
            type="text"
            className="input__edit-course lg-margin-bottom"
            placeholder="Enter course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="course-description-edit"
            className="label__edit-course sm-margin-bottom"
          >
            Course Description
          </label>
          <textarea
            id="course-description-edit"
            type="text"
            className="textarea__edit-course lg-margin-bottom"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            className="btn-edit__edit-course lg-margin-bottom"
            onClick={handleUpdateCourse}
          >
            Save Course
          </button>

          <button onClick={onClose} className="btn-back__edit-course">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
