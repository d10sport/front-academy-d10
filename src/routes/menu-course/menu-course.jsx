import AddCourse from "../../components/admin-course/add-course/add-course.jsx";
import EditCourse from "../../components/admin-course/edit-course/edit-course.jsx";
import { useEffect, useContext, useState } from "react";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./menu-course.css";

export default function MenuCourse() {
  const [modalIsOpenOne, setModalIsOpenOne] = useState(false);
  const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);

  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [courses, setCourses] = useState([]);

  async function getDateCourses() {
    try {
      const response = await axios.get(`${urlApi}/academy/g/courses`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });
      setCourses(response.data || []);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  }

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getDateCourses();
    }
  }, [context.token]);

  return (
    <>
      <section className="menu-course">
        <div className="home__menu-course">
          <h1 className="title__menu-course">Course Management</h1>
          <button
            onClick={() => setModalIsOpenOne(true)}
            className="btn-new__menu-course"
          >
            Add Course
          </button>
        </div>

        <ul className="list__menu-course">
          {courses.map((course, index) => (
            <li key={index} className="item__menu-course">
              <div className="cntr-info__menu-course">
                <h2 className="subtitle__menu-course">{course.course_title}</h2>
                <p className="text__menu-course">{course.description_course}</p>
              </div>
              <div className="cntr-btn__menu-course">
                <button
                  onClick={() => setModalIsOpenTwo(true)}
                  className="btn-edit__menu-course"
                >
                  Edit
                </button>
                <Link to={`/menu-class/${course.id}`} className="btn-manage__menu-course">
                  Manage Classes
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <AddCourse
        isOpen={modalIsOpenOne}
        onClose={() => setModalIsOpenOne(false)}
      ></AddCourse>

      <EditCourse
        isOpen={modalIsOpenTwo}
        onClose={() => setModalIsOpenTwo(false)}
      ></EditCourse>
    </>
  );
}
