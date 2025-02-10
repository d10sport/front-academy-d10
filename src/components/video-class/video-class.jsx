import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AppContext from "@context/app/app-context";
import "./video-class.css";

export default function VideoClass() {
  const { idCourse } = useParams();
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [selectedClass, setSelectedClass] = useState(null);
  const [comments, setComments] = useState([]);
  const [classes, setClasses] = useState([]);

  async function getClassContent() {
    try {
      const response = await axios.get(`${urlApi}/academy/g/class/content`, {
        params: { id: idCourse },
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (response.data && response.data.data) {
        setSelectedClass(response.data.data);
      }
    } catch (error) {
      console.error("Error al obtener el contenido de la clase:", error);
    }
  }

  async function getClassMenu() {
    try {
      const response = await axios.get(`${urlApi}/academy/g/class/menu`, {
        params: { id_course: idCourse },
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (response.data && response.data.data) {
        setClasses(response.data.data);
        if (response.data.data.length > 0) {
          setSelectedClass(response.data.data[0]);
        }
      }
    } catch (error) {
      console.error("Error al obtener el menú de clases:", error);
    }
  }

  async function getClassComments(classId) {
    try {
      const response = await axios.get(`${urlApi}/academy/g/class/comments`, {
        params: { id_course: idCourse, id_class: classId },
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (response.data && response.data.data) {
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("Error al obtener los comentarios de la clase:", error);
    }
  }

  useEffect(() => {
    getClassContent();
    getClassMenu();
  }, [idCourse]);

  useEffect(() => {
    if (selectedClass) {
      getClassComments(selectedClass.id);
    } else {
      setComments([]);
    }
  }, [selectedClass]);

  return (
    <section className="class">
      <div className="cntr-list__class">
        <div className="subcntr-list__class">
          <h1 className="title__class">Clases</h1>
          <ul className="list__class">
            {classes.map((cls) => (
              <li
                key={cls.id}
                className={`list-item__class ${
                  selectedClass?.id === cls.id
                    ? "item--nowplaying"
                    : "item--active"
                }`}
                onClick={() => setSelectedClass(cls)}
              >
                {cls.class_title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="cntr-video__class">
        {selectedClass && (
          <>
            <div className="subcntr-video__class">
              <video
                className="video__class"
                src={selectedClass.class_content?.video || ""}
                controls
                muted
              ></video>
            </div>

            <div className="description__class">
              <h2 className="subtitle__class">{selectedClass.class_title}</h2>
              <p className="text__class">{selectedClass.class_description}</p>
              <div className="profile__class">
                <img className="profile-img__class" src="" alt="Profile" />
                <p className="text__class">Prof. Juan Pérez</p>
              </div>
            </div>

            <div className="cntr-comment__class">
              <h2 className="subtitle__class">Comentarios</h2>
              <div className="form__class">
                <textarea
                  className="textarea__class"
                  placeholder="Escribe tu comentario..."
                ></textarea>
                <button className="btn__class">Publicar</button>
              </div>
              <ul className="comment__class">
                {comments
                  .filter((comment) => comment.id_class === selectedClass.id)
                  .map((comment) => (
                    <li
                      key={comment.comment_id}
                      className="comment-item__class"
                    >
                      <h2 className="subtitle__class">{comment.nombre}</h2>
                      <p className="text__class">{comment.comentario}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

{
  /* <section className="class">
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
            
            <h2 className="subtitle__class">Título no disponible
            </h2>

            <p className="text__class">
              
                Descripción no disponible
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
      </section> */
}
