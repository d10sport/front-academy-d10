import imageAthlete from "@assets/img/deportista.png"
import { Link, useNavigate } from "react-router-dom";
import imageCoach from "@assets/img/entrenador.png"
import AppContext from "@context/app/app-context";
import imageClub from "@assets/img/club.png"
import { useContext } from "react";

export default function LoginUser() {
  const { setTypeUser } = useContext(AppContext);
  const navigate = useNavigate();

  function selectTypeUser(event) {
    setTypeUser(event.currentTarget.id);
    navigate("/login");
  }

  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <div className="form__login">
          <h2 className="subtitle__login">Inicia sessión</h2>
          <p className="text__login link--color__login margin-general__login">
            Selecciona el perfil adecuado
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
              <button id="club" onClick={(event) => selectTypeUser(event)}  className="cntr-img__login">
                <img
                  src={imageClub}
                  alt="Img"
                  className="img__login"
                />
              </button>
            </div>
          </div>

          {/* <p className="text__login margin-general__login">
            ¿No tienes una cuenta?
          </p>
          <Link
            to="/login"
            className="link__login link--color__login center-text__login"
          >
            Registrate
          </Link> */}
        </div>
      </section>
    </>
  );
}
