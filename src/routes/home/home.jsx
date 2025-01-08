import Example from "../../assets/img/example-img.png";
import AppContext from "@context/app/app-context";
import { useEffect, useContext, useState } from "react";
import axios from 'axios';
import "./home.css";

export default function Home() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [sectionOne, setSectionOne] = useState({
    testColumn: ''
  })

  function getDateHome() {
    axios.get(`${urlApi}academy/g/courses`, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      }
    })
      .then((response) => {
        if (response.data?.length == 0 || response.data[0] == undefined) return;
        setSectionOne(response.data[0].section_one);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getDateHome();
  });

  const course = [
    {
      title: "Técnica con el balón",
      description: "Conoce como debes manejar correctamente el balón.",
      img: Example,
    },
    {
      title: "Consejos en la cancha",
      description: "Conoce como debes manejar correctamente el balón.",
      img: Example,
    },
    {
      title: "Arqueros infalibles",
      description: "Conoce como debes manejar correctamente el balón.",
      img: Example,
    },
    {
      title: "Delanteros audaces",
      description: "Conoce como debes manejar correctamente el balón.",
      img: Example,
    },
  ];

  useEffect(() => {
    context.fetchToken();
  }, [])

  return (
    <>
      {/* <Header /> */}
      <section className="section__home">
        {/* <h1 className="title__home margin--space">Bienvenido Daniel</h1> */}
        <h1 className="title__home margin--space"> {sectionOne.testColumn} </h1>
        <div className="cntr-big-img__home">
          <img src={Example} alt="" className="img__home" />
        </div>
        <h1 className="title__home title--color__home margin--space">
          Explora nuestras secciones de curso:
        </h1>
        <h2 className="subtitle__home">
          Explora nuestras secciones de cursos. Ideales para encontrar la
          formación perfecta en todo tipo de ambito deportivo
        </h2>
        <div className="cntr-course__home">
          {course.map((item, index) => (
            <div key={index} className="item__home">
              <h1 className="title__home title--color__home title-center__home margin--space"> {item.title} </h1>
              <div className="cntr-info__home">
                <div className="cntr-small-img__home">
                  <img src={item.img} alt="img" />
                </div>
                <div className="subcntr-info__home">
                  <p className="text__home"> {item.description} </p>
                  <a href="" className="link__home">
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
