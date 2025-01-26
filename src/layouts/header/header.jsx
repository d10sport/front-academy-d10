import { LogoHeader } from "../../utils/icons/icons";
import AppContext from "@context/app/app-context";
import { useContext, useState } from "react";
import "./header.css";
import { toast } from "sonner";

export default function Header() {
  const context = useContext(AppContext);
  const user = context.user;

  function closeSession() {
    context.closeSession();
    toast.success("Sesión cerrada correctamente");
  }

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {user.length == 0 ? (
        <div className="relative bg-transparent top-0 left-0"></div>
      ) : (
        <nav id="nav_header" className="nav">
          <LogoHeader />
          <ul className="list__nav">
            <div></div>
          </ul>
          {/*  */}

          <button className="button__button-nav" onClick={toggleVisibility}>
            <img src="" alt="img" className="img__button-nav" />
            <p>Nombre</p>
          </button>

          <div className={`info-user ${isVisible ? "visible" : ""}`}>
            <div className="cntr-items__info-user border-button height-md--info-user">
              <img src="" alt="img" className="img__info-user" />
              <div className="items__info-user">
                <p className="text__info-user">Nombre</p>
                <p className="text__info-user">Email@example.com</p>
              </div>
            </div>
            <div className="cntr-items__info-user border-button height-lg--info-user flex-column--info-user padding--info-user">
              <h1 className="title__info-user">Info</h1>
              <p className="text__info-user">
                <b>Nombre: </b>Example Example
              </p>
              <p className="text__info-user">
                <b>Email: </b>Email@example.com
              </p>
              <p className="text__info-user">
                <b>Rol: </b>Deportista
              </p>
              <p className="text__info-user">
                <b>Club: </b>Club Club
              </p>
            </div>
            <div className="cntr-items__info-user height-sm--info-user">
              <button onClick={closeSession} className="button__info-user">
                Log out
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
