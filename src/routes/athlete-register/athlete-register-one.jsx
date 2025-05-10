import { useContext, useState, useEffect, useCallback } from "react";
import AppContext from "@context/app/app-context";
import { useNavigate } from "react-router-dom";
import "./athlete-register.css";
import { toast } from "sonner";
import axios from "axios";

export default function AthleteRegisterOne() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState('');
  const [optionsCategories, setOptionsCategories] = useState([]);

  function handleName(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      first_names: event.target.value,
    }));
  }

  function handleLastName(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      last_names: event.target.value,
    }));
  }

  function handleGender(event) {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      gender: event.target.value,
    }));
  }

  function handleDateBirth(event) {
    const age = calculateAge(event.target.value);
    if (age < 0) {
      toast.error("La fecha de nacimiento no puede ser futura");
      context.setRegisterAthlete((prev) => ({
        ...prev,
        date_birth: "",
      }));
      return;
    }
    if (age < 6) {
      toast.error("El atleta debe tener al menos 6 años");
      context.setRegisterAthlete((prev) => ({
        ...prev,
        date_birth: "",
      }));
      return;
    }
    context.setRegisterAthlete((prev) => ({
      ...prev,
      date_birth: event.target.value,
    }));
    if (age >= 6) {
      const filterdCategoriByAge = optionsCategories.filter(cat => cat.category == "sub" + age);
      if (filterdCategoriByAge.length > 0) {
        handleCategories(filterdCategoriByAge[0]);
      } else {
        toast.error("No existe una categoría para esta edad");
      }
    }
  }

  function handleCategories(option) {
    const name_category = option.category;
    const id_category = option.id;

    setSelectedCategories(name_category);
    context.setRegisterAthlete((prev) => {
      const exists = prev.categories.some((cat) => cat.id === id_category);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((cat) => cat.id !== id_category)
          : [...prev.categories, { id: id_category, category: name_category }],
      };
    });
  }

  const calculateAge = (date) => {
    const birth = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

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

  function nextStep() {
    context.setRegisterAthlete((prev) => ({
      ...prev,
      role: context.typeUser,
    }));
    if (
      !context.registerAthlete.first_names ||
      !context.registerAthlete.last_names ||
      !context.registerAthlete.gender ||
      !context.registerAthlete.date_birth ||
      context.registerAthlete.categories.length == 0
    ) {
      toast.error("Por favor, complete todos los campos");
      return;
    }
    navigate("/register/athlete/step-two");
  }

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <>
      <section className="section__login">
        <div className="form__login">
          <h1 className="title__login">D10+ Academy</h1>
          <h2 className="subtitle__login">
            Regístrate como{" "}
            <span className="text-decoration__login">
              {context.typeUser.name_role}
            </span>
          </h2>
          <div className="cntr-img__login">
            <img
              src={
                new URL(
                  `../../assets/img/${context.typeUser.description_role}.png`,
                  import.meta.url
                ).href
              }
              alt="img"
              className="img__login"
            />
          </div>

          <label htmlFor="name" className="label__login cursor-pointer">
            Nombres
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            className="input__login"
            placeholder="Nombre"
            value={context.registerAthlete.first_names}
            onChange={(e) => handleName(e)}
          />

          <label htmlFor="lastname" className="label__login cursor-pointer">
            Apellidos
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            autoComplete="off"
            className="input__login"
            placeholder="Apellido"
            value={context.registerAthlete.last_names}
            onChange={(e) => handleLastName(e)}
          />

          <label htmlFor="gender" className="label__login cursor-pointer">
            Genero
          </label>
          <select
            id="gender"
            name="gender"
            className="input__login cursor-pointer"
            defaultValue={context.registerAthlete.gender}
            onChange={(e) => handleGender(e)}
          >
            <option value="" disabled>
              Seleccionar...
            </option>
            <option value="M">Hombre</option>
            <option value="F">Mujer</option>
          </select>

          <label htmlFor="date_birth" className="label__login cursor-pointer">
            Fecha de Nacimiento:
          </label>
          <input
            type="date"
            id="date_birth"
            name="date_birth"
            autoComplete="off"
            className="input__login"
            min="1900-01-01"
            max="2099-12-31"
            value={context.registerAthlete.date_birth}
            onChange={handleDateBirth}
          />

          <label id="categoria" className="label__login">
            Categoría
          </label>
          <div className="flex flex-row items-center relative input__login" style={{ padding: '0' }}>
            {selectedCategories == '' ? (
              <div
                disabled={true}
                className="w-full h-full flex items-center text-start text-black cursor-not-allowed px-3"
              >
                Selecciona tu edad
              </div>
            )
              : (
                <input
                  id="categoria"
                  disabled={true}
                  type="text"
                  autoComplete="off"
                  className="input__login"
                  value={selectedCategories}
                />
              )}
          </div>

          <button onClick={() => nextStep()} className="button-three__login">
            Siguiente
          </button>
          <button
            className="cursor-pointer link__login center-text__login"
            onClick={() => navigate("/login-user")}
          >
            Cancelar
          </button>
        </div>
      </section>
    </>
  );
}
