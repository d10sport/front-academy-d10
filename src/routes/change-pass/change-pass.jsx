import { useState, useEffect, useContext } from "react";
import getTokenDecoded from "@lib/token/token-url";
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import "./change-pass.css";

export default function ChangePass() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate();
  const query = useQuery();
  const [dataUser, setDataUser] = useState({
    id_login: "",
    email: "",
    oldPassword: "",
    password: "",
  });

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  async function fetchChangePassword(data) {
    let res = false;
    try {
      const response = await axios.post(
        `${urlApi}academy/config/user/p/login`,
        {
          user_id: data.user_id,
          username: data.username,
          passwordOld: data.passwordOld,
          passwordNew: data.passwordNew,
          verify: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Error al actualizar contraseña");
      }
      res = true;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      res = false;
    }
    return res;
  }

  function handleSubmit() {
    const data = {
      user_id: dataUser.id_login,
      username: dataUser.email,
      passwordOld: dataUser.oldPassword,
      passwordNew: dataUser.password,
    }
    toast.promise(fetchChangePassword(data), {
      loading: "Enviando solicitud...",
      success: (data) => {
        if (data) {
          navigate("/");
          context.closeSession();
          return "Contraseña actualizada con éxito, inicia sesión nuevamente";
        } else {
          throw Error("Error, no se pudo actualizar la contraseña");
        }
      },
      error: (msg) => `Error: ${msg}`,
    });
  }

  async function getDecodeUrl() {
    const tokenUser = query.get("CwcfFzgQ50HM");
    if (tokenUser !== null && tokenUser !== undefined && tokenUser !== "") {
      let user = "";
      let pass = "";
      let type = "";
      let idUser = "";

      const decode = await getTokenDecoded(tokenUser);
      if (decode.decoded && decode.msg == "Token valido") {
        const params = new URLSearchParams(decode.decoded.token);
        let dUser = await getTokenDecoded(params.get("username"));
        let dPass = await getTokenDecoded(params.get("password"));
        let dType = await getTokenDecoded(params.get("role_user"));
        if (
          dUser &&
          dUser.msg == "Token valido" &&
          dPass &&
          dPass.msg == "Token valido" &&
          dType &&
          dType.msg == "Token valido"
        ) {
          user = dUser.decoded.username;
          pass = dPass.decoded.password;
          type = dType.decoded.role;
          idUser = dUser.decoded.sub;
        }
      } else {
        toast.error(decode.msg);
      }

      if (user && pass && type && idUser) {
        setDataUser({
          id_login: idUser,
          email: user,
          oldPassword: pass,
          password: "",
        });
        context.setTypeUser(type);
        context.setPermissionsUser(type.permissions);
      } else {
        if (context.typeUser == "") {
          navigate("/login-user");
        }
      }
    }
  }

  useEffect(() => {
    getDecodeUrl();
  }, []);

  return (
    <>
      <section className="section__login_academy">
        <div action="" className="form__login">
          <div className="flex flex-col items-center justify-center">
            <h1 className="title__login">D10+ Academy</h1>
            <h2 className="subtitle__login">Cambiar Contraseña</h2>
          </div>

          <label htmlFor="password" className="label__login">
            Nueva contraseña
          </label>

          <input
            type="password"
            id="confirm_new_pass"
            name="confirm_new_pass"
            autoComplete="off"
            className="input__login"
            placeholder="Confirmar nueva contraseña"
            onChange={(e) => setDataUser({ ...dataUser, password: e.target.value })}
            value={dataUser.password}
          />

          <button className="button__login" onClick={() => handleSubmit()} >Cambiar contraseña</button>
        </div>
      </section>
    </>
  );
}
