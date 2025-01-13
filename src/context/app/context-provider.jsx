import { getToken, updateToken, deleteToken } from "@lib/token/token";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "./app-context";
import PropTypes from 'prop-types';

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
  const [typeUser, setTypeUser] = useState('');
  const [token, setToken] = useState(getToken());
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [registerAthlete, setRegisterAthlete] = useState({
    first_names: '',
    last_names: '',
    gender: '',
    date_birth: '',
    country: '',
    countryID: '',
    city: '',
    cityID: '',
    current_club: '',
    contact: 0,
    mail: '',
    social_networks: '',
    academic_level: '',
    first_names_family: '',
    last_names_family: '',
    contact_family: 0,
    coach: '',
    id_coach: 0
  })

  const [registerCoach, setRegisterCoach] = useState({
    first_names: '',
    last_names: '',
    gender: '',
    date_birth: '',
    country: '',
    countryID: '',
    city: '',
    cityID: '',
    id_club: 0,
    current_club: '',
    contact: 0,
    mail: '',
    social_networks: '',
    academic_level: '',
    licenses_obtained: '',
    other: ''
  })

  const [dataHeader, setDataHeader] = useState({
    logo: '',
    bg_photo: '',
    navStyle: {}
  });

  const [dataFooter, setDataFooter] = useState({
    logo: '',
    bg_photo: ''
  });

  function clearRegisterAthlete() {
    setRegisterAthlete({
      first_names: '',
      last_names: '',
      gender: '',
      date_birth: '',
      country: '',
      countryID: '',
      city: '',
      cityID: '',
      current_club: '',
      contact: 0,
      mail: '',
      social_networks: '',
      academic_level: '',
      first_names_family: '',
      last_names_family: '',
      contact_family: 0,
      coach: '',
      id_coach: 0
    })
  }

  function clearRegisterCoach() {
    setRegisterCoach({
      first_names: '',
      last_names: '',
      gender: '',
      date_birth: '',
      country: '',
      countryID: '',
      city: '',
      cityID: '',
      id_club: 0,
      current_club: '',
      contact: 0,
      mail: '',
      social_networks: '',
      academic_level: '',
      licenses_obtained: '',
      other: ''
    })
  }

  async function validateEmptyAthlete() {
    if (registerAthlete.first_names != '' &&
      registerAthlete.last_names != '' &&
      registerAthlete.mail != '' &&
      registerAthlete.gender != '' &&
      registerAthlete.date_birth != '' &&
      registerAthlete.country != '' &&
      registerAthlete.countryID != '' &&
      registerAthlete.city != '' &&
      registerAthlete.cityID != '' &&
      registerAthlete.contact != 0 &&
      registerAthlete.social_networks != '' &&
      registerAthlete.academic_level != '' &&
      registerAthlete.first_names_family != '' &&
      registerAthlete.last_names_family != '' &&
      registerAthlete.contact_family != 0 &&
      registerAthlete.coach != '' &&
      registerAthlete.id_coach != 0) {
      return true
    } else {
      return false
    }
  }

  async function validateEmptyCoach() {
    if (registerCoach.first_names != '' &&
      registerCoach.last_names != '' &&
      registerCoach.mail != '' &&
      registerCoach.gender != '' &&
      registerCoach.date_birth != '' &&
      registerCoach.country != '' &&
      registerCoach.countryID != '' &&
      registerCoach.current_club != '' &&
      registerCoach.id_club != 0 &&
      registerCoach.city != '' &&
      registerCoach.cityID != '' &&
      registerCoach.contact != 0 &&
      registerCoach.social_networks != '' &&
      registerCoach.academic_level != '' &&
      registerCoach.licenses_obtained != '' &&
      registerCoach.other != '') {
      return true
    } else {
      return false
    }
  }

  async function fetchToken() {
    const token = await getToken();
    if (!token) {
      navigate("/login-user");
    }
    setToken(token);
  }

  async function fetchUpdateToken(token) {
    const update = updateToken(token);
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

  async function openSession(data) {
    setUser(data.user);
    fetchUpdateToken(data.token);
    navigate("/");
  }

  async function closeSession() {
    setUser([]);
    fetchDeleteToken();
    navigate('/login-user');
  }

  useEffect(() => {
    fetchToken();
  }, [token]);

  return (
    <AppContext.Provider value={{
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
      typeUser,
      setTypeUser,
      registerAthlete,
      setRegisterAthlete,
      validateEmptyAthlete,
      clearRegisterAthlete,
      registerCoach,
      setRegisterCoach,
      validateEmptyCoach,
      clearRegisterCoach,
      apiKeyRapidApi,
      apiHostRapidIntagram
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;