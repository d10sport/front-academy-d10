// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./add-course.css";

export default function AddCourse() {
  return (
    <>
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
        />
        <label className="label__add-course sm-margin-bottom" htmlFor="">
          Course Description
        </label>
        <textarea
          className="textarea__add-course sm-margin-bottom"
          name=""
          id=""
          placeholder="Enter course description"
        ></textarea>
        <label className="label__add-course sm-margin-bottom" htmlFor="">
          Image Upload
        </label>
        <div className="cntr-input__add-course lg-margin-bottom">
          <input className="file__add-course" type="file" />
          <button className="btn-upload__add-course">⬆</button>
        </div>
        <button className="btn-add__add-course lg-margin-bottom">
          Add Course
        </button>
        <Link to={"/menu-course"} className="btn-back__edit-course">
          Cancelar
        </Link>
      </section>
    </>
  );
}
