import { useState } from "react";
import axios from "axios";
import "./coach-register-two.css";

export default function Coach2() {
  const urlApi = import.meta.env.VITE_API_URL_RAPIDAPI;
  const apiKey = import.meta.env.VITE_API_KEY_RAPIDAPI;
  const apiHost = import.meta.env.VITE_API_HOST_RAPIDAPI;

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 4) {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          url: urlApi,
          params: { search_query: value },
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        };

        const response = await axios.request(options);
        const results = response.data.data.items || [];
        setSuggestions(results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (username) => {
    setQuery(username);
    setSuggestions([]);
  };

  return (
    <>
      <section className="section__login">
        <h2 className="title__login">D10+ Academy</h2>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como entrenador
          </h2>

          <label htmlFor="pais" className="label__login">
            País
          </label>
          <input
            type="text"
            id="pais"
            name="pais"
            className="input__login"
            placeholder="País"
          />
          <label htmlFor="ciudad" className="label__login">
            Ciudad
          </label>
          <input
            type="text"
            id="ciudad"
            name="ciudad"
            className="input__login"
            placeholder="Ciudad"
          />
          <label htmlFor="club-actual" className="label__login">
            Club Actual
          </label>
          <input
            type="text"
            id="club-actual"
            name="clubActual"
            className="input__login"
            placeholder="Club Actual"
          />
          <label htmlFor="email" className="label__login">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input__login"
            placeholder="Nombre"
          />
          <label htmlFor="numero-celular" className="label__login">
            Numero celular
          </label>
          <input
            type="tel"
            id="numero-celular"
            name="numeroCelular"
            className="input__login"
            placeholder="Numero celular"
          />

          <label htmlFor="usuario-instagram" className="label__login">
            Usuario Instagram
          </label>
          <input
            type="text"
            id="usuario-instagram"
            name="usuarioInstagram"
            className="input__login"
            placeholder="Usuario_Instagram"
            value={query}
            onChange={handleInputChange}
          />

          {loading && <div className="loading">Cargando...</div>}

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(user.username)}
                >
                  {/* <img
                    src={user.profile_pic_url}
                    alt={user.username}
                    className="suggestion-avatar"
                  /> */}
                  <div className="suggestion-info">
                    <p className="suggestion-username">@{user.username}</p>
                    {/* <p className="suggestion-fullname">{user.full_name}</p> */}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* <label htmlFor="usuario-instagram" className="label__login">
            Usuario Instagram
          </label>
          <input
            type="text"
            id="usuario-instagram"
            name="usuarioInstagram"
            className="input__login"
            placeholder="Usuario_Instagram"
          /> */}

          <button className="button-three__login">Siguiente</button>
          <a
            href=""
            className="link__login link--color__login center-text__login"
          >
            Regresar
          </a>
        </form>
      </section>
    </>
  );
}
