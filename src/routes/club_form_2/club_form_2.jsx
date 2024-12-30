// import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";
// import { Link } from "react-router-dom";
// import "./log-form-1.css";
import "../../css/loginStyles.css";

export default function Club2() {
  return (
    <>
      <section className="section__login">
        <h2 className="title__login">D10+ Academy</h2>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como Club
          </h2>

          <label className="label__login">País</label>
          <input type="text" className="input__login" placeholder="País" />
          <label className="label__login">Ciudad</label>
          <input type="text" className="input__login" placeholder="Ciudad" />
          <label className="label__login">Contacto</label>
          <input type="text" className="input__login" placeholder="Contacto" />
          <label className="label__login">Email</label>
          <input type="email" className="input__login" placeholder="Email" />
          <label className="label__login">Usuario Instagram</label>
          <input
            type="text"
            className="input__login"
            placeholder="Usuario_Instagram"
          />

          <button className="button-three__login">Siguiente</button>
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
