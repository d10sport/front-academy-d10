import { useContext, useState, useEffect } from "react";
import AddNews from "./add-news/add-news.jsx";
import EditNews from "./edit-news/edit-news.jsx";
import DeleteNews from "./delete-news/delete-news.jsx";
import AppContext from "@context/app/app-context";
import axios from "axios";
import "./admin-news.css";

export default function NewsAdmin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [modalIsOpenOne, setModalIsOpenOne] = useState(false);
  const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);
  const [modalIsOpenThree, setModalIsOpenThree] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);
  const [contentNews, setContentNews] = useState(false);
  const [contentNewsTwo, setContentNewsTwo] = useState(false);

  const [sectionNews, setSectionNews] = useState({
    id: "",
    title: "",
    description: "",
    image: "",
    date: "",
    category_id: "",
  });

  function getNews() {
    axios
      .get(`${urlApi}landing/g/news`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        setSectionNews(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getNews();
    }
  }, [context.token]);

  return (
    <>
      <section className="admin-section">
        <h1 className="title__admin-section">Noticias</h1>
        <button
          onClick={() => setModalIsOpenOne(true)}
          className="btn-add__news"
        >
          Agregar Noticias
        </button>
        <ul className="list__admin-section">
          {sectionNews.length > 0 ? (
            sectionNews.map((item, index) => (
              <li key={index} className="item__admin-section">
                <label htmlFor="" className="label__admin-section">
                  ID #{item.id}
                </label>
                <label htmlFor="" className="label__admin-section">
                  Pre-visualización de imagen:
                </label>
                <div className="cntr-img__admin-section sm-margin-bottom">
                  <img
                    className="img__admin-section"
                    src={item.image}
                    alt={`Img ${index + 1}`}
                  />
                </div>
                <label htmlFor="" className="label__admin-section">
                  Fecha:
                </label>
                <input
                  type="text"
                  className="text-[black] input__admin-section sm-margin-bottom"
                  value={item.date}
                  disabled
                />
                <label htmlFor="" className="label__admin-section">
                  Titulo:
                </label>
                <input
                  type="text"
                  className="text-[black] input__admin-section sm-margin-bottom"
                  value={item.title}
                  disabled
                />
                <label htmlFor="" className="label__admin-section">
                  Descripción
                </label>
                <textarea
                  className="textarea__admin-section sm-margin-bottom"
                  value={item.description}
                  disabled
                ></textarea>
                <div className="cntr-btn__news">
                  <button
                    onClick={() => {
                      setContentNewsTwo(item);
                      setModalIsOpenTwo(true);
                    }}
                    className="btn-update__news"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIndex(item.id);
                      setContentNews(item.image);
                      setModalIsOpenThree(true);
                    }}
                    className="btn-delete__news"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay noticias disponibles</p>
          )}
        </ul>
      </section>

      <AddNews
        isOpen={modalIsOpenOne}
        onClose={() => setModalIsOpenOne(false)}
        refreshCourses={() => getNews()}
      ></AddNews>

      <EditNews
        isOpen={modalIsOpenTwo}
        onClose={() => setModalIsOpenTwo(false)}
        newsContent={contentNewsTwo}
        refreshCourses={() => getNews()}
      ></EditNews>

      <DeleteNews
        isOpen={modalIsOpenThree}
        onClose={() => setModalIsOpenThree(false)}
        indice={selectedIndex}
        newsContent={contentNews}
        refreshCourses={() => getNews()}
      ></DeleteNews>
    </>
  );
}
