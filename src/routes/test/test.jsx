import Example from "../../assets/img/example-img.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "./test.css";

export default function Test() {
  const urlApi = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

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
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getDateTest();
  }, []);

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
                  <a href="#" className="link__home">
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
