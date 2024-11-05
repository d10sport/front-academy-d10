export default function SignUp() {
  return (
    <>
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
            <label className="label__login">Confirmar contraseña</label>
            <input
            type="text"
            placeholder="Confirm Password"
            className="input__login"
          />
            <input type="button" value="Registrarse" className="btn__login" />
          </form>
          <p className="text__login">
          ¿Ya tienes una cuenta? <a href="#" className="link__login">Iniciar sesión</a>
          </p>
        </div>
      </main>
    </>
  )
}