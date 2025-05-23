// import Example from "../../assets/img/example-img.png";
import AddCourse from "../../components/academy/admin-course/add-course/add-course.jsx";
import EditCourse from "../../components/academy/admin-course/edit-course/edit-course.jsx";
import DeleteCourse from "../../components/academy/admin-course/delete-course/delete-course.jsx";
import { useEffect, useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./menu-course.css";
import Loader from "../../ui/loaders/fake-load/loader.fake.jsx";

export default function MenuCourse() {
  const [modalIsOpenOne, setModalIsOpenOne] = useState(false);
  const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalIsOpenThree, setModalIsOpenThree] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseUrl, setSelectedCourseUrl] = useState(null);

  const [loading, setLoading] = useState(true);

  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [courses, setCourses] = useState([]);

  async function getDateCourses() {
    try {
      const response = await axios.get(`${urlApi}academy/g/courses`, {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="menu-course">
          <div className="home__menu-course">
            <h1 className="title__menu-course">Gestión de cursos</h1>
            <button
              onClick={() => setModalIsOpenOne(true)}
              className="btn-new__menu-course"
            >
              Agregar curso
            </button>
          </div>

          <ul className="list__menu-course">
            {courses.map((course, index) => (
              <li key={index} className="item__menu-course">
                <div className="cntr-info__menu-course">
                  <h2 className="subtitle__menu-course">
                    {course.course_title}
                  </h2>
                  <p className="text__menu-course">
                    {course.description_course}
                  </p>
                </div>
                <div className="cntr-btn__menu-course">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      setModalIsOpenTwo(true);
                    }}
                    className="btn-edit__menu-course"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setSelectedCourseUrl(course.main_photo.bg_photo);
                      setModalIsOpenThree(true);
                    }}
                    className="btn-delete__menu-course"
                  >
                    Eliminar
                  </button>

                  <Link
                    to={`/menu-class/${course.id}`}
                    className="btn-manage__menu-course"
                  >
                    Administrar clases
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <AddCourse
        isOpen={modalIsOpenOne}
        onClose={() => setModalIsOpenOne(false)}
        refreshCourses={() => getDateCourses()}
      ></AddCourse>

      <EditCourse
        isOpen={modalIsOpenTwo}
        onClose={() => setModalIsOpenTwo(false)}
        course={selectedCourse}
        refreshCourses={() => getDateCourses()}
      />

      <DeleteCourse
        isOpen={modalIsOpenThree}
        onClose={() => setModalIsOpenThree(false)}
        courseId={selectedCourseId}
        courseUrl={selectedCourseUrl}
        refreshCourses={() => getDateCourses()}
      />
    </>
  );
}
