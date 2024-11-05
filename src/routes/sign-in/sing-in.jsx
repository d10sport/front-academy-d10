import HeaderPage from '../../layouts/header-pages/header_page.jsx';
import './sing-in.css';

export default function SingIn() {
  return (
    <>
      <HeaderPage />
      <nav className="panel"></nav>
      <main className="login">
        <h1 className="title__login">Iniciar Sesión</h1>
        <div className="container__login">
          <form action="" className="form__login">
            <label className="label__login">Correo</label>
            <input
              type="text"
              placeholder="Username@gmail.com"
              className="input__login"
            />
            <label className="label__login">Contraseña</label>
            <input type="text" placeholder="Password" className="input__login" />
            <a href="" className="link__login">Forgot Password?</a>
            <input type="button" value="Iniciar Sesión" className="btn__login" />
          </form>
          <p className="text__login">
            ¿No tienes una cuenta? <a href="#" className="link-2__login">Regístrate ahora</a>
          </p>
        </div>
      </main>
    </>
  )
}