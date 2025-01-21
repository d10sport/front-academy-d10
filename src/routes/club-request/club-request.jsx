// import { useState, useEffect, useContext } from "react";
// import photoUser from "@assets/icons/photo_user.png";
// import AppContext from "@context/app/app-context";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import axios from "axios";
import { useState } from "react";
import "./club-request.css";

export default function ClubRequest() {
  const menuItems = [
    {
      id: 1,
      name: "Opción 1",
      email: "user1@example.com",
      occupation: "Atleta",
    },
    {
      id: 2,
      name: "Opción 2",
      email: "user2@example.com",
      occupation: "Atleta",
    },
    {
      id: 3,
      name: "Opción 3",
      email: "user3@example.com",
      occupation: "Entrenador",
    },
  ];

  const [visibleDetails, setVisibleDetails] = useState(null);

  // Alternar visibilidad de los detalles
  const toggleDetails = (id) => {
    setVisibleDetails((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="menu-container__table">
        <h1 className="title__table">Menú Dinámico</h1>
        <div className="menu-list__table">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item__table">
              {/* Encabezado del elemento (clic para mostrar/ocultar detalles) */}
              <div
                className={`menu-header__table ${
                  visibleDetails === item.id ? "active" : ""
                }`}
                onClick={() => toggleDetails(item.id)}
              >
                <span>{item.name}</span>
                <span>Haga clic para más detalles</span>
              </div>

              {/* Detalles del elemento (visible solo si está activo) */}
              {visibleDetails === item.id && (
                <div className="menu-details__table">
                  <p className="text__table">
                    <strong>Nombre:</strong> {item.name}
                  </p>
                  <p className="text__table">
                    <strong>Email:</strong> {item.email}
                  </p>
                  <p className="text__table">
                    <strong>Ocupación:</strong> {item.occupation}
                  </p>
                  <div className="menu-actions__table">
                    <button
                      className="button__table accept__table"
                      onClick={() => alert(`Has aceptado la opción ${item.id}`)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="button__table deny__table"
                      onClick={() => alert(`Has denegado la opción ${item.id}`)}
                    >
                      Denegar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
