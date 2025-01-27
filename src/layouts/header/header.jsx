import Example from "../../assets/img/example-img.png";
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

          <button className="button__button-nav" onClick={toggleVisibility}>
            <img src={Example} alt="img" className="img__button-nav" />
            <p>Nombre</p>
          </button>

          <div className={`info-user ${isVisible ? "visible" : ""}`}>
            <div className="cntr-items__info-user border-button height-md--info-user">
              <img src={Example} alt="img" className="img__info-user" />
              <div className="items__info-user">
                <p className="text__info-user">{user?.first_names}</p>
                <p className="text__info-user">{user?.email}</p>
              </div>
            </div>
            <div className="cntr-items__info-user border-button height-lg--info-user flex-column--info-user padding--info-user">
              <h1 className="title__info-user">Información de Usuario</h1>
              <p className="text__info-user">
                <b>Nombre: </b>
                {user?.first_names} {user?.last_names}
              </p>
              <p className="text__info-user">
                <b>Email: </b>
                {user?.email}
              </p>
              <p className="text__info-user">
                <b>Rol: </b>
                {user?.role}
              </p>
              <p className="text__info-user">
                <b>Club: </b>
                {user?.club?.name_club}
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
