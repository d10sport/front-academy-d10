import { useState } from "react";

export default function Club3() {
  const [categoria, setCategoria] = useState("");

  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como Club
          </h2>

          <label htmlFor="cantidad-entrenadores" className="label__login">
            Cantidad de Entrenadores
          </label>
          <input
            type="number"
            id="cantidad-entrenadores"
            name="cantidadEntrenadores"
            className="input__login"
            placeholder="Cantidad de Entrenadores"
          />
          <label htmlFor="cantidad-deportistas" className="label__login">
            Cantidad de Deportistas
          </label>
          <input
            type="number"
            id="cantidad-deportistas"
            name="cantidadDeportistas"
            className="input__login"
            placeholder="Cantidad de Deportistas"
          />
          <label id="categoria" className="label__login">
            Categorías
          </label>
          <select
            name="categoria"
            id="categoria"
            className="input__login"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            <option value="u13">U13</option>
            <option value="u15">U15</option>
            <option value="u17">U17</option>
            <option value="u20">U20</option>
          </select>
          <div className="cntr-label__login">
            <p className="label__login">Liga Local</p>
            <div className="subcntr-label__login">
              <label className="label__login">
                Sí
                <input
                  type="radio"
                  name="liga-local"
                  className="radio-input__login"
                  value="si"
                />
              </label>
              <label className="label__login">
                No
                <input
                  type="radio"
                  name="liga-local"
                  className="radio-input__login"
                  value="no"
                />
              </label>
            </div>
          </div>
          <div className="cntr-label__login">
            <p className="label__login">Torneo Nacional</p>
            <div className="subcntr-label__login">
              <label className="label__login">
                Sí
                <input
                  type="radio"
                  name="torneo-nacional"
                  className="radio-input__login"
                  value="si"
                />
              </label>
              <label className="label__login">
                No
                <input
                  type="radio"
                  name="torneo-nacional"
                  className="radio-input__login"
                  value="no"
                />
              </label>
            </div>
          </div>

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
