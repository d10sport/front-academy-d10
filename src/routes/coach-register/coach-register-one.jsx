import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "sonner";
import "./coach-register.css";

export default function CoachOne() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  function handleName(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      first_names: event.target.value,
    }));
  }

  function handleLastName(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      last_names: event.target.value,
    }));
  }

  function handleGender(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      gender: event.target.value,
    }));
  }

  function handleDateBirth(event) {
    context.setRegisterCoach((prev) => ({
      ...prev,
      date_birth: event.target.value,
    }));
  }

  function nextStep() {
    //Añadir rol de usuario seleccionado
    context.setRegisterCoach((prev) => ({
      ...prev,
      role: context.typeUser,
    }));
    if (
      !context.registerCoach.first_names ||
      !context.registerCoach.last_names ||
      !context.registerCoach.gender ||
      !context.registerCoach.date_birth
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    navigate("/register/coach/step-two");
  }

  return (
    <div className="container__login fixed top-0 left-0 right-0 bottom-0 bg-color__login">
      <section className="section__login">
        <div className="form__login">
          <h1 className="title__login">D10+ Academy</h1>
          <h2 className="subtitle__login">
            Regístrate como{" "}
            <span className="text-decoration__login">
              {context.typeUser.name_role}
            </span>
          </h2>
          <div className="cntr-img__login">
            <img
              src={
                new URL(
                  `../../assets/img/${context.typeUser.description_role}.png`,
                  import.meta.url
                ).href
              }
              alt="img"
              className="img__login"
            />
          </div>

          <label htmlFor="nombre" className="label__login">
            Nombre <span className="bg-transparent text-red-600 font-bold">* </span>
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
            Apellido <span className="bg-transparent text-red-600 font-bold">* </span>
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
            Genero <span className="bg-transparent text-red-600 font-bold">* </span>
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
            Fecha de Nacimiento: <span className="bg-transparent text-red-600 font-bold">* </span>
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

          <button onClick={() => nextStep()} className="button-three__login">
            Siguiente
          </button>
          <button
            className="cursor-pointer link__login center-text__login"
            onClick={() => navigate("/login-user")}
          >
            Cancelar
          </button>
        </div>
      </section>
    </div>
  );
}
