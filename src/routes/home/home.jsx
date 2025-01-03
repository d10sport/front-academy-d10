// import Header from "../../layouts/header/header.jsx";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
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
        <Link to="/forgot" className="btn__home">
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
        </Link>
      </section>
    </>
  );
}
