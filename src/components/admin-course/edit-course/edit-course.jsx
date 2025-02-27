/* eslint-disable react/prop-types */
// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import Modal from "react-modal";
// import axios from "axios";
import "./edit-course.css";

export default function EditCourse({ isOpen, onClose }) {
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
          ></textarea>

          <button className="btn-edit__edit-course lg-margin-bottom">
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
