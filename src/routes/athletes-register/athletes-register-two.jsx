
export default function Athlete2() {
  return (
    <>
      <section className="section__login">
        <h2 className="title__login">D10+ Academy</h2>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como deportista
          </h2>

          <label htmlFor="pais" className="label__login">
            País
          </label>
          <input
            type="text"
            id="pais"
            name="pais"
            className="input__login"
            placeholder="País"
          />
          <label htmlFor="ciudad" className="label__login">
            Ciudad
          </label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            className="input__login"
            placeholder="Ciudad"
          />
          <label htmlFor="club" className="label__login">
            Club
          </label>
          <input
            type="text"
            id="club"
            name="club"
            className="input__login"
            placeholder="Club Actual"
          />
          <label htmlFor="entrenador" className="label__login">
            Entrenador
          </label>
          <input
            type="text"
            id="entrenador"
            name="entrenador"
            className="input__login"
            placeholder="Entrenador"
          />
          <label htmlFor="email" className="label__login">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input__login"
            placeholder="Nombre"
          />
          <label htmlFor="numero-celular" className="label__login">
            Numero celular
          </label>
          <input
            type="tel"
            id="numero-celular"
            name="numeroCelular"
            className="input__login"
            placeholder="Numero celular"
          />
          <label htmlFor="grado-academico" className="label__login">
            Grado Académico
          </label>
          <input
            type="text"
            id="grado-academico"
            name="gradoAcademico"
            className="input__login"
            placeholder="Grado Académico"
          />
          <label htmlFor="usuario-instagram" className="label__login">
            Usuario Instagram
          </label>
          <input
            type="text"
            id="usuario-instagram"
            name="usuarioInstagram"
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
