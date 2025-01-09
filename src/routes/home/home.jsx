import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";

export default function Test() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [courses, setCourses] = useState([]);

  function getDateTest() {
    axios
      .get(`${urlApi}academy/g/courses`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (!response.data || response.data.length === 0 || !response.data[0]) {
          console.warn("No se encontraron cursos.");
          return;
        }
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
      });
  }

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getDateTest();
    }
  }, [context.token]);

  return (
    <>
      <section className="section__home">
        <h1 className="title__home margin--space">Bienvenido Daniel</h1>
        <div className="cntr-big-img__home">
          <img src={Example} alt="" className="img__home" />
        </div>
        <h1 className="title__home title--color__home margin--space">
          Explora nuestras secciones de curso:
        </h1>
        <h2 className="subtitle__home">
          Explora nuestras secciones de cursos. Ideales para encontrar la
          formación perfecta en todo tipo de ámbito deportivo
        </h2>
        <div className="cntr-course__home">
          {courses.map((course, courseIndex) => (
            <div key={courseIndex} className="item__home">
              <h1 className="title__home title--color__home title-center__home margin--space">
                {course.course_title}
              </h1>
              <div className="cntr-info__home">
                <div className="cntr-small-img__home">
                  <img src={course.main_photo?.url} alt="Imagen del curso" />
                </div>
                <div className="subcntr-info__home">
                  <p className="text__home">{course.main_photo?.description}</p>
                  {course.class.map((classItem, classIndex) => (
                    <Link
                      key={classIndex}
                      to={`/class/${classItem.class_id}`}
                      className="link__home"
                    >
                      {classItem.class_title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="cntr-course__home">
          {courses.map((course, index) => (
            <div key={index} className="item__home">
              <h1 className="title__home title--color__home title-center__home margin--space">
                {course.course_title}
              </h1>
              <div className="cntr-info__home">
                <div className="cntr-small-img__home">
                  <img src={course.main_photo?.url} alt="Imagen del curso" />
                </div>
                <div className="subcntr-info__home">
                  <p className="text__home">{course.main_photo?.description}</p>
                  <Link to="/class" className="link__home">
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </section>
    </>
  );
}
