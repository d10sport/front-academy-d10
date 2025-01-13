import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./video-class.css";

export default function VideoClass() {
  // ---------------------------------------------------------

  const urlApi = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [Class, setClass] = useState({
    class_id: null,
    class_photo: "",
    class_title: "",
    class_content: [
      {
        url: "",
        title: "",
        comments: [],
        video_id: null,
        description: "",
      },
    ],
    class_description: "",
  });

  function getDateVideo() {
    axios
      .get(`${urlApi}academy/g/courses`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        // console.log("Datos recibidos:", response.data); // Verifica la estructura
        const courseData = response.data.find(
          (course) =>
            course.class &&
            course.class.some((c) => c.class_id === parseInt(classId))
        );

        if (courseData) {
          const classData = courseData.class.find(
            (c) => c.class_id === parseInt(classId)
          );
          if (classData) {
            setClass(classData);
          }
        } else {
          console.error("Clase no encontrada.");
        }
      })
      .catch((error) => {
        console.error("Error al cargar los datos de la clase:", error);
      });
  }

  useEffect(() => {
    getDateVideo();
  }, []);

  // console.log(Class.class_title);
  // ---------------------------------------------------------

  const { classId } = useParams();
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/class/${classId}`)
      .then((response) => {
        setClassData(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos de la clase:", error);
      });
  }, [classId]);

  if (!classData) {
    return <div>Cargando datos de la clase...</div>;
  }

  return (
    <>
      <section className="class">
        <div className="cntr-list__class">
          <div className="subcntr-list__class">
            <h1 className="title__class">Clases</h1>
            <ul className="list__class">
              <li className="list-item__class item--active">Clase 1</li>
              <li className="list-item__class item--active">Clase 2</li>
              <li className="list-item__class item--nowplaying">clase 3</li>
              <li className="list-item__class">clase 4</li>
            </ul>
          </div>
        </div>

        <div className="cntr-video__class">
          <div className="subcntr-video__class">
            <video
              className="video__class"
              src="https://youtu.be/dQw4w9WgXcQ"
              controls
              muted
            ></video>
          </div>

          <div className="description__class">
            {/* <h2 className="subtitle__class">Titulo del Video: Introducción</h2> */}
            <h2 className="subtitle__class">
              {Class.class_content?.[0]?.title || "Título no disponible"}
            </h2>

            <p className="text__class">
              {Class.class_content?.[0]?.description ||
                "Descripción no disponible"}
            </p>
            <div className="profile__class">
              <img className="profile-img__class" src="" alt="Profile" />
              <p className="text__class">Prof. Juan Pérez</p>
            </div>
          </div>

          <div className="cntr-comment__class">
            <h2 className="subtitle__class">Comentarios</h2>
            <form action="" className="form__class">
              <textarea
                className="textarea__class"
                name=""
                id=""
                placeholder="Escribe tu comentario..."
              ></textarea>
              <button className="btn__class">Publicar</button>
            </form>

            <ul className="comment__class">
              <li className="comment-item__class">
                <h2 className="subtitle__class">Ana Garcia</h2>
                <p className="text__class">
                  ¡Excelente video! Muy informativo.
                </p>
              </li>
              <li className="comment-item__class">
                <h2 className="subtitle__class">Carlos Rodriguez</h2>
                <p className="text__class">
                  Gracias por la explicación detallada
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
