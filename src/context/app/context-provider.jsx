import {
  getToken,
  updateToken,
  deleteToken,
  getDataToken,
} from "@lib/token/token-user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppContext from "./app-context";
import PropTypes from "prop-types";
import axios from "axios";

const AppProvider = ({ children }) => {
  AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const urlApi = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiKeyRapidApi = import.meta.env.VITE_RAPIDAPI_API_KEY;
  const apiHostRapidIntagram = import.meta.env.VITE_API_HOST_RAPID_INSTAGRAM;
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [permissionsUser, setPermissionsUser] = useState([]);
  const [token, setToken] = useState(getToken());
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [typeUser, setTypeUser] = useState({
    role_id: 0,
    name_role: "",
    description_role: "",
  });

  const [roleSystem, setRoleSystem] = useState([
    {
      id: 0,
      name_role: "",
      description_role: "",
      created_at: "",
    },
  ]);

  const [registerAthlete, setRegisterAthlete] = useState({
    first_names: "",
    last_names: "",
    gender: "",
    date_birth: "",
    country: "",
    countryID: "",
    city: "",
    cityID: "",
    contact: 0,
    mail: "",
    social_networks: {},
    academic_level: "",
    first_names_family: "",
    last_names_family: "",
    contact_family: 0,
    categories: []
  });

  const [registerCoach, setRegisterCoach] = useState({
    first_names: "",
    last_names: "",
    gender: "",
    date_birth: "",
    country: "",
    countryID: "",
    city: "",
    cityID: "",
    id_club: 0,
    current_club: "",
    contact: 0,
    mail: "",
    social_networks: {},
    academic_level: "",
    licenses_obtained: "",
    other: "",
  });

  const [registerClub, setRegisterClub] = useState({
    name_club: "",
    date_founded: "",
    country: "",
    countryID: "",
    city: "",
    cityID: "",
    president: "",
    comet: 0,
    contact: 0,
    mail: "",
    social_networks: {},
    website: "",
    number_athletes: "",
    categories: [],
    local_league: "",
    national_tournament: "",
    number_coaches: 0,
    assistants: 0,
    venues: 0
  });

  const [dataHeader, setDataHeader] = useState({
    logo: "",
    bg_photo: "",
    navStyle: {},
  });

  const [dataFooter, setDataFooter] = useState({
    logo: "",
    bg_photo: "",
  });

  const [dataMaintenance, setDataMaintenance] = useState({
    active: false,
    title: "",
    subtitle: "",
    description: "",
    bg_photo: "",
  });

  function clearRegisterAthlete() {
    setRegisterAthlete({
      first_names: "",
      last_names: "",
      gender: "",
      date_birth: "",
      country: "",
      countryID: "",
      city: "",
      cityID: "",
      contact: 0,
      mail: "",
      social_networks: {},
      academic_level: "",
      first_names_family: "",
      last_names_family: "",
      contact_family: 0,
      categories: [],
    });
  }

  function clearRegisterCoach() {
    setRegisterCoach({
      first_names: "",
      last_names: "",
      gender: "",
      date_birth: "",
      country: "",
      countryID: "",
      city: "",
      cityID: "",
      id_club: 0,
      current_club: "",
      contact: 0,
      mail: "",
      social_networks: {},
      academic_level: "",
      licenses_obtained: "",
      other: "",
    });
  }

  function clearRegisterClub() {
    setRegisterClub({
      name_club: "",
      date_founded: "",
      country: "",
      countryID: "",
      city: "",
      cityID: "",
      president: "",
      comet: 0,
      contact: 0,
      mail: "",
      social_networks: {},
      website: "",
      number_athletes: "",
      categories: [],
      local_league: "",
      national_tournament: "",
      number_coaches: 0,
      assistants: 0,
      venues: 0
    });
  }

  async function validateEmptyAthlete() {
    if (
      registerAthlete.first_names != "" &&
      registerAthlete.last_names != "" &&
      registerAthlete.mail != "" &&
      registerAthlete.gender != "" &&
      registerAthlete.date_birth != "" &&
      registerAthlete.country != "" &&
      registerAthlete.countryID != "" &&
      registerAthlete.city != "" &&
      registerAthlete.cityID != "" &&
      registerAthlete.contact != 0 &&
      registerAthlete.academic_level != "" &&
      registerAthlete.first_names_family != "" &&
      registerAthlete.last_names_family != "" &&
      registerAthlete.contact_family != 0 &&
      registerAthlete.categories.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function validateEmptyCoach() {
    if (
      registerCoach.first_names != "" &&
      registerCoach.last_names != "" &&
      registerCoach.mail != "" &&
      registerCoach.gender != "" &&
      registerCoach.date_birth != "" &&
      registerCoach.country != "" &&
      registerCoach.countryID != "" &&
      registerCoach.current_club != "" &&
      registerCoach.id_club != 0 &&
      registerCoach.city != "" &&
      registerCoach.cityID != "" &&
      registerCoach.contact != 0 &&
      registerCoach.academic_level != ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function validateEmptyClub() {
    if (
      registerClub.name_club != "" &&
      registerClub.date_founded != "" &&
      registerClub.country != "" &&
      registerClub.countryID != "" &&
      registerClub.city != "" &&
      registerClub.cityID != "" &&
      registerClub.president != "" &&
      registerClub.contact != 0 &&
      registerClub.mail != "" &&
      registerClub.number_athletes != 0 &&
      registerClub.categories.length > 0 &&
      registerClub.local_league !== "" &&
      registerClub.national_tournament !== "" &&
      registerClub.number_coaches != 0 &&
      registerClub.assistants != 0 &&
      registerClub.venues != 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  async function fetchToken() {
    const token = await getToken();
    const url = window.location.hash;
    if (!token && url !== "#/login-admin") {
      navigate("/login-user");
    }
    const dataToken = await fetchGetDataToken();
    setPermissionsUser(dataToken.permissions);
    delete dataToken.permissions;
    setUser(dataToken);
    setToken(token);

    setTimeout(() => {
      getElementHeader();
    }, 500);
  }

  async function fetchGetDataToken() {
    const dataToken = await getDataToken();
    if (!dataToken) {
      return dataToken;
    }
    return dataToken;
  }

  async function fetchUpdateToken(token) {
    const update = await updateToken(token);
    setToken(token);
    if (!update) {
      navigate("/login-user");
    }
  }

  async function fetchDeleteToken() {
    const deleteT = deleteToken();
    setToken(null);
    if (!deleteT) {
      navigate("/login-user");
    }
  }

  async function fetchPermissionsRoles() {
    const data = await axios
      .get(`${urlApi}academy/permissions/roles`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (!response.data?.success) {
          console.error(`${response.data.message}`);
          return;
        }
        return response.data.data;
      })
      .catch(() => {
        console.error("Error al obtener los permisos");
        setDataMaintenance({
          active: true,
          title: "D10 Academy",
          subtitle: "!!Llegaremos pronto!!",
          description: "Estamos trabajando para mejorar tu experiencia",
          bg_photo: "/assets/fondo_home_d10_academy.png",
        });
      });
    return data;
  }

  async function fetchRoleUsers() {
    const data = await axios
      .get(`${urlApi}academy/g/role`, {
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
        return response.data.data;
      })
      .catch(() => {
        console.error("Error al obtener los paises");
      });
    return data;
  }

  async function fetchLoginUsers(id_user) {
    const data = await axios
      .get(`${urlApi}academy/config/user/g/login/${id_user}`, {
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
        return response.data.data;
      })
      .catch(() => {
        console.error("Error al obtener los paises");
      });
    return data;
  }

  async function fetchPermissionsUser() {
    const userData = await fetchGetDataToken();
    setPermissionsUser(userData.permissions);
    return userData.permissions;
  }

  async function fetchUser() {
    const userData = await fetchGetDataToken();
    delete userData.permissions;
    setUser(userData);
    return userData;
  }

  async function openSession(data) {
    await fetchUpdateToken(data.token);
    const userData = await fetchGetDataToken();
    setPermissionsUser(userData.permissions);
    delete userData.permissions;
    setUser(userData);
    navigate("/");
  }

  async function closeSession() {
    setPermissionsUser([]);
    setUser([]);
    fetchDeleteToken();
    navigate("/login-user");
  }

  const getElementHeader = () => {
    const rute = window.location.hash;
    const header = document.getElementById("header_academy");
    if (header.classList.contains("hidden") && !rute.includes("#/class/")) {
      header.classList.remove("hidden");
    } else if(rute.includes("#/class/") && !header.classList.contains("hidden")) {
      header.classList.add("hidden");
    }
  }

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <AppContext.Provider
      value={{
        urlApi,
        apiKey,
        dataHeader,
        setDataHeader,
        dataFooter,
        setDataFooter,
        token,
        setToken,
        fetchToken,
        fetchUpdateToken,
        fetchDeleteToken,
        openSession,
        closeSession,
        user,
        setUser,
        loadingAuth,
        setLoadingAuth,
        isLoading,
        setIsLoading,
        typeUser,
        setTypeUser,
        permissionsUser,
        setPermissionsUser,
        registerAthlete,
        setRegisterAthlete,
        validateEmptyAthlete,
        clearRegisterAthlete,
        registerCoach,
        setRegisterCoach,
        validateEmptyCoach,
        clearRegisterCoach,
        registerClub,
        setRegisterClub,
        validateEmptyClub,
        clearRegisterClub,
        apiKeyRapidApi,
        apiHostRapidIntagram,
        roleSystem,
        setRoleSystem,
        fetchRoleUsers,
        fetchPermissionsRoles,
        fetchPermissionsUser,
        fetchUser,
        fetchLoginUsers,
        dataMaintenance,
        setDataMaintenance,
        getElementHeader
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
