/* eslint-disable react/prop-types */
// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
// import { Link } from "react-router-dom";
import Modal from "react-modal";
// import axios from "axios";
import "./edit-class.css";

export default function EditClass({ isOpen, onClose }) {
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
          ></textarea>

          <button className="btn-edit__edit-class lg-margin-bottom">
            Save Course
          </button>

          <button onClick={onClose} className="btn-back__edit-class">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
