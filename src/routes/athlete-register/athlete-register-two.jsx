import { useEffect, useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "sonner";
import axios from "axios";
import "./athlete-register.css";

export default function AthleteRegisterTwo() {
  const context = useContext(AppContext);
  const apiHostRapidIntagram = context.apiHostRapidIntagram;
  const apiKeyRapidApi = context.apiKeyRapidApi;
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate();

  const [userIntagram, setUserInstagram] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [inputCity, setInputCity] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  function handleCountry(event) {
    let countryId = context.registerAthlete.countryID;
    if (event.target?.selectedOptions != undefined) {
      countryId = event.target.selectedOptions[0].id;
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      city: "",
      cityID: "",
    }));
    context.setRegisterAthlete((prev) => ({
      ...prev,
      country: event.target.value,
      countryID: countryId,
    }));
    if (countryId != "") {
      fetchCities(event.target.selectedOptions[0].id);
    }
  }

  function handleCityInput(event) {
    context.registerAthlete((prev) => ({
      ...prev,
      city: event.target.value,
      cityID: 1,
    }));
  }

  function handleCity(event) {
    let cityId = context.registerAthlete.cityID;
    if (event.target?.selectedOptions != undefined) {
      cityId = event.target.selectedOptions[0].id;
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      city: event.target.value,
      cityID: cityId,
    }));
  }

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  function handleEmail(event) {
    const email = event.target.value;
    context.setRegisterAthlete((prev) => ({
      ...prev,
      mail: email,
    }));
  }

  function handleCellPhone(event) {
    let number = parseInt(event.target.value);
    if (isNaN(number)) {
      event.target.value = "";
      number = 0;
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      contact: number,
    }));
  }

  function handleAcademicLevel(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      academic_level: event.target.value,
    }));
  }

  function handleSocialNetworks(user) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      social_networks: { instagram: user },
    }));
  }

  const handleUserInstagram = async (e) => {
    let value = e.target.value;
    if (
      Object.keys(context.registerAthlete.social_networks).length > 0 &&
      context.registerAthlete.social_networks?.instagram != ""
    ) {
      let newValue = value
        .replace(context.registerAthlete.social_networks?.instagram, "")
        .trim();
      value = newValue;
      clearSelectInstagram();
    }
    setUserInstagram(value);
  };

  const handleSuggestionClick = (username) => {
    if (username.full_name != "") {
      setUserInstagram(username.full_name);
      handleSocialNetworks({ username: username.username, name: username.full_name });
    } else {
      setUserInstagram(username.username);
      handleSocialNetworks({ username: username.username, name: username.full_name });
    }
    setSuggestions([]);
    setIsOpenModal(false);
  };

  async function fetchFilterInstragram() {
    try {
      const response = await axios.get(
        `https://${apiHostRapidIntagram}/v1/info?username_or_id_or_url=${userIntagram}`,
        {
          headers: {
            "x-rapidapi-key": apiKeyRapidApi,
            "x-rapidapi-host": apiHostRapidIntagram,
          },
        }
      );
      if (!response?.data?.data) {
        setSuggestions([]);
        return [];
      } else {
        setSuggestions([response.data.data]);
        return [response.data.data];
      }
    } catch (error) {
      console.error("Error al filtrar entrenadores:", error);
      setUserInstagram(userIntagram);
      handleSocialNetworks(userIntagram);
      return [];
    }
  }

  const clearSelectInstagram = () => {
    setUserInstagram("");
    setSuggestions([]);
    context.setRegisterAthlete((prev) => ({
      ...prev,
      social_networks: { instagram: "" }
    }));
  };

  const handleInstagramSearch = () => {
    if (userIntagram.length >= 1) {
      toast.promise(fetchFilterInstragram(userIntagram), {
        loading: "Cargando...",
        success: (data) => {
          if (data.length > 0) {
            setIsOpenModal(true);
            return "Filtro realizado con exito";
          } else {
            return "No se encontraron resultados";
          }
        },
        error: "Error al filtrar",
      });
    } else {
      setSuggestions([]);
      toast.error("Por favor, ingrese un usuario");
    }
  };

  function clearCity() {
    setCountries([]);
    setCities([]);
    fetchCountries();
    context.setRegisterAthlete({
      ...context.registerAthlete,
      country: "",
      countryID: ""
    });
    context.setRegisterAthlete((prev) => ({
      ...prev,
      city: "",
      cityID: "",
    }));
  }

  function clearUserInstagram() {
    setUserInstagram("");
    setSuggestions([]);
    context.setRegisterAthlete((prev) => ({
      ...prev,
      social_networks: { instagram: "" },
    }));
  }


  function changeShowInputCity() {
    setCities([]);
    setInputCity(!inputCity);
    context.setRegisterAthlete((prev) => ({
      ...prev,
      city: "",
      cityID: "",
    }));
  }

  async function fetchCountries() {
    axios
      .get(`${urlApi}external/g/rest/countries/america`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          console.error(`${response.data.message}`);
          return;
        }
        response.data.data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setCountries(response.data.data);
      })
      .catch(() => {
        console.error("Error al obtener los paises");
      });
  }

  function fetchCities(countryId) {
    axios
      .get(`${urlApi}external/g/geon/cities/${countryId}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (!response.data.success) {
          console.error(`${response.data.message}`);
          return;
        }
        response.data.data.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setCities(response.data.data);
      })
      .catch(() => {
        console.error("Error al obtener las ciudades");
      });
  }

  function nextStep() {
    if (
      !context.registerAthlete.country ||
      !context.registerAthlete.city ||
      !context.registerAthlete.mail ||
      !context.registerAthlete.contact ||
      !context.registerAthlete.academic_level
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    if (!validateEmail(context.registerAthlete.mail)) {
      toast.error("Por favor, ingrese un email válido");
      return;
    }
    navigate("/register/athlete/step-three");
  }

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <>
      <section className="section__login">
        <div className="form__login">
          <label htmlFor="pais" className="label__login cursor-pointer">
            País <span className="bg-transparent text-red-600 font-bold">* </span>
          </label>
          {countries.length === 0 ? (
            <input
              type="text"
              id="country"
              name="country"
              autoComplete="off"
              className="input__login"
              placeholder="País"
              defaultValue={context.registerAthlete.country}
              onClick={(e) => handleCountry(e)}
            />
          ) : (
            <select
              key={context.registerAthlete.countryID}
              name="country"
              id="country"
              className="input__login"
              value={context.registerAthlete.country}
              onChange={(e) => handleCountry(e)}
            >
              <option value="" disabled>
                Seleccionar...
              </option>
              {countries.map((country) => (
                <option className="cursor-pointer"
                  key={country.id} id={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          )}

          <label htmlFor="ciudad" className="label__login cursor-pointer">
            Ciudad <span className="bg-transparent text-red-600 font-bold">* </span>
          </label>

          {inputCity ? (
            <div className="w-full flex justify-between gap-2">
              <input
                type="text"
                name="country"
                id="country"
                className="input__login"
                defaultValue={context.registerAthlete.city}
                onChange={(e) => handleCityInput(e)}
              />

              <button className="input-btn" onClick={() => changeShowInputCity()}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 8v5a5 5 0 0 1 -5 5h-3l3 -3m0 6l-3 -3" /><path d="M5 16v-5a5 5 0 0 1 5 -5h3l-3 -3m0 6l3 -3" />
                </svg>
              </button>
            </div>
          ) : (
            (cities.length === 0 && countries.length === 0) ||
              (context.registerAthlete.city != "" &&
                context.registerAthlete.country != "") ? (
              <div className="w-full flex justify-between gap-2">
                <input
                  type="text"
                  id="city"
                  name="city"
                  autoComplete="off"
                  className="input__login cursor-no-drop outline-none"
                  placeholder="Ciudad"
                  defaultValue={context.registerAthlete.city}
                  disabled
                />
                <button className="input-btn" onClick={() => clearCity()}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-between gap-2">

                <select
                  name="country"
                  id="country"
                  className="input__login"
                  defaultValue={context.registerAthlete.city}
                  onChange={(e) => handleCity(e)}
                  disabled={
                    cities.length === 0 && !context.registerAthlete.city
                      ? true
                      : false
                  }
                >
                  <option selected>Seleccionar...</option>
                  {cities.map((city) => (
                    <option className="cursor-pointer"
                      key={city.id} id={city.code} defaultValue={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <button className="input-btn" onClick={() => changeShowInputCity()}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 8v5a5 5 0 0 1 -5 5h-3l3 -3m0 6l-3 -3" /><path d="M5 16v-5a5 5 0 0 1 5 -5h3l-3 -3m0 6l3 -3" />
                  </svg>
                </button>
              </div>
            ))}

          <label htmlFor="email" className="label__login ">
            Email <span className="bg-transparent text-red-600 font-bold">* </span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            className="input__login"
            placeholder="Nombre"
            defaultValue={context.registerAthlete.mail}
            onChange={(e) => handleEmail(e)}
          />

          <label
            htmlFor="numero-celular"
            className="label__login cursor-pointer"
          >
            Numero celular <span className="bg-transparent text-red-600 font-bold">* </span>
          </label>
          <input
            type="text"
            maxLength={10}
            id="number_phone"
            name="number_phone"
            autoComplete="off"
            className="input__login"
            placeholder="Numero celular"
            defaultValue={
              context.registerAthlete.contact == 0
                ? ""
                : context.registerAthlete.contact
            }
            onChange={(e) => handleCellPhone(e)}
          />

          <label
            htmlFor="academic_level"
            className="label__login cursor-pointer"
          >
            Grado Académico <span className="bg-transparent text-red-600 font-bold">* </span>
          </label>
          <select
            id="academic_level"
            name="academic_level"
            className="input__login"
            defaultValue={context.registerAthlete.academic_level}
            onChange={(e) => handleAcademicLevel(e)}
          >
            <option defaultValue="" selected>
              Seleccionar...
            </option>
            <option defaultValue="bachiller">Bachiller</option>
            <option defaultValue="tecnico">Técnico</option>
            <option defaultValue="tecnologico">Tecnológico</option>
            <option defaultValue="pregrado">Pregrado</option>
            <option defaultValue="postgrado">Postgrado</option>
            <option defaultValue="especializacion">Especializacion</option>
            <option defaultValue="doctorado">Doctorado</option>
          </select>

          <label htmlFor="user-instagram" className="label__login">
            Usuario Instagram
          </label>
          <div className="input-container">
            {context.registerAthlete.social_networks?.instagram?.name != undefined ? (
              <div className="w-full flex justify-between gap-2">
                <input
                  type="text"
                  id="user-instagram"
                  name="user-instagram"
                  autoComplete="off"
                  className="input__login"
                  placeholder="Usuario Instagram"
                  value={context.registerAthlete.social_networks?.instagram?.name || ""}
                  disabled
                />
                <button className="input-btn" onClick={() => clearUserInstagram()}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-full flex justify-between gap-2">
                <input
                  type="text"
                  id="user-instagram"
                  name="user-instagram"
                  autoComplete="off"
                  className="input__login"
                  placeholder="Usuario Instagram"
                  defaultValue={
                    userIntagram ||
                    context.registerAthlete.social_networks?.instagram ||
                    ""
                  }
                  onChange={(e) => handleUserInstagram(e)}
                />
                <button className="input-btn" onClick={handleInstagramSearch}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <button onClick={() => nextStep()} className="button-three__login">
            Siguiente
          </button>
          <button
            className="link__login center-text__login"
            onClick={() => navigate("/register/athlete/step-one")}
          >
            Regresar
          </button>
        </div>
      </section>

      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => { }}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="Actualizar contraseña"
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.75)",
            zIndex: 1000,
          },
          content: {
            width: "fit-content",
            height: "fit-content",
            margin: "auto",
            borderRadius: "12px",
            paddingLeft: "40px",
            paddingRight: "40px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          },
        }}
      >
        <button
          className="cursor-pointer absolute top-4 right-4"
          onClick={() => {
            setIsOpenModal(false);
            setSuggestions([]);
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
        <div className="flex mx-8 justify-center items-center">
          <h2 className="text-xl text-center font-semibold text-black">Selecciona tu usuario</h2>
        </div>
        <section className="flex flex-col gap-2 mt-2 mb-4">
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSuggestionClick(user)}
                  className="bg-white rounded-3xl p-4 shadow-xl flex items-center gap-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[3px]">
                    <div className="bg-white rounded-xl w-full h-full flex items-center justify-center overflow-hidden">
                      <img
                        src={`${urlApi}external/g/instagram/proxy-img?url=${encodeURIComponent(user?.hd_profile_pic_url_info.url)}`}
                        alt={user.username}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <h3 className="text-lg font-bold text-pink-600">{user.full_name || user.username}</h3>
                    <p className="text-sm text-gray-900">@{user.username}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(user.biography || "No hay biografía disponible")
                        .split("\n")
                        .map((line, index) => (
                          <span key={index} className="block text-xs text-gray-500 mt-1">
                            {line}
                          </span>
                        ))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Modal>
    </>
  );
}
