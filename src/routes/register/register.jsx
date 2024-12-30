// import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";
// import { Link } from "react-router-dom";
// import "./register.css";
import "../../css/loginStyles.css";

export default function Register() {
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
              <button className="cntr-img__login">
                <img
                  src="assets/background-img.png"
                  alt="Img"
                  className="img__login"
                />
              </button>
            </div>
            <div className="choosen__login">
              <p className="text__login margin-general__login">Entrenador</p>
              <button className="cntr-img__login">
                <img
                  src="assets/background-img.png"
                  alt="Img"
                  className="img__login"
                />
              </button>
            </div>
            <div className="choosen__login">
              <p className="text__login margin-general__login">Club</p>
              <button className="cntr-img__login">
                <img
                  src="assets/background-img.png"
                  alt="Img"
                  className="img__login"
                />
              </button>
            </div>
          </div>

          <p className="text__login margin-general__login">
            ¿Ya tienes una cuenta?
          </p>
          <a
            href=""
            className="link__login link--color__login center-text__login"
          >
            Iniciar Sesión
          </a>
        </form>
      </section>
    </>
  );
}
