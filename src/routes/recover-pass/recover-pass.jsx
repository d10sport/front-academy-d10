import { useState, useContext } from "react";
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import "./recover-pass.css";

export default function RecoverPass() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate();
  const [recoverPass, setRecoverPass] = useState({
    email: "",
    confirmEmail: "",
  });

  async function fetchSendRecoverPassword(data) {
    let res = false;
    await axios
      .post(`${urlApi}academy/config/user/p/recover`, JSON.stringify(data), {
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

  function validSameEmail(event) {
    const email = event.target.value.trim();
    const confirmEmail = recoverPass.confirmEmail.trim();
    if (!email || !confirmEmail) {
      toast.error("Por favor, completa todos los campos.");
      return false;
    }
    if (email !== confirmEmail) {
      toast.error("Los correos no coinciden.");
      return false;
    }
    setRecoverPass((prev) => ({
      ...prev,
      email: email,
      confirmEmail: confirmEmail,
    }));
    return true;
  }

  function handleSubmit() {
    const email = recoverPass.email.trim();
    const data = { email };
    if (!validSameEmail({ target: { value: email } })) {
      return;
    }
    toast.promise(fetchSendRecoverPassword(data), {
      loading: "Enviando solicitud...",
      success: (data) => {
        if (data) {
          navigate("/");
          return "Solicitud enviada con éxito, revisa tu correo";
        } else {
          throw Error("Error al registrarte");
        }
      },
      error: (msg) => `Error: ${msg}`,
    });
  }

  return (
    <>
      <section className="section__login_academy">
        <div action="" className="form__login">
          <div className="flex flex-col items-center justify-center">
            <h2 className="subtitle__login">Solicitar recordar contraseña</h2>
          </div>

          <label htmlFor="mail" className="label__login">
            Correo
          </label>
          <input
            type="text"
            id="mail"
            name="mail"
            autoComplete="off"
            className="input__login"
            placeholder="Correo electronico"
            onChange={(e) => setRecoverPass({ ...recoverPass, email: e.target.value })}
            value={recoverPass.email}
          />

          <label htmlFor="confirm_email" className="label__login">
            Confirmar Correo
          </label>
          <input
            type="text"
            id="confirm_email"
            name="confirm_email"
            autoComplete="off"
            className="input__login"
            placeholder="Correo electronico"
            onChange={(e) => setRecoverPass({ ...recoverPass, confirmEmail: e.target.value })}
            value={recoverPass.confirmEmail}
          />

          <button className="button__login" onClick={() => handleSubmit()} >Recordar contraseña</button>
        </div>
      </section>
    </>
  );
}
