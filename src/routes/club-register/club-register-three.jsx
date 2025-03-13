import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { toast } from "sonner";
import "./club-register.css";

export default function ClubRegisterThree() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  function handleCountCoaches(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        number_coaches: inputValue,
      }));
    }
  }

  function handleCountAthletes(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        number_athletes: inputValue,
      }));
    }
  }

  function handleWebSite(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      website: event.target.value,
    }));
  }

  function handleCategories(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      categories: event.target.value,
    }));
  }

  function handle_U13_U15_U17_U20_(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      u13_u15_u17_u20: event.target.value,
    }));
  }

  function handleLocalLeague(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      local_league: event.target.value == "si" ? 1 : 0,
    }));
  }

  function handleNationalLeague(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      national_tournament: event.target.value == "si" ? 1 : 0,
    }));
  }

  async function nextStep() {
    if (
      context.registerClub.number_coaches == 0 ||
      context.registerClub.number_athletes == 0 ||
      !context.registerClub.categories ||
      context.registerClub.local_league === "" ||
      context.registerClub.national_tournament === ""
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    navigate("/register/club/step-four");
  }

  useEffect(() => {
    const event = {
      target : {
        value : "no"
      }
    }
    handleNationalLeague(event)
    handleLocalLeague(event)
  }, []);

  return (
    <>
      <section className="section__login">
        <div className="form__login">
          <h1 className="title__login">D10+ Academy</h1>
          <h2 className="subtitle__login margin-general__login">
            Regístrate como <span className="text-decoration__login">Club</span>
          </h2>

          <label htmlFor="number_coaches" className="label__login">
            Cantidad de Entrenadores
          </label>
          <input
            type="number"
            id="number_coaches"
            name="number_coaches"
            className="input__login"
            autoComplete="off"
            placeholder="255"
            min={1}
            max={100}
            step={1}
            onChange={(e) => handleCountCoaches(e)}
            value={
              context.registerClub.number_coaches == 0
                ? ""
                : context.registerClub.number_coaches
            }
          />

          <label htmlFor="number_athletes" className="label__login">
            Cantidad de Deportistas
          </label>
          <input
            type="number"
            id="number_athletes"
            name="number_athletes"
            autoComplete="off"
            className="input__login"
            placeholder="700"
            min={1}
            max={100}
            step={1}
            onChange={(e) => handleCountAthletes(e)}
            value={
              context.registerClub.number_athletes == 0
                ? ""
                : context.registerClub.number_athletes
            }
          />

          <label htmlFor="website" className="label__login">
            Website
          </label>
          <input
            type="text"
            id="website"
            name="website"
            autoComplete="off"
            className="input__login"
            placeholder="www.miclub.com"
            value={context.registerClub.website}
            onChange={(e) => handleWebSite(e)}
          />

          <label htmlFor="u13_u15_u17_u20" className="label__login">
            U13_ U15_ U17_ U20_
          </label>
          <input
            type="text"
            id="u13_u15_u17_u20"
            name="u13_u15_u17_u20"
            autoComplete="off"
            className="input__login"
            placeholder="U13"
            value={context.registerClub.u13_u15_u17_u20}
            onChange={(e) => handle_U13_U15_U17_U20_(e)}
          />

          <label id="categoria" className="label__login">
            Categorías
          </label>
          <select
            name="categoria"
            id="categoria"
            className="input__login"
            value={context.registerClub.categories}
            onChange={(e) => handleCategories(e)}
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
                  name="local_league"
                  className="radio-input__login"
                  value="si"
                  onChange={(e) => handleLocalLeague(e)}
                  checked={context.registerClub.local_league == 1}
                />
              </label>
              <label className="label__login">
                No
                <input
                  type="radio"
                  name="local_league"
                  className="radio-input__login"
                  value="no"
                  onChange={(e) => handleLocalLeague(e)}
                  checked={context.registerClub.local_league == 0}
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
                  name=" national_tournament"
                  className="radio-input__login"
                  value="si"
                  onChange={(e) => handleNationalLeague(e)}
                  checked={context.registerClub.national_tournament == 1}
                />
              </label>
              <label className="label__login">
                No
                <input
                  type="radio"
                  name=" national_tournament"
                  className="radio-input__login"
                  value="no"
                  onChange={(e) => handleNationalLeague(e)}
                  checked={context.registerClub.national_tournament == 0}
                />
              </label>
            </div>
          </div>

          <button onClick={() => nextStep()} className="button-three__login">
            Siguiente
          </button>
          <button
            className="link__login center-text__login"
            onClick={() => navigate("/register/club/step-two")}
          >
            Regresar
          </button>
        </div>
      </section>
    </>
  );
}
