import { useContext, useEffect, useState, useCallback } from "react";
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "./club-register.css";
import axios from "axios";

export default function ClubRegisterThree() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate();

  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [optionsCategories, setOptionsCategories] = useState([]);

  const handleClickOutsideCategories = () => {
    setIsOpenCategories(false);
  };

  function handleCountCoaches(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        number_coaches: inputValue,
      }));
    }
  }

  function handleCountAthletes(event) {
    const maxLength = 4;
    const inputValue = event.target.value;

    if (inputValue.length <= maxLength) {
      context.setRegisterClub((prev) => ({
        ...prev,
        number_athletes: inputValue,
      }));
    }
  }

  function handleWebSite(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      website: event.target.value,
    }));
  }

  function handleCategories(option) {
    const name_category = option.category;
    const id_category = option.id;

    setSelectedCategories((prev) =>
      prev.includes(name_category)
        ? prev.filter((v) => v !== name_category)
        : [...prev, name_category]
    );
    context.setRegisterClub((prev) => {
      const exists = prev.categories.some((cat) => cat.id === id_category);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((cat) => cat.id !== id_category)
          : [...prev.categories, { id: id_category, category: name_category }],
      };
    });
  }

  function handleLocalLeague(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      local_league: event.target.value == "si" ? 1 : 0,
    }));
  }

  function handleNationalLeague(event) {
    context.setRegisterClub((prev) => ({
      ...prev,
      national_tournament: event.target.value == "si" ? 1 : 0,
    }));
  }

  const fetchAllCategories = useCallback(() => {
    axios
      .get(`${urlApi}academy/user/categories`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setOptionsCategories(response.data.data);
        }
      })
      .catch(() => {
        setOptionsCategories([]);
      });
  }, [urlApi, apiKey]);

  async function nextStep() {
    if (
      context.registerClub.number_coaches == 0 ||
      context.registerClub.number_athletes == 0 ||
      context.registerClub.local_league === "" ||
      context.registerClub.national_tournament === "" ||
      context.registerClub.categories.length == 0
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    navigate("/register/club/step-four");
  }

  useEffect(() => {
    const event = {
      target: {
        value: "no",
      },
    };
    handleNationalLeague(event);
    handleLocalLeague(event);
    fetchAllCategories();
  }, []);

  return (
    <>
      <section className="section__login">
        <div className="form__login">
          <h1 className="title__login">D10+ Academy</h1>
          <h2 className="subtitle__login">
            Regístrate como <span className="text-decoration__login">Club</span>
          </h2>

          <label htmlFor="number_coaches" className="label__login">
            Cantidad de Entrenadores <span className="bg-transparent text-red-600 font-bold">* </span>
          </label>
          <input
            type="number"
            id="number_coaches"
            name="number_coaches"
            className="input__login"
            autoComplete="off"
            placeholder="255"
            min={1}
            max={100}
            step={1}
            onChange={(e) => handleCountCoaches(e)}
            value={
              context.registerClub.number_coaches == 0
                ? ""
                : context.registerClub.number_coaches
            }
          />

          <label htmlFor="number_athletes" className="label__login">
            Cantidad de Deportistas <span className="bg-transparent text-red-600 font-bold">* </span>
          </label>
          <input
            type="number"
            id="number_athletes"
            name="number_athletes"
            autoComplete="off"
            className="input__login"
            placeholder="700"
            min={1}
            max={100}
            step={1}
            onChange={(e) => handleCountAthletes(e)}
            value={
              context.registerClub.number_athletes == 0
                ? ""
                : context.registerClub.number_athletes
            }
          />

          <label htmlFor="website" className="label__login">
            Sitio web
          </label>
          <input
            type="text"
            id="website"
            name="website"
            autoComplete="off"
            className="input__login"
            placeholder="www.miclub.com"
            value={context.registerClub.website}
            onChange={(e) => handleWebSite(e)}
          />

          <label id="categoria" className="label__login">
            Categorías
          </label>
          <div className="flex flex-row items-center relative input__login" style={{ padding: '0' }} onBlur={() => handleClickOutsideCategories()} tabIndex={0}>
            <div className="absolute inset-y-0 right-0 flex items-center pl-3 pointer-events-none">
              <svg width="24" height="24" viewBox="0 5 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M67 20l0 -10" /><path d="M12 20l4 -4" /><path d="M12 20l-4 -4" /><path d="M1 4l16 0" />
              </svg>
            </div>
            <div
              className="w-full h-full flex items-center text-start text-black cursor-pointer px-3"
              onClick={() => setIsOpenCategories(!isOpenCategories)}
            >
              {selectedCategories.length === 0
                ? 'Selecciona opciones'
                : selectedCategories.join(', ')}
            </div>

            {isOpenCategories && optionsCategories.length > 0 && (
              <div className="absolute text-black z-10 mt-1 top-8 w-full border rounded bg-white shadow max-h-60 overflow-y-auto">
                {optionsCategories.map((option) => (
                  <label
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategories(option);
                    }}
                    key={option.id}
                    className="relative z-20 flex items-center p-2 text-black hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(option.category)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleCategories(option);
                      }}
                      className="mr-2 relative z-10 cursor-pointer"
                    />
                    {option.category}
                  </label>
                ))}
              </div>
            )}
          </div>


          <div className="cntr-label__login">
            <p className="label__login">Liga Local</p>
            <div className="subcntr-label__login">
              <label className="label__login">
                Sí
                <input
                  type="radio"
                  name="local_league"
                  className="radio-input__login"
                  value="si"
                  onChange={(e) => handleLocalLeague(e)}
                  checked={context.registerClub.local_league == 1}
                />
              </label>
              <label className="label__login">
                No
                <input
                  type="radio"
                  name="local_league"
                  className="radio-input__login"
                  value="no"
                  onChange={(e) => handleLocalLeague(e)}
                  checked={context.registerClub.local_league == 0}
                />
              </label>
            </div>
          </div>
          <div className="cntr-label__login">
            <p className="label__login">Torneo Nacional</p>
            <div className="subcntr-label__login">
              <label className="label__login">
                Sí
                <input
                  type="radio"
                  name=" national_tournament"
                  className="radio-input__login"
                  value="si"
                  onChange={(e) => handleNationalLeague(e)}
                  checked={context.registerClub.national_tournament == 1}
                />
              </label>
              <label className="label__login">
                No
                <input
                  type="radio"
                  name=" national_tournament"
                  className="radio-input__login"
                  value="no"
                  onChange={(e) => handleNationalLeague(e)}
                  checked={context.registerClub.national_tournament == 0}
                />
              </label>
            </div>
          </div>

          <div className="flex-col gap-2 flex">
            <button onClick={() => nextStep()} className="button-three__login">
              Siguiente
            </button>
            <button
              className="link__login center-text__login"
              onClick={() => navigate("/register/club/step-two")}
            >
              Regresar
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
