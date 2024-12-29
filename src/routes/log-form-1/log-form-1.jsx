// import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";
// import { Link } from "react-router-dom";
import "./log-form-1.css";

export default function Form1() {
  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login">Regístrate como deportista</h2>
          <p className="text__login link--color__login margin-general__login">
            Foto de perfil
          </p>
          <div className="cntr-img__login">
            <img
              src="assets/background-img.png"
              alt="img"
              className="img__login"
            />
          </div>
          <button className="button-two__login">Cambiar</button>
          <label className="label__login">Nombres</label>
          <input type="text" className="input__login" placeholder="Nombre" />
          <label className="label__login">Apellidos</label>
          <input type="text" className="input__login" placeholder="Apellido" />
          <label className="label__login">Genero</label>
          <select name="" id="" className="input__login">
            <option value="seleccionar">Seleccionar...</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="otro">Otro</option>
          </select>
          <label className="label__login">Fecha de Nacimiento:</label>
          <input
            type="date"
            className="input__login"
            placeholder="Fecha de Nacimiento"
          />

          <button className="button-three__login">Siguiente</button>
          <a
            href=""
            className="link__login link--color__login center-text__login link--active__login"
          >
            Cancelar
          </a>
        </form>
      </section>
    </>
  );
}
