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
      <div className="menu-container__request">
        <h1 className="title__request">Menú Dinámico</h1>
        <div className="menu-list__request">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item__request">
              {/* Encabezado del elemento (clic para mostrar/ocultar detalles) */}
              <div
                className={`menu-header__request ${
                  visibleDetails === item.id ? "active" : ""
                }`}
                onClick={() => toggleDetails(item.id)}
              >
                <span>{item.name}</span>
                <span>Haga clic para más detalles</span>
              </div>

              {/* Detalles del elemento (visible solo si está activo) */}
              {visibleDetails === item.id && (
                <div className="menu-details__request">
                  <p className="text__request">
                    <strong>Nombre:</strong> {item.name}
                  </p>
                  <p className="text__request">
                    <strong>Email:</strong> {item.email}
                  </p>
                  <p className="text__request">
                    <strong>Ocupación:</strong> {item.occupation}
                  </p>
                  <div className="menu-actions__request">
                    <button
                      className="button__request accept__request"
                      onClick={() => alert(`Has aceptado la opción ${item.id}`)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="button__request deny__request"
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
