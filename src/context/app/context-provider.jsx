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
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  const [typeUser, setTypeUser] = useState('');
  const [token, setToken] = useState(getToken());
  const [loadingAuth, setLoadingAuth] = useState(false);

  const [dataHeader, setDataHeader] = useState({
    logo: '',
    bg_photo: '',
    navStyle: {}
  });

  const [dataFooter, setDataFooter] = useState({
    logo: '',
    bg_photo: ''
  });

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

  async function fetchDeleteToken(){
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
    navigate("/login-user");
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
      setTypeUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;