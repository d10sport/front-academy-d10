import { useEffect, useState, useContext, useMemo } from "react";
import AppContext from "@context/app/app-context";
import { LogoHeader } from "@utils/icons/icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./video-class.css";

export default function VideoClass() {
  const { idCourse } = useParams();
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const id_user = context.user?.id_login;

  const [selectedClass, setSelectedClass] = useState(null);
  const [comments, setComments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [unlockedClass, setUnlockedClass] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedProgress = localStorage.getItem(`unlockedClass_${idCourse}`);
    if (savedProgress) {
      setUnlockedClass(Number(savedProgress));
    }
    getClassMenu();
  }, []);

  async function getClassContent(id) {
    try {
      const response = await axios.get(`${urlApi}academy/g/class/content`, {
        params: { id: id },
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (response.data && response.data.data) {
        setSelectedClass(response.data.data[0]);
      }
    } catch (error) {
      console.error("Error al obtener el contenido de la clase:", error);
    }
  }

  async function getClassMenu() {
    try {
      const response = await axios.get(`${urlApi}academy/g/class/menu`, {
        params: { id_course: idCourse },
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (response.data && response.data.data) {
        setClasses(response.data.data);
        const savedProgress = localStorage.getItem(`unlockedClass_${idCourse}`);
        const lastUnlocked = savedProgress
          ? Number(savedProgress)
          : response.data.data[0].class_id;
        setUnlockedClass(lastUnlocked);
        getClassContent(lastUnlocked);
        getClassComments(selectedClass.id_comments);
      }
    } catch (error) {
      console.error("Error al obtener el menú de clases:", error);
    }
  }

  async function getClassComments(classId) {
    try {
      const response = await axios.get(`${urlApi}academy/g/class/comments`, {
        params: { id_class: classId },
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

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(class_id, id_user) {
    if (!comment.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${urlApi}academy/i/class/post-comments`,
        {
          id_class: class_id,
          id_user: id_user,
          comment: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        alert("Comentario publicado con éxito");
        setComment("");
      } else {
        throw new Error("Error al publicar el comentario");
      }
    } catch (error) {
      setError("Hubo un problema al publicar el comentario");
      console.error("Hubo un problema al publicar el comentario:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleClassSelector(id) {
    if (id === unlockedClass) {
      getClassContent(id);
      getClassComments(selectedClass.id_comments);
    }
  }

  function unlockBeforeClass() {
    const currentIndex = classes.findIndex(
      (cls) => cls.class_id === unlockedClass
    );
    if (currentIndex > 0) {
      const previousClassId = classes[currentIndex - 1].class_id;
      setUnlockedClass(previousClassId);
      localStorage.setItem(`unlockedClass_${idCourse}`, previousClassId);
      getClassContent(previousClassId);
      getClassComments(selectedClass.id_comments);
    }
  }

  function unlockNextClass() {
    const currentIndex = classes.findIndex(
      (cls) => cls.class_id === unlockedClass
    );
    if (currentIndex < classes.length - 1) {
      const nextClassId = classes[currentIndex + 1].class_id;
      setUnlockedClass(nextClassId);
      localStorage.setItem(`unlockedClass_${idCourse}`, nextClassId);
      getClassContent(nextClassId);
      getClassComments(selectedClass.id_comments);
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const changeBtnClass = useMemo(() => {
    switch (deviceType) {
      case "mobile":
        return { show: true };
      case "tablet":
        return { show: true };
      default:
        return { show: false };
    }
  }, [deviceType]);

  const getElementHeader = () => {
    const header = document.getElementById("header_academy");
    header.classList.add("hidden");
  }

  useEffect(() => {
    getClassMenu();

    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType("mobile");
      } else if (width > 768 && width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    setTimeout(() => {
      getElementHeader();
    }, 500);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <section className="class">
        <div className="cntr-list__class">
          <div className="subcntr-list__class">
            {changeBtnClass.show ? (
              <div className="cntr-list__class">
                <div className="subcntr-list__class">
                  <h1 className="title-btn__class" onClick={toggleList}>
                    Clases
                  </h1>
                  {isOpen && (
                    <ul className="list__class">
                      {classes.map((cls) => (
                        <li
                          key={cls.class_id}
                          className="list-item__class"
                          onClick={() => handleClassSelector(cls.class_id)}
                        >
                          {cls.class_title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="cntr-list__class">
                <div className="subcntr-list__class">
                  <h1 className="title__class">Clases</h1>
                  <ul className="list__class">
                    {classes.map((cls) => (
                      <>
                        <li
                          key={cls.class_id}
                          className={`list-item__class relative ${cls.class_id === unlockedClass
                            ? "unlocked_class"
                            : "locked_class"
                            }`}
                          onClick={() => handleClassSelector(cls.class_id)}
                          style={{
                            cursor:
                              cls.class_id === unlockedClass
                                ? "pointer"
                                : "not-allowed",
                          }}
                        >
                          {cls.class_id !== unlockedClass && (
                            <div className="lock_icon absolute z-20 bottom-[0.6rem] grid justify-center items-center right-3">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="#000000"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" />
                              </svg>
                            </div>
                          )}
                          {cls.class_title}
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="cntr-video__class relative">
          <div className="absolute top-2 left-7 w-full h-fulL z-10">
            <Link className="select-none text-xl font-bold" to={"/"}>
              <LogoHeader />
            </Link>
          </div>
          <div className="absolute top-2 right-7 cursor-pointer">
            <Link className="select-none text-xl font-bold" to={"/"}>
              <LogoHeader />
            </Link>
          </div>
          <div
            className="absolute left-7 bottom-5 cursor-pointer"
            onClick={() => unlockBeforeClass()}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffffff">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9.586 4l-6.586 6.586a2 2 0 0 0 0 2.828l6.586 6.586a2 2 0 0 0 2.18 .434l.145 -.068a2 2 0 0 0 1.089 -1.78v-2.586h5a1 1 0 0 0 1 -1v-6l-.007 -.117a1 1 0 0 0 -.993 -.883l-5 -.001v-2.585a2 2 0 0 0 -3.414 -1.414z" />
              <path d="M4.415 12l6.585 -6.586v3.586l.007 .117a1 1 0 0 0 .993 .883l5 -.001v4l-5 .001a1 1 0 0 0 -1 1v3.586l-6.585 -6.586z" />
              <path d="M21 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z" />
            </svg>
          </div>
          <div
            className="absolute right-7 bottom-5 cursor-pointer"
            onClick={() => unlockNextClass()}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffffff">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.585l-1.999 .001a1 1 0 0 0 -1 1v6l.007 .117a1 1 0 0 0 .993 .883l1.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" />
              <path d="M3 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z" />
              <path d="M6 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z" />
            </svg>
          </div>
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

              <div className="description__class py-4 flex flex-col gap-4">
                <h2 className="subtitle__class">{selectedClass.class_title}</h2>
                <p className="text__class">{selectedClass.class_description}</p>
                <div className="profile__class">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text__class pl-1 ">Prof. Juan Pérez</span>
                  </div>
                </div>
                <div className="confirmation-section">
                  <p>Comenta como te parecio en la sección de comentarios</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="cntr-comment__class">
          <h2 className="subtitle__comment">Comentarios</h2>
          <div className="form__class">
            <textarea
              className="textarea__class"
              placeholder="Escribe tu comentario..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={loading}
            />
            <button
              className="btn__class"
              onClick={() => handleSubmit(selectedClass.id_comments, id_user)}
              disabled={loading}
            >
              {loading ? "Publicando..." : "Publicar"}
            </button>
            {error && <p className="error">{error}</p>}
          </div>
          <ul className="comment__class">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item__class">
                <h2 className="subtitle__class">
                  {comment.nombre || "Usuario Desconocido"}
                </h2>
                <p className="text__class">{comment.comentario}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
