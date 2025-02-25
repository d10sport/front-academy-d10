// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./add-class.css";

export default function AddClass() {
  return (
    <>
      <section className="add-class">
        <h1 className="title__add-class sm-margin-bottom">Add New Class</h1>
        <p className="text__add-class lg-margin-bottom">
          Create a new class for this course.
        </p>
        <label className="label__add-class sm-margin-bottom">Class Title</label>
        <input
          className="input__add-class sm-margin-bottom"
          type="text"
          placeholder="Enter class title"
        />
        <label className="label__add-class sm-margin-bottom">
          Class Description
        </label>
        <textarea
          className="textarea__add-class sm-margin-bottom"
          name=""
          id=""
          placeholder="Enter class description"
        ></textarea>
        <label className="label__add-class sm-margin-bottom">
          Video Upload
        </label>
        <div className="cntr-input__add-class lg-margin-bottom">
          <input className="file__add-class" type="file" />
          <button className="btn-upload__add-class">⬆</button>
        </div>
        <button className="btn-add__add-class lg-margin-bottom">
          Add Class
        </button>
        <Link to={"/menu-class"} className="btn-back__edit-course">
          Cancelar
        </Link>
      </section>
    </>
  );
}
