import AddClass from "../../components/admin-class/add-class/add-class.jsx";
import EditClass from "../../components/admin-class/edit-class/edit-class.jsx";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
// import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./menu-class.css";

export default function MenuClass() {
  const [modalIsOpenOne, setModalIsOpenOne] = useState(false);
  const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);

    const { idCourse } = useParams();
    const context = useContext(AppContext);
    const urlApi = context.urlApi;
    const apiKey = context.apiKey;
  
    const [classes, setClasses] = useState([]);

  // const courses = [
  //   {
  //     title: "Introduction",
  //     description: "Getting started with the course",
  //   },
  //   {
  //     title: "Core Concepts",
  //     description: "Understanding the fundamentals",
  //   },
  // ];

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
      }
    } catch (error) {
      console.error("Error al obtener el menú de clases:", error);
    }
  }

  useEffect(() => {
    getClassMenu();
  }, []);

  return (
    <>
      <section className="menu-class">
        <div className="home__menu-class">
          <Link to={"/menu-course"} className="btn-back__menu-class">
            {"<"}
          </Link>
          <h1 className="title__menu-class">Manage Classes</h1>
          <button
            onClick={() => setModalIsOpenOne(true)}
            className="btn-new__menu-class"
          >
            Add Class
          </button>
        </div>

        <ul className="list__menu-class">
          {classes.map((cls, index) => (
            <li key={index} className="item__menu-class">
              <div className="cntr-info__menu-class">
                <h2 className="subtitle__menu-class">{cls.class_title}</h2>
                <p className="text__menu-class">{cls.class_description}</p>
              </div>
              <div className="cntr-btn__menu-class">
                <button
                  onClick={() => setModalIsOpenTwo(true)}
                  className="btn-edit__menu-class"
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <AddClass
        isOpen={modalIsOpenOne}
        onClose={() => setModalIsOpenOne(false)}
      ></AddClass>

      <EditClass
        isOpen={modalIsOpenTwo}
        onClose={() => setModalIsOpenTwo(false)}
      ></EditClass>
    </>
  );
}
