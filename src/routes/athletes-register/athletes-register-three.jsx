export default function Athlete3() {
  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como deportista
          </h2>

          <label htmlFor="nombre-familia" className="label__login">
            Nombres del Padre o Madre
          </label>
          <input
            type="text"
            id="nombre-familia"
            name="nombreFamilia"
            className="input__login"
            placeholder="Nombres"
          />
          <label htmlFor="apellido-familia" className="label__login">
            Apellidos del Padre o Madre
          </label>
          <input
            type="text"
            id="apellido-familia"
            name="apellidoFamilia"
            className="input__login"
            placeholder="Apellidos"
          />
          <label htmlFor="contacto-familia" className="label__login">
            Contacto del Padre o Madre
          </label>
          <input
            type="tel"
            id="contacto-familia"
            name="contactoFamilia"
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
