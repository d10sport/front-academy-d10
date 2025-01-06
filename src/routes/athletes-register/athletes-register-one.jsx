import { useState } from "react";

export default function AthleteRegisterOne() {
  const [genero, setGenero] = useState("");

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
          <label htmlFor="nombre" className="label__login">
            Nombres
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="input__login"
            placeholder="Nombre"
          />
          <label htmlFor="apellido" className="label__login">
            Apellidos
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            className="input__login"
            placeholder="Apellido"
          />
          <label htmlFor="genero" className="label__login">
            Genero
          </label>
          <select
            name="genero"
            id="genero"
            className="input__login"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="otro">Otro</option>
          </select>
          <label htmlFor="fecha-nacimiento" className="label__login">
            Fecha de Nacimiento:
          </label>
          <input
            type="date"
            id="fecha-nacimiento"
            name="fechaNacimiento"
            className="input__login"
            min="1900-01-01"
            max="2099-12-31"
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
