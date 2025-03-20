/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "./add-course.css";

export default function AddCourse({ isOpen, onClose, refreshCourses }) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [courseTitle, setCourseTitle] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAddCourse() {
    if (!courseTitle.trim() || !courseDescription.trim()) {
      setError("Los campos no pueden estar vacíos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${urlApi}academy/i/add-course`,
        {
          course_title: courseTitle,
          main_photo: courseImage,
          description_course: courseDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        alert("Curso agregado con éxito");
        setCourseTitle("");
        setCourseImage("");
        setCourseDescription("");
      } else {
        throw new Error("Error al agregar el curso");
      }
    } catch (error) {
      setError("Hubo un problema al agregar el curso");
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
        <section className="add-course">
          <h1 className="title__add-course sm-margin-bottom">Add New Class</h1>
          <p className="text__add-course lg-margin-bottom">
            Create a new course.
          </p>
          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Course Title
          </label>
          <input
            className="input__add-course sm-margin-bottom"
            type="text"
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Course Description
          </label>
          <textarea
            className="textarea__add-course sm-margin-bottom"
            placeholder="Enter course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          ></textarea>

          {/* Borrar según lo requerido */}

          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Course Url Img
          </label>
          <input
            className="input__add-course sm-margin-bottom"
            type="text"
            placeholder="Enter course title"
            value={courseImage}
            onChange={(e) => setCourseImage(e.target.value)}
            required
          />

          {/* Quitar el disabled en caso de eliminar el anterior */}

          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Image Upload
          </label>
          <div className="cntr-input__add-course lg-margin-bottom">
            <input className="file__add-course" type="file" disabled />
            <button className="btn-upload__add-course" disabled>
              ⬆
            </button>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            className="btn-add__add-course lg-margin-bottom"
            onClick={handleAddCourse}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Course"}
          </button>

          <button onClick={onClose} className="btn-back__edit-course">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
