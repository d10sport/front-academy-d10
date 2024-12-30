// import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";
// import { Link } from "react-router-dom";
// import "./login.css";
import "../../css/loginStyles.css";

export default function Login() {
  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login">Iniciar Sesión</h2>
          <label htmlFor="email" className="label__login">
            Correo
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input__login"
            placeholder="username@gmail.com"
          />
          <label htmlFor="password" className="label__login">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input__login"
            placeholder="Password"
          />
          <a href="" className="link__login margin-top__login">
            Forgot Password?
          </a>
          <button className="button__login">Iniciar Sesión</button>

          <p className="text__login">
            ¿No tienes una cuenta?
            <a href="" className="link__login link--color__login">
              Regístrate ahora
            </a>
          </p>
        </form>
      </section>
    </>
  );
}
