import imageAthlete from "@assets/img/deportista.png";
import imageCoach from "@assets/img/entrenador.png";
import imageClub from "@assets/img/club.png";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "@context/app/app-context";
import { useContext } from "react";
import "./login-user.css";

export default function LoginUser() {
  const { setTypeUser } = useContext(AppContext);
  const navigate = useNavigate();

  function selectTypeUser(event) {
    setTypeUser(event.currentTarget.id);
    navigate("/login");
  }

  return (
    <>
      <section className="section__register">
        <div className="cntr-link__register">
          <button
            id="athlete"
            onClick={(event) => selectTypeUser(event)}
            className="link__register"
          >
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Deportista</h1>
            </div>
            <img
              src={imageAthlete}
              alt="Img Deportista"
              className="img__register"
            />
          </button>

          <button
            id="coach"
            onClick={(event) => selectTypeUser(event)}
            className="link__register"
          >
            <img
              src={imageCoach}
              alt="Img Entrenador"
              className="img__register"
            />
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Entrenador</h1>
            </div>
          </button>

          <button
            id="club"
            onClick={(event) => selectTypeUser(event)}
            className="link__register"
          >
            <img src={imageClub} alt="Img Club" className="img__register" />
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Club</h1>
            </div>
          </button>
        </div>
        <div className="cntr-menu__register">
          <div className="cntr-title__register">
            <h1 className="title__register">Iniciar Sesión</h1>
          </div>
          <div className="cntr-text__register">
            <p className="text__register">¿No tienes una cuenta?</p>
            <Link to="/register" className="text__register text--color">
              Regístrate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
