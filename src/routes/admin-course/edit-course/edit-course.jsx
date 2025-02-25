// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./edit-course.css";

export default function EditCourse() {
  return (
    <>
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

        <Link to={"/menu-course"} className="btn-back__edit-course">
          Regresar
        </Link>
      </section>
    </>
  );
}
