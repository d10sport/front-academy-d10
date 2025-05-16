import Loader from "../../ui/loaders/fake-load/loader.fake.jsx";
import { useState, useEffect, useContext } from "react";
import AppContext from "@context/app/app-context";
import { toast } from "sonner";
import axios from "axios";
import "./club-request.css";

export default function ClubRequest() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [visibleDetails, setVisibleDetails] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // ------------- Obtención de Usuario --------------

  const [menuItems, setMenuItems] = useState([]);

  function getDateUser() {
    axios
      .get(`${urlApi}academy/solitude/register/users/coach`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (response.data?.data?.length > 0) {
          setMenuItems(response.data.data);
        } else {
          console.warn("No se encontraron datos");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }

  // ------------ Aprobación de Usuario -------------

  function approveUser(item) {
    setDisabled(true);

    toast.promise(
      axios
        .post(
          `${urlApi}academy/solitude/approved`,
          {
            id_solitude: item.id_solitude,
            id_user: item.id_user,
            role_user: item.role_user,
            nombre: item.nombre,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
          }
        )
        .then((response) => {
          if (response.data?.success) {
            // setDisabled(false);
            setMenuItems((prevMenuItems) =>
              prevMenuItems.filter(
                (menuItem) => menuItem.id_solitude !== item.id_solitude
              )
            );
            return `Has aprobado a '${item.nombre}'`;
          } else {
            throw new Error(
              "No se pudo aprobar al club: " + response.data.message
            );
          }
        }),
      {
        loading: "Denegando club...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de aprobación",
      }
    );
  }

  // ---------- Denegación de Usuario --------------

  function denyUser(item) {
    setDisabled(true);

    toast.promise(
      axios
        .post(
          `${urlApi}academy/solitude/denied`,
          {
            id_solitude: item.id_solitude,
            id_user: item.id_user,
            role_user: item.role_user,
            nombre: item.nombre,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
          }
        )
        .then((response) => {
          if (response.data?.success) {
            // setDisabled(false);
            setMenuItems((prevMenuItems) =>
              prevMenuItems.filter(
                (menuItem) => menuItem.id_solitude !== item.id_solitude
              )
            );
            return `Has denegado a '${item.nombre}'`;
          } else {
            throw new Error(
              "No se pudo denegar al club: " + response.data.message
            );
          }
        }),
      {
        loading: "Denegando club...",
        success: (msg) => msg,
        error: (err) => err.message || "Error en la solicitud de denegación",
      }
    );
  }

  useEffect(() => {
    getDateUser();
  }, []);

  // ---------------------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);

  const handleUFakeLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    handleUFakeLoad();
  }, []);

  const toggleDetails = (id) => {
    setVisibleDetails((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="menu-container__request">
          <h1 className="title__request primary--color__request">
            Solicitudes de registro
          </h1>
          <div className="menu-list__request">
            {menuItems.map((item) => (
              <div key={item.id_solitude} className="menu-item__request">
                <div
                  className={`menu-header__request ${
                    visibleDetails === item.id_solitude ? "active" : ""
                  }`}
                  onClick={() => toggleDetails(item.id_solitude)}
                >
                  <span>{item.nombre}</span>
                  <span className="primary--color__request">
                    Haga clic para más detalles
                  </span>
                </div>

                {visibleDetails === item.id_solitude && (
                  <div className="menu-details__request">
                    <p className="text__request">
                      <strong>ID de Solicitud:</strong> {item.id_solitude}
                    </p>
                    <p className="text__request">
                      <strong>ID de Usuario:</strong> {item.id_user}
                    </p>
                    <p className="text__request">
                      <strong>Nombre:</strong> {item.nombre}
                    </p>
                    <p className="text__request">
                      <strong>Ocupación:</strong> {item.role_user}
                    </p>
                    <div className="menu-actions__request">
                      {/* <button
                      className="button__request accept__request"
                      onClick={() => alert(`Has aceptado a '${item.nombre}' `)}
                    >
                      Aceptar
                    </button> */}

                      <button
                        className="button__request accept__request"
                        onClick={() => approveUser(item)}
                        disabled={disabled}
                      >
                        {disabled ? "Procesando..." : "Aceptar"}
                      </button>

                      <button
                        className="button__request deny__request"
                        onClick={() => denyUser(item)}
                        disabled={disabled}
                      >
                        {disabled ? "Procesando..." : "Denegar"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
