import { getToken, updateToken, deleteToken, getDataToken } from "@lib/token/token";
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
    id_club: 0,
    contact: 0,
    mail: '',
    social_networks: '',
    academic_level: '',
    first_names_family: '',
    last_names_family: '',
    contact_family: 0,
    coach: '',
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

  const [registerClub, setRegisterClub] = useState({
    name_club: '',
    date_founded: '',
    country: '',
    countryID: '',
    city: '',
    cityID: '',
    president: '',
    comet: 0,
    contact: 0,
    mail: '',
    social_networks: '',
    website: '',
    number_athletes: '',
    categories: '',
    local_league: '',
    national_tournament: '',
    u13_u15_u17_u20: '',
    number_coaches: 0,
    assistants: 0,
    interns: 0,
    venues: 0,
    sites: 0
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
      id_club: 0
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

  function clearRegisterClub() {
    setRegisterClub({
      name_club: '',
      date_founded: '',
      country: '',
      countryID: '',
      city: '',
      cityID: '',
      president: '',
      comet: 0,
      contact: 0,
      mail: '',
      social_networks: '',
      website: '',
      number_athletes: '',
      categories: '',
      local_league: '',
      national_tournament: '',
      u13_u15_u17_u20: '',
      number_coaches: 0,
      assistants: 0,
      interns: 0,
      venues: 0,
      sites: 0
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
      registerAthlete.current_club != '' &&
      registerAthlete.id_club != 0) {
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

  async function validateEmptyClub(){
    if (registerClub.name_club != '' &&
      registerClub.date_founded != '' &&
      registerClub.country != '' &&
      registerClub.countryID != '' &&
      registerClub.city != '' &&
      registerClub.cityID != '' &&
      registerClub.president != '' &&
      registerClub.comet != 0 &&
      registerClub.contact != 0 &&
      registerClub.mail != '' &&
      registerClub.social_networks != '' &&
      registerClub.website != '' &&
      registerClub.number_athletes != 0 &&
      registerClub.categories != '' &&
      registerClub.local_league !== '' &&
      registerClub.national_tournament !== '' &&
      registerClub.u13_u15_u17_u20 != '' &&
      registerClub.number_coaches != 0 &&
      registerClub.assistants != 0 &&
      registerClub.interns != 0 &&
      registerClub.venues != 0 &&
      registerClub.sites != 0) {
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
    const dataToken = await fetchGetDataToken();
    setUser(dataToken);
    setToken(token);
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

  async function openSession(data) {
    await fetchUpdateToken(data.token);
    const userData = await fetchGetDataToken();
    setUser(userData);
    navigate("/");
  }

  async function closeSession() {
    setUser([]);
    fetchDeleteToken();
    navigate('/login-user');
  }

  useEffect(() => {
    fetchToken();
  }, []);

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
      registerClub,
      setRegisterClub,
      validateEmptyClub,
      clearRegisterClub,
      apiKeyRapidApi,
      apiHostRapidIntagram
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;