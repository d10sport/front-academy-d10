// import { useState, useContext, useEffect } from "react";
// import getTokenDecoded from "@lib/token/token-url";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
import "./change-pass.css";

export default function LoginAdmin() {
  // const context = useContext(AppContext);
  // const urlApi = context.urlApi;
  // const apiKey = context.apiKey;

  return (
    <>
      <section className="section__login_academy">
        <div action="" className="form__login">
          <div className="flex flex-col items-center justify-center">
            <h1 className="title__login">D10+ Academy</h1>
            <h2 className="subtitle__login">Cambiar Contraseña</h2>
          </div>

          <label htmlFor="new_pass" className="label__login">
            Nueva contraseña
          </label>
          <input
            type="text"
            id="new_pass"
            name="new_pass"
            autoComplete="off"
            className="input__login"
            placeholder="Nueva contraseña"
          />

          <label htmlFor="password" className="label__login">
            Confirmar nueva contraseña
          </label>

          <input
            type="password"
            id="confirm_new_pass"
            name="confirm_new_pass"
            autoComplete="off"
            className="input__login"
            placeholder="Confirmar nueva contraseña"
          />

          <button className="button__login">Cambiar contraseña</button>
        </div>
      </section>
    </>
  );
}
