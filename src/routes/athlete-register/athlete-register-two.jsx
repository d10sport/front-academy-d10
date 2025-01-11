import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { toast } from 'sonner';
import axios from "axios";
import { useState } from "react";

export default function AthleteRegisterTwo() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate()

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filterCoach, setFilterCoach] = useState("");
  const [coachResults, setCoachResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleCountry(event) {
    let countryId = context.registerAthlete.countryID;
    if (event.target?.selectedOptions != undefined) {
      countryId = event.target.selectedOptions[0].id
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      city: '',
      cityID: 0
    }))
    context.setRegisterAthlete((prev) => ({
      ...prev,
      country: event.target.value,
      countryID: countryId
    })
    )
    if (countryId != 0) {
      fetchCities(event.target.selectedOptions[0].id);
    }
  }

  function handleCity(event) {
    let cityId = context.registerAthlete.cityID;
    if (event.target?.selectedOptions != undefined) {
      cityId = event.target.selectedOptions[0].id
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      city: event.target.value,
      cityID: cityId
    })
    )
  }

  function handleEmail(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      mail: event.target.value,
    })
    )
  }

  function handleCellPhone(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      contact: event.target.value,
    })
    )
  }

  function handleAcademicLevel(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      academic_level: event.target.value,
    })
    )
  }

  function handleInstagram(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      social_networks: event.target.value,
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

  const fetchFilterCoach = async (filter) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${urlApi}academy/g/search/coach/${filter}`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });

      if (!response.data.success || response.data.data.length === 0) {
        setCoachResults([]);
        return []
      } else {
        setCoachResults(response.data.data);
        return [response.data.data];
      }
    } catch (error) {
      console.error("Error al filtrar entrenadores:", error);
      return []
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelectCoach = () => {
    setFilterCoach("");
    context.setRegisterAthlete((prev) => ({
      ...prev,
      coach: "",
      id_coach: 0,
    })
    )
  }

  const handleCoachSearch = (e) => {
    let value = e.target.value;
    if (context.registerAthlete.coach != "") {
      const newValue = e.target.value.replace(context.registerAthlete.coach, "").trim();
      value = newValue;
      clearSelectCoach();
    }
    setFilterCoach(value);

    if (value.length >= 2) {
      toast.promise(fetchFilterCoach(value), {
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
      setCoachResults([]);
    }
  };

  const handleOnChangeCoach = (e) => {
    const selectedIndex = e.target.selectedIndex - 1;
    const selectedOption = coachResults[selectedIndex];
    handleCoachSelect(selectedOption.id, `${selectedOption.first_names} ${selectedOption.last_names}`);
  }

  const handleCoachSelect = (id, fullName) => {
    setFilterCoach(fullName);
    setCoachResults([]);
    context.setRegisterAthlete((prev) => ({
      ...prev,
      coach: fullName,
      id_coach: id,
    }));
  };

  function nextStep() {
    if (!context.registerAthlete.country || !context.registerAthlete.city || !context.registerAthlete.coach || !context.registerAthlete.mail || !context.registerAthlete.contact || !context.registerAthlete.academic_level || !context.registerAthlete.social_networks) {
      toast.error('Por favor, complete todos los campos');
      return
    }
    navigate('/register/athlete/step-three')
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    if (filterCoach === "") {
      setCoachResults([]);
    }
  }, [filterCoach]);


  return (
    <>
      <section className="section__login">
        <h2 className="title__login">D10+ Academy</h2>
        <div className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Regístrate como deportista
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
                className="input__login"
                placeholder="País"
                value={context.registerAthlete.country}
                onClick={(e) => handleCountry(e)}
              />
            ) :
            (
              <select
                name="country"
                id="country"
                className="input__login"
                defaultValue={context.registerAthlete.country}
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
            context.registerAthlete.city != '' && context.registerAthlete.country != '' ?
            (
              <input
                type="text"
                id="city"
                name="city"
                className="input__login cursor-no-drop outline-none"
                placeholder="Ciudad"
                disabled
                value={context.registerAthlete.city}
              />
            ) : (
              <select
                name="country"
                id="country"
                className="input__login"
                value={context.registerAthlete.city}
                onChange={(e) => handleCity(e)}
                disabled={cities.length === 0 && !context.registerAthlete.city ? true : false}
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

          <label htmlFor="entrenador" className="label__login">
            Entrenador
          </label>
          <div className="input-container">
            <div className="w-full flex justify-between gap-2">
              <input
                type="text"
                id="entrenador"
                name="entrenador"
                className="input__login"
                placeholder="Buscar entrenador"
                value={filterCoach || context.registerAthlete.coach}
                onChange={(e) => handleCoachSearch(e)}
              />
              <button onClick={clearSelectCoach}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
            {isLoading && <p>Cargando...</p>}
            {coachResults.length > 0 && (
              <>
                <p>Resultados</p>
                <select
                  size={coachResults.length > 5 ? 5 : coachResults.length}
                  className="select__login input__login"
                  onChange={(e) => handleOnChangeCoach(e)}
                  defaultValue={context.registerAthlete.coach}
                >
                  <option value="" selected disabled >Seleccione un entrenador...</option>
                  {coachResults.map((coach) => (
                    <option key={coach.id} value={coach.id}>
                      {`${coach.first_names} ${coach.last_names}`}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <label htmlFor="email" className="label__login">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input__login"
            placeholder="Nombre"
            value={context.registerAthlete.mail}
            onChange={(e) => handleEmail(e)}
          />

          <label htmlFor="numero-celular" className="label__login">
            Numero celular
          </label>
          <input
            type="text"
            id="number_phone"
            name="number_phone"
            className="input__login"
            placeholder="Numero celular"
            value={context.registerAthlete.contact == 0 ? '' : context.registerAthlete.contact}
            onChange={(e) => handleCellPhone(e)}
          />

          <label htmlFor="grado-academico" className="label__login">
            Grado Académico
          </label>
          <select
            name="academic_level"
            id="academic_level"
            className="input__login"
            defaultValue={context.registerAthlete.academic_level}
            onChange={(e) => handleAcademicLevel(e)}
          >
            <option value="" selected disabled>
              Seleccionar...
            </option>
            <option value="bachiller">Bachiller</option>
            <option value="pregrado">Pregrado</option>
            <option value="postgrado">Postgrado</option>
            <option value="especializacion">Especializacion</option>
            <option value="doctorado">Doctorado</option>
          </select>

          <label htmlFor="usuario-instagram" className="label__login">
            Usuario Instagram
          </label>
          <input
            type="text"
            id="user_instagram"
            name="user_instagram"
            className="input__login"
            placeholder="Usuario_Instagram"
            value={context.registerAthlete.social_networks}
            onChange={(e) => handleInstagram(e)}
          />

          <button onClick={() => nextStep()} className="button-three__login">Siguiente</button>
          <button
            className="link__login link--color__login center-text__login"
            onClick={() => navigate('/register/athlete/step-one')}
          >
            Regresar
          </button>
        </div>
      </section>
    </>
  );
}
