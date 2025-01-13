import { Link, useNavigate } from "react-router-dom";
import imageAthlete from "@assets/img/deportista.png"
import imageCoach from "@assets/img/entrenador.png"
import AppContext from "@context/app/app-context";
import imageClub from "@assets/img/club.png"
import { useContext } from "react";

export default function Register() {
  const { setTypeUser } = useContext(AppContext);
  const navigate = useNavigate();

  function selectTypeUser(event) {
    setTypeUser(event.currentTarget.id);
    if (event.currentTarget.id === "athlete") return navigate("/register/athlete/step-one");
    if (event.currentTarget.id === "coach") return navigate("/register/coach/step-one");
    if (event.currentTarget.id === "club") return navigate("/register/club/step-one");
  }

  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login">Regístrate</h2>
          <p className="text__login link--color__login margin-general__login">
            Selecciona el perfil adecuado para ti
          </p>

          <div className="cntr-choosen__login">
            <div className="choosen__login">
              <p className="text__login margin-general__login">Deportista</p>
              <button id="athlete" onClick={(event) => selectTypeUser(event)} className="cntr-img__login">
                <img
                  src={imageAthlete}
                  alt="Img"
                  className="img__login"
                />
              </button>
            </div>
            <div className="choosen__login">
              <p className="text__login margin-general__login">Entrenador</p>
              <button id="coach" onClick={(event) => selectTypeUser(event)} className="cntr-img__login">
                <img
                  src={imageCoach}
                  alt="Img"
                  className="img__login"
                />
              </button>
            </div>
            <div className="choosen__login">
              <p className="text__login margin-general__login">Club</p>
              <button id="club" onClick={(event) => selectTypeUser(event)} className="cntr-img__login">
                <img
                  src={imageClub}
                  alt="Img"
                  className="img__login"
                />
              </button>
            </div>
          </div>

          <p className="text__login margin-general__login">
            ¿Ya tienes una cuenta?
          </p>
          <Link
            to="/login-user"
            className="link__login link--color__login center-text__login"
          >
            Iniciar Sesión
          </Link>
        </form>
      </section>
    </>
  );
}
