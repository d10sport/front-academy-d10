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

  const numIndex = parseInt(selectedIndex.match(/\d+/)[0]);

  const [sectionNews, setSectionNews] = useState({
    gallery: "",
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
        setSectionNews(Object.entries(response.data[0].section_one.news));
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
        <h1 className="title__admin-section">Galería</h1>
        <button
          onClick={() => setModalIsOpenOne(true)}
          className="btn-add__news"
        >
          Add News
        </button>
        <ul className="list__admin-section">
          {sectionNews.length > 0 ? (
            sectionNews.map(([key, item], index) => (
              <li key={key} className="item__admin-section">
                <div className="cntr-img__admin-section">
                  <img
                    className="img__admin-section"
                    src={item.image}
                    alt={`Img ${index + 1}`}
                  />
                </div>
                <input
                  type="text"
                  className="text-[black] input__admin-section"
                  value={item.date}
                  readOnly
                />
                <input
                  type="text"
                  className="text-[black] input__admin-section"
                  value={item.image}
                  readOnly
                />
                <input
                  type="text"
                  className="text-[black] input__admin-section"
                  value={item.title}
                  readOnly
                />
                <textarea
                  className="textarea__admin-section sm-margin-bottom"
                  value={item.description}
                  readOnly
                ></textarea>
                <div className="cntr-btn__news">
                  <button
                    onClick={() => {
                      setSelectedIndex(key);
                      setModalIsOpenTwo(true);
                    }}
                    className="btn-update__news"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setSelectedIndex(key);
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
            <p>No hay imágenes disponibles</p>
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
        indice={numIndex}
        refreshCourses={() => getNews()}
      ></EditNews>

      <DeleteNews
        isOpen={modalIsOpenThree}
        onClose={() => setModalIsOpenThree(false)}
        indice={numIndex}
        refreshCourses={() => getNews()}
      ></DeleteNews>
    </>
  );
}
