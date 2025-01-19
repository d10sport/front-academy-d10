import imageCoach from "@assets/img/entrenador.png"
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from 'sonner';
import './coach-register.css'

export default function CoachOne() {
  const context = useContext(AppContext);
  const navigate = useNavigate()

  function handleName(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      first_names: event.target.value,
    })
    )
  }

  function handleLastName(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      last_names: event.target.value,
    })
    )
  }

  function handleGender(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      gender: event.target.value,
    })
    )
  }

  function handleDateBirth(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      date_birth: event.target.value,
    })
    )
  }

  function nextStep() {
    if (!context.registerCoach.first_names || !context.registerCoach.last_names || !context.registerCoach.gender || !context.registerCoach.date_birth) {
      toast.error('Por favor, complete todos los campos');
      return
    }
    navigate('/register/coach/step-two')
  }

  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <div className="form__login">
          <h2 className="subtitle__login">Regístrate como entrenador</h2>
          <p className="text__login link--color__login margin-general__login">
            {context.registerCoach.first_names}
          </p>
          <div className="cntr-img__login">
            <img
              src={imageCoach}
              alt="img"
              className="img__login"
            />
          </div>

          <label htmlFor="nombre" className="label__login">
            Nombres
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="input__login"
            placeholder="Nombre"
            defaultValue={context.registerCoach.first_names}
            onChange={(e) => handleName(e)}
          />

          <label htmlFor="apellido" className="label__login">
            Apellidos
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            autoComplete="off"
            className="input__login"
            placeholder="Apellido"
            defaultValue={context.registerCoach.last_names}
            onChange={(e) => handleLastName(e)}
          />

          <label htmlFor="genero" className="label__login">
            Genero
          </label>
          <select
            id="gender"
            name="gender"
            className="input__login cursor-pointer"
            defaultValue={context.registerCoach.gender}
            onChange={(e) => handleGender(e)}
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            <option value="M">Hombre</option>
            <option value="F">Mujer</option>
          </select>

          <label htmlFor="fecha-nacimiento" className="label__login">
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
            value={context.registerCoach.date_birth}
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
