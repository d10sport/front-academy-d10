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
        contact_family: inputValue,
      }));
    }
  }

  // function handleCountAssistants(event) {
  //   context.setRegisterClub((prev) => ({
  //     ...prev,
  //     assistants: parseInt(event.target.value),
  //   })
  //   )
  // }

  function handleCountInterns(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        contact_family: inputValue,
      }));
    }
  }

  // function handleCountInterns(event) {
  //   context.setRegisterClub((prev) => ({
  //     ...prev,
  //     interns: parseInt(event.target.value),
  //   }));
  // }

  function handleCountVenues(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        contact_family: inputValue,
      }));
    }
  }

  // function handleCountVenues(event) {
  //   context.setRegisterClub((prev) => ({
  //     ...prev,
  //     venues: parseInt(event.target.value),
  //   }));
  // }

  function handleCountSites(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        contact_family: inputValue,
      }));
    }
  }

  // function handleCountSites(event) {
  //   context.setRegisterClub((prev) => ({
  //     ...prev,
  //     sites: parseInt(event.target.value),
  //   }));
  // }

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
    toast.promise(saveRegisterClub(context.registerClub), {
      loading: "Cargando...",
      success: (data) => {
        if (data) {
          context.clearRegisterAthlete();
          navigate("/success-register");
          return "Solicitud de Registro realizada";
        } else {
          return "Error al registrarte";
        }
      },
      error: "Error al filtrar entrenadores",
    });
  }

  return (
    <>
      <section className="section__login">
        <h2 className="title__login">D10+ Academy</h2>
        <div className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como Club
          </h2>

          <label htmlFor="ayudantes" className="label__login">
            Cantidad Ayudantes
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

          <label htmlFor="pasantes" className="label__login">
            Cantidad Pasantes
          </label>
          <input
            type="number"
            id="pasantes"
            name="pasantes"
            autoComplete="off"
            className="input__login"
            placeholder="20"
            min={1}
            max={100}
            step={1}
            onChange={(e) => handleCountInterns(e)}
            value={
              context.registerClub.interns == 0
                ? ""
                : context.registerClub.interns
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

          <label htmlFor="sitios" className="label__login">
            Sitios
          </label>
          <input
            type="number"
            id="sitios"
            name="sitios"
            autoComplete="off"
            className="input__login"
            placeholder="4"
            min={1}
            max={100}
            step={1}
            onChange={(e) => handleCountSites(e)}
            value={
              context.registerClub.sites == 0 ? "" : context.registerClub.sites
            }
          />

          <button onClick={() => nextStep()} className="button-three__login">
            Registrar
          </button>
          <button
            className="link__login link--color__login center-text__login"
            onClick={() => navigate("/register/club/step-three")}
          >
            Regresar
          </button>
        </div>
      </section>
    </>
  );
}
