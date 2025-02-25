// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./menu-course.css";

export default function MenuCourse() {
  const courses = [
    {
      title: "Introduction to React",
      description: "Learn the basics of React",
    },
    {
      title: "Advanced JavaScript",
      description: "Master advanced JS concepts",
    },
  ];

  return (
    <>
      <section className="menu-course">
        <div className="home__menu-course">
          <h1 className="title__menu-course">Course Management</h1>
          <Link to={"/add-course"} className="btn-new__menu-course">
            (+) New Course
          </Link>
        </div>

        <ul className="list__menu-course">
          {courses.map((course, index) => (
            <li key={index} className="item__menu-course">
              <div className="cntr-info__menu-course">
                <h2 className="subtitle__menu-course">{course.title}</h2>
                <p className="text__menu-course">{course.description}</p>
              </div>
              <div className="cntr-btn__menu-course">
                <Link to={"/edit-course"} className="btn-edit__menu-course">
                  Edit
                </Link>
                <Link to={"/menu-class"} className="btn-manage__menu-course">
                  Manage Classes
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
