import { useState, useEffect, useContext } from "react";
import photoUser from "@assets/icons/photo_user.png"
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import axios from "axios";
import "./club-register.css";

export default function ClubRegisterTwo() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const apiKeyRapidApi = context.apiKeyRapidApi;
  const apiHostRapidIntagram = context.apiHostRapidIntagram;

  const [userIntagram, setUserInstagram] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  function handleCountry(event) {
    let countryId = context.registerClub.countryID;
    if (event.target?.selectedOptions != undefined) {
      countryId = event.target.selectedOptions[0].id
    }
    context.setRegisterClub((prev) => ({
      ...prev,
      city: '',
      cityID: ''
    }))
    context.setRegisterClub((prev) => ({
      ...prev,
      country: event.target.value,
      countryID: countryId
    })
    )
    if (countryId != '') {
      fetchCities(event.target.selectedOptions[0].id);
    }
  }

  function handleCity(event) {
    let cityId = context.registerClub.cityID;
    if (event.target?.selectedOptions != undefined) {
      cityId = event.target.selectedOptions[0].id
    }
    context.setRegisterClub((prev) => ({
      ...prev,
      city: event.target.value,
      cityID: cityId
    })
    )
  }

  function handleEmail(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      mail: event.target.value,
    })
    )
  }

  function handleCellPhone(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      contact: parseInt(event.target.value),
    })
    )
  }

  function handleSocialNetworks(user) {
    context.setRegisterClub((prev) => ({
      ...prev,
      social_networks: user,
    })
    )
  }

  async function fetchCountries() {
    axios.get(`${urlApi}external/g/rest/countries/america`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
      })
      .then((response) => {
        if (!response.data.success) {
          console.error(`${response.data.message}`);
          return
        };
        setCountries(response.data.data);
      })
      .catch(() => {
        console.error('Error al obtener los paises');
      });
  }

  function fetchCities(countryId) {
    axios.get(`${urlApi}external/g/geon/cities/${countryId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
      })
      .then((response) => {
        if (!response.data.success) {
          console.error(`${response.data.message}`);
          return
        };
        setCities(response.data.data);
      })
      .catch(() => {
        console.error('Error al obtener las ciudades');
      });
  }

  const clearSelectInstagram = () => {
    setUserInstagram("");
    setSuggestions([]);
    context.setRegisterClub((prev) => ({
      ...prev,
      instagram: "",
    })
    )
  }

  const handleInstagramSearch = () => {
    if (userIntagram.length >= 2) {
      toast.promise(fetchFilterInstragram(userIntagram), {
        loading: 'Cargando...',
        success: (data) => {
          if (data.length > 0) {
            return 'Filtro realizado con exito'
          } else {
            return 'No se encontraron resultados'
          }
        },
        error: 'Error al filtrar entrenadores',
      });
    } else {
      setSuggestions([]);
    }
  };

  async function fetchFilterInstragram() {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://${apiHostRapidIntagram}/v1/info?username_or_id_or_url=${userIntagram}`, {
        headers: {
          "x-rapidapi-key": apiKeyRapidApi,
          "x-rapidapi-host": apiHostRapidIntagram,
        },
      });
      if (!response?.data?.data) {
        setSuggestions([]);
        return []
      } else {
        setSuggestions([response.data.data]);
        return [response.data.data];
      }
    } catch (error) {
      console.error("Error al filtrar entrenadores:", error);
      return []
    } finally {
      setIsLoading(false);
    }
  }

  const handleUserInstagram = async (e) => {
    let value = e.target.value;
    if (context.registerClub.social_networks != "") {
      let newValue = value.replace(context.registerClub.social_networks, "").trim();
      value = newValue;
      clearSelectInstagram();
    }
    setUserInstagram(value);
  };

  const handleSuggestionClick = (username) => {
    if (username.full_name != "") {
      setUserInstagram(username.full_name);
      handleSocialNetworks(username.full_name);
    } else {
      setUserInstagram(username.username)
      handleSocialNetworks(username.username);
    }
    setSuggestions([]);
  };

  async function nextStep() {
    if (!context.registerClub.country || !context.registerClub.city || !context.registerClub.mail || !context.registerClub.contact || !context.registerClub.social_networks) {
      toast.error('Por favor, complete todos los campos');
      return
    }
    navigate('/register/club/step-three')
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  return (
    <>
      <section className="section__login">
        <div className="form__login">
          <h2 className="title__login">D10+ Academy</h2>
          <h2 className="subtitle__login margin-general__login">
            Regístrate como <span className="text-decoration__login">Club</span>
          </h2>

          <label htmlFor="pais" className="label__login">
            País
          </label>
          {countries.length === 0 ?
            (
              <input
                type="text"
                id="country"
                name="country"
                autoComplete="off"
                className="input__login"
                placeholder="País"
                value={context.registerClub.country}
                onClick={(e) => handleCountry(e)}
              />
            ) :
            (
              <select
                name="country"
                id="country"
                className="input__login"
                defaultValue={context.registerClub.country}
                onChange={(e) => handleCountry(e)}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                {countries.map((country) => (
                  <option key={country.id} id={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            )}

          <label htmlFor="ciudad" className="label__login">
            Ciudad
          </label>
          {cities.length === 0 && countries.length === 0 ||
            context.registerClub.city != '' && context.registerClub.country != '' ?
            (
              <input
                type="text"
                id="city"
                name="city"
                autoComplete="off"
                className="input__login cursor-no-drop outline-none"
                placeholder="Ciudad"
                disabled
                value={context.registerClub.city}
              />
            ) : (
              <select
                name="country"
                id="country"
                className="input__login"
                defaultValue={context.registerClub.city}
                onChange={(e) => handleCity(e)}
                disabled={cities.length === 0 && !context.registerClub.city ? true : false}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                {cities.map((city) => (
                  <option key={city.id} id={city.code} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            )}


          <label htmlFor="email" className="label__login">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            className="input__login"
            placeholder="Email"
            value={context.registerClub.mail}
            onChange={(e) => handleEmail(e)}
          />

          <label htmlFor="number_phone" className="label__login">
            Numero celular
          </label>
          <input
            type="text"
            id="number_phone"
            name="number_phone"
            autoComplete="off"
            className="input__login"
            placeholder="Numero celular"
            value={context.registerClub.contact == 0 ? '' : context.registerClub.contact}
            onChange={(e) => handleCellPhone(e)}
          />

          <label htmlFor="user-instagram" className="label__login">
            Usuario Instagram
          </label>
          <div className="input-container">
            <div className="w-full flex justify-between gap-2">
              <input
                type="text"
                id="user-instagram"
                name="user-instagram"
                autoComplete="off"
                className="input__login"
                placeholder="Usuario Instagram"
                value={userIntagram || context.registerClub.social_networks}
                onChange={(e) => handleUserInstagram(e)}
              />
              <button className="input-btn" onClick={handleInstagramSearch}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />
                </svg>
              </button>
            </div>
          </div>
          {isLoading && <p>Cargando...</p>}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(user)}
                >
                  <div className="suggestion-info">
                    <p className="suggestion-fullname">{user.full_name != "" ? user.full_name : user.username}</p>
                  </div>
                  <img
                    // src={user.hd_profile_pic_url_info.url}
                    src={photoUser}
                    width="24"
                    height="24"
                    alt={user.username}
                    className="suggestion-avatar"
                  />
                </li>
              ))}
            </ul>
          )}

          <button onClick={() => nextStep()} className="button-three__login">Siguiente</button>
          <button
            className="cursor-pointer link__login center-text__login"
            onClick={() => navigate('/register/club/step-one')}
          >
            Regresar
          </button>
        </div>
      </section>
    </>
  );
}
