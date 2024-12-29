// import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";
// import { Link } from "react-router-dom";
import "./log-form-3.css";

export default function Form3() {
  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como deportista
          </h2>

          <label className="label__login">Nombres del Padre o Madre</label>
          <input type="text" className="input__login" placeholder="Nombres" />
          <label className="label__login">Apellidos del Padre o Madre</label>
          <input type="text" className="input__login" placeholder="Apellidos" />
          <label className="label__login">Contacto del Padre o Madre</label>
          <input
            type="text"
            className="input__login"
            placeholder="Numero de celular"
          />

          <button className="button-three__login">Registrar</button>
          <a
            href=""
            className="link__login link--color__login center-text__login"
          >
            Regresar
          </a>
        </form>
      </section>
    </>
  );
}
