import UserInfo from "./user-info/user-info.jsx";
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import Example from "../../assets/img/example-img.png";
import { LogoHeader } from "../../utils/icons/icons";
import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
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

  const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [deviceType, setDeviceType] = useState("desktop");

  const changeBtnInfoUser = useMemo(() => {
    switch (deviceType) {
      case "mobile":
        return { show: true };
      case "tablet":
        return { show: true };
      default:
        return { show: false };
    }
  }, [deviceType]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setDeviceType("mobile");
      } else if (width > 768 && width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const getPermissions = useCallback(async () => {
    if (permissionsSystem.length > 0) return;
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
    user,
    permissionsSystem.length,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    getPermissions();
  }, [user, isVisible]);

  if (!user || Object.keys(user).length === 0) {
    return <div className="relative bg-transparent top-0 left-0"></div>;
  }

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-7xl">
        <div
          className={`mx-auto flex h-15 items-center justify-between rounded-full px-6 shadow-lg backdrop-blur-sm transition-all duration-300 ${
            scrolled ? "bg-black/40" : "bg-black/80"
          }`}
        >
          <Link className="select-none text-xl font-bold" to={"/"}>
            <LogoHeader />
            {/* {data.logo == "" ? (
              <ImageLogo style={{ maxWidth: "50px" }} alt="Logo" />
            ) : (
              <img
                src={data.logo}
                alt="logo D10"
                className="logo max-w-[50px]"
              />
            )} */}
          </Link>
          <div className="hidden space-x-8 md:flex">
            {permissionsSystem?.length > 0 &&
              permissionsSystem.map((permission) => (
                <span
                  key={permission.permission_id ?? permission.id_permission}
                  className="text-sm uppercase tracking-wider hover:text-gray-300"
                >
                  <Link to={permission.link}>
                    {permission.description_permission}
                  </Link>
                </span>
              ))}
          </div>

          {/* Start btn menu */}

          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">
              {isMenuOpen ? "Close menu" : "Open menu"}
            </span>
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>

          {/* End btn menu */}

          {/* Start btn user info */}

          {changeBtnInfoUser.show ? (
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground h-10 w-fit md:hidden"
              onClick={() => setModalIsOpenTwo(true)}
            >
              <div className="w-fit h-full">
                <img
                  src={Example}
                  alt="img"
                  className="w-full h-full rounded"
                />
              </div>
              &nbsp;
              <p>{user?.first_names ?? user?.president}</p>
            </button>
          ) : (
            <button
              className="justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background
            transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none
            [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 hidden md:flex items-center border-white/20
            hover:bg-white hover:text-black"
              onClick={toggleVisibility}
            >
              <div className="w-fit h-full">
                <img
                  src={Example}
                  alt="img"
                  className="w-full h-full rounded"
                />
              </div>
              &nbsp;
              <p>{user?.first_names ?? user?.president}</p>
            </button>
          )}

          {/* End btn user info */}

          {/* Start user info */}

          <div className={`info-user ${isVisible ? "visible" : ""}`}>
            <div className="cntr-one-item__info-user">
              <div className="cntr-img__button-nav">
                <img src={Example} alt="img" className="img__info-user" />
              </div>
              <div className="items__info-user">
                <p className="text__info-user">
                  {user?.first_names ?? user?.name_club}{" "}
                  {user?.last_names ?? ""}
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
              <Link to={`/change-pass`} className="text__info-user">
                Cambiar contraseña
              </Link>
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

          {/* End user info */}
        </div>

        <UserInfo
          isOpen={modalIsOpenTwo}
          onClose={() => setModalIsOpenTwo(false)}
          imgExample={Example}
          userInfo={user}
          closeUserInfo={closeSession}
        ></UserInfo>
      </nav>

      {/* Start menu info */}

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col bg-black pt-16 md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            {permissionsSystem?.length > 0 &&
              permissionsSystem.map((permission) => (
                <span
                  key={permission.permission_id ?? permission.id_permission}
                  className="border-b border-zinc-800 py-3 text-lg font-medium"
                >
                  <Link to={permission.link}>
                    {permission.description_permission}
                  </Link>
                </span>
              ))}
          </div>
        </div>
      )}

      {/* End menu info */}
    </>
  );
}
