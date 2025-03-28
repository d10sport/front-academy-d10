import AWSContext from "./aws-context";
import PropTypes from 'prop-types';
import axios from 'axios';

const AppProviderAWS = ({ children }) => {
  AppProviderAWS.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const urlApi = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  async function fetchFiles(rute){
    const data = await axios.get(`${urlApi}external/g/s3/${rute}`,
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
        return response.data.url;
      })
      .catch(() => {
        console.error('Error al obtener los paises');
      });
    return data;
  }

  return (
    <AWSContext.Provider value={{
      urlApi,
      apiKey,
      fetchFiles
    }}>
      {children}
    </AWSContext.Provider>
  );
};

export default AppProviderAWS;