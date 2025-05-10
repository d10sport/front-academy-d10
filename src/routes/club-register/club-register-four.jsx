import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "sonner";
import axios from "axios";
import "./club-register.css";

export default function ClubRegisterFour() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate();

  function handleCountAssistants(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        assistants: inputValue,
      }));
    }
  }

  function handleCountVenues(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        venues: inputValue,
      }));
    }
  }

  async function saveRegisterClub(data) {
    let res = false;
    await axios
      .post(`${urlApi}academy/register/club`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          toast.error(`${response.data.message}`);
          return;
        }
        res = true;
      })
      .catch(() => {
        res = false;
      });
    return res;
  }

  async function nextStep() {
    const validRegister = await context.validateEmptyClub();
    if (!validRegister) {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    const button = document.querySelector(".button-three__login");
    button.disabled = true;
    button.classList.add("opacity-50", "cursor-not-allowed");
    toast.promise(saveRegisterClub(context.registerClub), {
      loading: "Cargando...",
      success: (data) => {
        if (data) {
          context.clearRegisterAthlete();
          navigate("/success-register");
          return "Solicitud de Registro realizada";
        } else {
          throw Error("Error al registrarte");
        }
      },
      error: (msg) => {
        console.error(msg);
        button.disabled = false;
        button.classList.remove("opacity-50", "cursor-not-allowed");
        return "Error al registrarte";
      },
    });
  }

  return (
    <>
      <section className="section__login">
        <div className="form__login">
          <h2 className="title__login">D10+ Academy</h2>
          <h2 className="subtitle__login">
            Regístrate como <span className="text-decoration__login">Club</span>
          </h2>

          <label htmlFor="ayudantes" className="label__login">
            Entrenadores de Apoyo
          </label>
          <input
            type="number"
            id="ayudantes"
            name="ayudantes"
            autoComplete="off"
            className="input__login"
            placeholder="10"
            min={1}
            max={100}
            step={1}
            onChange={(e) => handleCountAssistants(e)}
            value={
              context.registerClub.assistants == 0
                ? ""
                : context.registerClub.assistants
            }
          />

          <label htmlFor="sedes" className="label__login">
            Sedes
          </label>
          <input
            type="number"
            id="sedes"
            name="sedes"
            autoComplete="off"
            className="input__login"
            placeholder="6"
            min={1}
            max={100}
            step={1}
            onChange={(e) => handleCountVenues(e)}
            value={
              context.registerClub.venues == 0
                ? ""
                : context.registerClub.venues
            }
          />

          <button onClick={() => nextStep()} className="button-three__login">
            Registrar
          </button>
          <button
            className="link__login center-text__login"
            onClick={() => navigate("/register/club/step-three")}
          >
            Regresar
          </button>
        </div>
      </section>
    </>
  );
}
