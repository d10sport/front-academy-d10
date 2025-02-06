import { useParams } from "react-router-dom";
// import { useEffect, useState, useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import AppContext from "@context/app/app-context";
import "./video-class.css";

export default function VideoClass() {
  const { idCourse } = useParams(); // Obtener el ID del curso desde la URL
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  const urlApi = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get(`${urlApi}academy/g/class/${idCourse}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          console.warn("No se encontraron clases.");
          return;
        }
        setClasses(response.data);
        setSelectedClass(response.data[0]);
      })
      .catch((error) => {
        console.error("Error al obtener las clases:", error);
      });
  }, [idCourse]);

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
                src={selectedClass.class_content?.video_url || ""}
                controls
                muted
              ></video>
            </div>

            <div className="description__class">
              <h2 className="subtitle__class">{selectedClass.class_title}</h2>
              <p className="text__class">{selectedClass.class_description}</p>
            </div>

            <div className="cntr-comment__class">
              <h2 className="subtitle__class">Comentarios</h2>
              <ul className="comment__class">
                {classes
                  .filter((cls) => cls.id === selectedClass.id)
                  .map((cls) => (
                    <li key={cls.comment_id} className="comment-item__class">
                      <h2 className="subtitle__class">{cls.id_user}</h2>
                      <p className="text__class">{cls.comment}</p>
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
