// import AppContext from "@context/app/app-context";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { toast } from "sonner";
// import axios from "axios";
import "./change-pass.css";

export default function ChangePass() {
  return (
    <>
      <div className="cntr-form__change-password">
        <form action="" className="form__change-password">
          <h1 className="title__change-password">Cambiar Contraseña</h1>
          <label htmlFor="new-pass" className="label__change-password">
            Nueva Contraseña
          </label>
          <input
            type="password"
            className="input__change-password"
            placeholder="Ingrese su nueva contraseña"
            id="new-pass"
          />
          <label htmlFor="confirm-pass" className="label__change-password">
            Repite la Nueva Contraseña
          </label>
          <input
            type="password"
            className="input__change-password"
            placeholder="Confirma tu nueva contraseña"
            id="confirm-pass"
          />
          <button className="button__change-password">
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </>
  );
}
