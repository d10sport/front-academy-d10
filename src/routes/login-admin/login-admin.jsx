import { useState, useContext, useEffect } from "react";
import getTokenDecoded from "@lib/token/token-url";
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import "./login-admin.css";

export default function LoginAdmin() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [loginLink, setLoginLink] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const query = useQuery();

  function handleUsername(e) {
    setUsername(e.target.value.trim());
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function fetchLoginUser(data) {
    axios
      .post(`${urlApi}academy/users/login`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          toast.error(`${response.data.message}`);
          context.setLoadingAuth(false);
          return;
        }
        context.openSession({ token: response.data.token });
        toast.success("Sesión iniciada correctamente");
        context.setLoadingAuth(false);
      })
      .catch(() => {
        context.closeSession();
        toast.error("Error al iniciar sesión");
        context.setLoadingAuth(false);
      });
  }

  function handleLogin() {
    if (username == "" || password == "" || context.typeUser == "") {
      toast.error("Por favor, complete todos los campos");
      return;
    }

    context.setLoadingAuth(true);
    const data = {
      username: username,
      password: password,
      role_user: context.typeUser,
    };
    fetchLoginUser(data);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  function selectUserAgain() {
    navigate("/login-user");
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  async function getDataRole() {
    const data = await context.fetchRoleUsers();
    const usersRol = data.splice(-1);
    if (usersRol.length == 0) {
      toast.error("No se encontro el rol de administrador");
      return;
    }
    context.setRoleSystem(usersRol);
    context.setTypeUser({
      role_id: usersRol[0].id,
      name_role: usersRol[0].description_role,
      description_role: usersRol[0].name_role,
    });
  }

  useEffect(() => {
    getDataRole();
    if (
      username == "" ||
      username == undefined ||
      password == "" ||
      password == undefined ||
      context.typeUser == "" ||
      context.typeUser == undefined
    ) {
      return;
    }

    handleKeyDown();
  }, [loginLink]);

  async function getDecodeUrl() {
    const tokenUser = query.get("CwcfFzgQ50HM");
    if (tokenUser !== null && tokenUser !== undefined && tokenUser !== "") {
      let user = "";
      let pass = "";
      let type = "";

      const decode = await getTokenDecoded(tokenUser);
      if (decode.decoded && decode.msg == "Token valid") {
        const params = new URLSearchParams(decode.decoded.token);
        let dUser = await getTokenDecoded(params.get("username"));
        let dPass = await getTokenDecoded(params.get("password"));
        let dType = await getTokenDecoded(params.get("role_user"));
        if (
          dUser &&
          dUser.msg == "Token valid" &&
          dPass &&
          dPass.msg == "Token valid" &&
          dType &&
          dType.msg == "Token valid"
        ) {
          user = dUser.decoded;
          pass = dPass.decoded;
          type = dType.decoded;
          setLoginLink(true);
        }
      } else {
        toast.error(decode.msg);
      }

      if (user && pass && type) {
        setUsername(user?.username);
        setPassword(pass?.password);
        context.setTypeUser(type?.role);
        context.setPermissionsUser(type?.permissions);
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
      {/* <Header /> */}
      <section className="section__login_academy">
        <div action="" className="form__login">
          <div className="flex flex-col items-center justify-center">
            <h1 className="title__login">D10+ Academy</h1>
            <h2 className="subtitle__login">Iniciar Sesión</h2>
            <button
              className="button__type-user"
              onClick={() => selectUserAgain()}
            >
              Admin
            </button>
          </div>

          <label htmlFor="email" className="label__login">
            Correo
          </label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="off"
            className="input__login"
            placeholder="username@gmail.com"
            value={username}
            onChange={(e) => handleUsername(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />

          <label htmlFor="password" className="label__login">
            Contraseña
          </label>

          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            className="input__login"
            placeholder="password"
            value={password}
            onChange={(e) => handlePassword(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />

          {/* <Link to="/forgot" className="margin-top__login">
            <span className="link__login">
              Recordar contraseña
            </span>
          </Link> */}

          <button className="button__login" onClick={() => handleLogin()}>
            Iniciar Sesión
          </button>
        </div>
      </section>
    </>
  );
}
