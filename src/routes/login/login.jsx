import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from 'sonner';
import axios from "axios";
import './login.css';

export default function Login() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function fetchLoginUser(data) {
    axios.post(`${urlApi}academy/users/login`,
      JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
      .then((response) => {
        if (!response.data.success) {
          toast.error(`${response.data.message}`);
          context.setLoadingAuth(false);
          return
        };
        context.openSession({ user: [response.data.user], token: response.data.token });
        toast.success('Sesión iniciada correctamente');
        context.setLoadingAuth(false);
      })
      .catch(() => {
        context.closeSession()
        toast.error('Error al iniciar sesión');
        context.setLoadingAuth(false);
      });
  }

  function handleLogin() {
    if (username == '' || password == '' || context.typeUser == '') {
      toast.error('Por favor, complete todos los campos');
      return;
    }
    context.setLoadingAuth(true);
    const data = {
      username: username,
      password: password,
      role_user: context.typeUser
    }
    fetchLoginUser(data)
  }

  function selectUserAgain() {
    navigate('/login-user');
  }

  return (
    <>
      {/* <Header /> */}
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <div action="" className="form__login">

          <h2 className="subtitle__login">Iniciar Sesión</h2>
          <div className="container__type-user">
            <button className='button__type-user text_300' onClick={() => selectUserAgain()} >
              {context.typeUser == 'athlete' ?
                'Deportista' :
                context.typeUser == 'coach' ?
                  'Entrenador' :
                  context.typeUser == 'club' ?
                    'Club' :
                    ''
              }
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
            onChange={(e) => handleUsername(e)}
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
            onChange={(e) => handlePassword(e)}
          />

          {/* <Link to="/forgot" className="margin-top__login">
            <span className="link__login">
              Recordar contraseña
            </span>
          </Link> */}

          <button className="button__login" onClick={() => handleLogin()}>Iniciar Sesión</button>

          {/* <p className="text__login">
            ¿No tienes una cuenta? &nbsp;
            <Link to="/register" className="link__login link--color__login">
              Regístrate ahora
            </Link>
          </p> */}
        </div>
      </section>
    </>
  );
}
