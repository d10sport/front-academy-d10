import { useState, useContext } from "react";
import AppContext from "@context/app/app-context";
import axios from "axios";

export default function Upload() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const postFile = async () => {
    if (!file) {
      setMessage("Por favor, selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("page", "academy");

    try {
      const response = await axios.post(`${urlApi}external/p/s3/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "api-key": apiKey,
        },
      });
      setMessage(`Archivo subido exitosamente: ${response.data.fileUrl}`);
    } catch (error) {
      setMessage(
        `Error al subir el archivo: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={postFile}>Subir Archivo</button>
      {message && <p>{message}</p>}
    </div>
  );
}
