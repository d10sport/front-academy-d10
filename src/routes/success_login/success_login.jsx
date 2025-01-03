// import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";
// import { Link } from "react-router-dom";
// import "./log-success.css";
import "../../css/loginStyles.css";

export default function NewSuccess() {
  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Registro exitoso
          </h2>

          <p className="text__login link--color__login margin-general__login">
            Sera notificado cuando se apruebe el ingreso
          </p>
          <div className="cntr-img__login">
            <img
              src="assets/background-img.png"
              alt="img"
              className="img__login"
            />
          </div>
        </form>
      </section>
    </>
  );
}
