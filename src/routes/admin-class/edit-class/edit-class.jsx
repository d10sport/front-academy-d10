// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./edit-class.css";

export default function EditClass() {
  return (
    <>
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

        <Link to={"/menu-class"} className="btn-back__edit-class">
          Regresar
        </Link>
      </section>
    </>
  );
}
