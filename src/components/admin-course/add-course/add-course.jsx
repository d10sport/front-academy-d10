/* eslint-disable react/prop-types */
// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import Modal from "react-modal";
// import axios from "axios";
import "./add-course.css";

export default function AddCourse({ isOpen, onClose }) {
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
            required
          />
          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Course Description
          </label>
          <textarea
            className="textarea__add-course sm-margin-bottom"
            name=""
            id=""
            placeholder="Enter course description"
            required
          ></textarea>
          <label className="label__add-course sm-margin-bottom" htmlFor="">
            Image Upload
          </label>
          <div className="cntr-input__add-course lg-margin-bottom">
            <input className="file__add-course" type="file" disabled />
            <button className="btn-upload__add-course" disabled>⬆</button>
          </div>
          <button className="btn-add__add-course lg-margin-bottom">
            Add Course
          </button>

          <button onClick={onClose} className="btn-back__edit-course">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
