
export default function ClubRegisterOne() {
  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login">Regístrate como club</h2>
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
          <label htmlFor="nombre-club" className="label__login">
            Nombre club
          </label>
          <input
            type="text"
            id="nombre-club"
            name="nombreClub"
            className="input__login"
            placeholder="Nombre del club"
          />
          <label htmlFor="fecha-fundador" className="label__login">
            Fecha de fundador
          </label>
          <input
            type="date"
            id="fecha-fundador"
            name="fechaFundador"
            className="input__login"
          />
          <label htmlFor="comet" className="label__login">
            Comet
          </label>
          <input
            type="text"
            id="comet"
            name="comet"
            className="input__login"
            placeholder="Comet"
          />
          <label htmlFor="presidente" className="label__login">
            Presidente
          </label>
          <input
            type="text"
            id="presidente"
            name="presidente"
            className="input__login"
            placeholder="Nombre del presidente del club"
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
