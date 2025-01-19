import imageAthlete from "@assets/img/deportista.png"
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from 'sonner';
import './athlete-register.css'

export default function AthleteRegisterOne() {
  const context = useContext(AppContext);
  const navigate = useNavigate()

  function handleName(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      first_names: event.target.value,
    })
    )
  }

  function handleLastName(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      last_names: event.target.value,
    })
    )
  }

  function handleGender(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      gender: event.target.value,
    })
    )
  }

  function handleDateBirth(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      date_birth: event.target.value,
    })
    )
  }

  function nextStep() {
    if (!context.registerAthlete.first_names || !context.registerAthlete.last_names || !context.registerAthlete.gender || !context.registerAthlete.date_birth) {
      toast.error('Por favor, complete todos los campos');
      return
    }
    navigate('/register/athlete/step-two')
  }

  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <div className="form__login">
          <h2 className="subtitle__login">Regístrate como deportista</h2>
          <p className="text__login link--color__login margin-general__login">
            {context.registerClub.first_names != '' ? context.registerClub.first_names : 'Nombre'}
          </p>
          <div className="cntr-img__login">
            <img
              src={imageAthlete}
              alt="img"
              className="img__login"
            />
          </div>

          <label htmlFor="name" className="label__login cursor-pointer">
            Nombres
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="input__login"
            placeholder="Nombre"
            value={context.registerAthlete.first_names}
            onChange={(e) => handleName(e)}
          />

          <label htmlFor="lastname" className="label__login cursor-pointer">
            Apellidos
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            autoComplete="off"
            className="input__login"
            placeholder="Apellido"
            value={context.registerAthlete.last_names}
            onChange={(e) => handleLastName(e)}
          />

          <label htmlFor="gender" className="label__login cursor-pointer">
            Genero
          </label>
          <select
            id="gender"
            name="gender"
            className="input__login cursor-pointer"
            defaultValue={context.registerAthlete.gender}
            onChange={(e) => handleGender(e)}
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            <option value="M">Hombre</option>
            <option value="F">Mujer</option>
          </select>

          <label htmlFor="date_birth" className="label__login cursor-pointer">
            Fecha de Nacimiento:
          </label>
          <input
            type="date"
            id="date_birth"
            name="date_birth"
            autoComplete="off"
            className="input__login"
            min="1900-01-01"
            max="2099-12-31"
            value={context.registerAthlete.date_birth}
            onChange={handleDateBirth}
          />

          <button onClick={() => nextStep()} className="button-three__login">Siguiente</button>
          <button
            className="cursor-pointer link__login link--color__login center-text__login link--active__login"
            onClick={() => navigate('/register')}
          >
            Cancelar
          </button>
        </div>
      </section>
    </>
  );
}
