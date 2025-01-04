// import Header from "../../layouts/header/header.jsx";
// import { Link } from "react-router-dom";
import Example from "../../assets/img/example-img.png";
import "./home.css";

export default function Home() {
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

  // if (!localStorage.getItem("token")) {
  //   if (window.location.hostname === "localhost") {
  //     window.location.href = "http://localhost:5173/#/login";
  //     window.location.reload();
  //     return;
  //   }
  //   window.location.href = "https://academia.d10mas.com/#/login";
  //   window.location.reload();
  // }

  // Verifica si la URL ya contiene el hash para evitar bucles infinitos
  if (
    window.location.hostname === "localhost" &&
    window.location.hash !== "#/"
  ) {
    window.location.href = "http://localhost:5173/#/";
    return null; // Retorna null para evitar renderizar el componente
  }

  return (
    <>
      {/* <Header /> */}
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

        {/* <Link to="/forgot" className="btn__home">
          Forgot
        </Link>

        <Link to="/club-form/step-1" className="btn__home">
          Club #1
        </Link>
        <Link to="/club-form/step-2" className="btn__home">
          Club #2
        </Link>
        <Link to="/club-form/step-3" className="btn__home">
          Club #3
        </Link>
        <Link to="/club-form/step-4" className="btn__home">
          Club #4
        </Link>

        <Link to="/coach-form/step-1" className="btn__home">
          Coach #1
        </Link>
        <Link to="/coach-form/step-2" className="btn__home">
          Coach #2
        </Link>

        <Link to="/athlete-form/step-1" className="btn__home">
          Athlete #1
        </Link>
        <Link to="/athlete-form/step-1" className="btn__home">
          Athlete #2
        </Link>
        <Link to="/athlete-form/step-1" className="btn__home">
          Athlete #3
        </Link>

        <Link to="/login" className="btn__home">
          Login
        </Link>
        <Link to="/register" className="btn__home">
          Register
        </Link>
        <Link to="/success" className="btn__home">
          Success
        </Link> */}
      </section>
    </>
  );
}
