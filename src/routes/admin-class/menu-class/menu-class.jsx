// import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
// import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
// import axios from "axios";
import "./menu-class.css";

export default function MenuClass() {
  const courses = [
    {
      title: "Introduction",
      description: "Getting started with the course",
    },
    {
      title: "Core Concepts",
      description: "Understanding the fundamentals",
    },
  ];

  return (
    <>
      <section className="menu-class">
        <div className="home__menu-class">
          <h1 className="title__menu-class">Manage Classes</h1>
          <Link
            to={"/add-class"}
            className="btn-new__menu-class"
            id="openModal"
          >
            (+) Add Class
          </Link>
        </div>

        <ul className="list__menu-class">
          {courses.map((course, index) => (
            <li key={index} className="item__menu-class">
              <div className="cntr-info__menu-class">
                <h2 className="subtitle__menu-class">{course.title}</h2>
                <p className="text__menu-class">{course.description}</p>
              </div>
              <div className="cntr-btn__menu-class">
                <Link to={"/edit-class"} className="btn-edit__menu-class">
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div id="overlay" className="overlay">
        <div className="modal">
          <p>Este es un modal</p>
          <button id="closeModal" className="close-btn">
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
}

{
  /* <script>
      // Obtener elementos
      const openBtn = document.getElementById("openModal");
      const closeBtn = document.getElementById("closeModal");
      const overlay = document.getElementById("overlay");

      // Evento para abrir el modal
      openBtn.addEventListener("click", () => {
        overlay.style.visibility = "visible";
        overlay.style.opacity = "1";
      });

      // Evento para cerrar el modal
      closeBtn.addEventListener("click", () => {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.style.visibility = "hidden";
        }, 300); // Espera la transición de 0.3s antes de ocultar
      });
    </script> */
}
