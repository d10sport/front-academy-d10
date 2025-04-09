import { useContext, useEffect, useState, useCallback } from "react";
import Example from "../../assets/img/example-img.png";
import { LogoHeader } from "../../utils/icons/icons";
import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "./header.css";

export default function Header() {
  const {
    user,
    permissionsUser,
    fetchPermissionsUser,
    fetchUser,
    fetchPermissionsRoles,
    closeSession,
  } = useContext(AppContext);
  const [permissionsSystem, setPermissionsSystem] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const getPermissions = useCallback(async () => {
    let userPermissions = permissionsUser;
    if (userPermissions?.length === 0 || userPermissions == undefined) {
      userPermissions = await fetchPermissionsUser();
    }
    const allPermissions = await fetchPermissionsRoles();
    let role_user = user?.id_role;
    if (role_user == undefined) {
      const { id_role } = await fetchUser();
      role_user = id_role;
    }

    if (
      allPermissions == undefined ||
      userPermissions == undefined ||
      (allPermissions.length == 0 && userPermissions.length > 0)
    ) {
      setPermissionsSystem(userPermissions);
      return;
    }

    const filteredPermissions = allPermissions.filter((permissionSystem) =>
      userPermissions.some(
        (permissionUser) =>
          permissionUser.id_permission === permissionSystem.permission_id &&
          permissionSystem.role_id == role_user
      )
    );

    setPermissionsSystem(filteredPermissions);
  }, [
    permissionsUser,
    fetchPermissionsUser,
    fetchPermissionsRoles,
    fetchUser,
    user?.id_role,
  ]);

  useEffect(() => {
    getPermissions();
  }, [getPermissions, isVisible]);

  if (!user || Object.keys(user).length === 0) {
    return <div className="relative bg-transparent top-0 left-0"></div>;
  }

  return (
    <nav id="nav_header" className="nav">
      <LogoHeader />
      <ul className="list__nav">
        {permissionsSystem?.length > 0 &&
          permissionsSystem.map((permission) => (
            <li
              key={permission.permission_id ?? permission.id_permission}
              className="item__nav"
            >
              <Link to={permission.link}>
                {permission.description_permission}
              </Link>
            </li>
          ))}
      </ul>

      <button className="button__button-nav" onClick={toggleVisibility}>
        <p>{user?.first_names ?? user?.president}</p>
        <div className="cntr-img__button-nav">
          <img src={Example} alt="img" className="img__button-nav" />
        </div>
      </button>

      <div className={`info-user ${isVisible ? "visible" : ""}`}>
        <div className="cntr-one-item__info-user">
          <div className="cntr-img__button-nav">
            <img src={Example} alt="img" className="img__info-user" />
          </div>
          <div className="items__info-user">
            <p className="text__info-user">
              {user?.first_names ?? user?.name_club} {user?.last_names ?? ""}
            </p>
          </div>
        </div>

        <div className="cntr-two-item__info-user">
          <h1 className="title__info-user">Información de usuario</h1>
          <p className="text__info-user">
            <b>Nombre: </b> {user?.first_names ?? user?.president}{" "}
            {user?.last_names ?? ""}
          </p>
          <p className="text__info-user">
            <b>Email: </b> {user?.email}
          </p>
          <p className="text__info-user">
            <b>Rol: </b>{" "}
            {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
          </p>
          <p className="text__info-user">
            <b>Club: </b> {user?.club?.name_club ?? user?.name_club}
          </p>
        </div>

        <div className="cntr-three-item__info-user">
          <button
            onClick={() => {
              toggleVisibility();
              closeSession();
              toast.success("Sesión cerrada correctamente");
            }}
            className="button__info-user"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
}
