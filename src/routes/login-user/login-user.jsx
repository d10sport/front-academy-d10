import Loader from "../../ui/loaders/fake-load/loader.fake.jsx";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "@context/app/app-context";
import "./login-user.css";

export default function LoginUser() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [roles, setRoles] = useState(context.roleSystem);

  const handleUserSelection = (role) => {
    context.setTypeUser({
      role_id: role.id,
      name_role: role.description_role,
      description_role: role.name_role,
    });
    navigate("/login");
  };

  async function getDataRole() {
    const data = await context.fetchRoleUsers();
    if (data == undefined) {
      return;
    }
    const usersRol = data.splice(data, 3);
    context.setRoleSystem(usersRol);
    setRoles(usersRol);
    context.setIsLoading(false);
  }

  useEffect(() => {
    context.setIsLoading(true);
    getDataRole();
  }, []);

  return (
    <>
      {context.isLoading ? (
        <Loader />
      ) : (
        <section className="section__login-user">
          <div className="cntr-link__login-user">
            {roles.map((role) => (
              <button
                key={role.id}
                id={role.id}
                onClick={() => handleUserSelection(role)}
                className="link__login-user"
              >
                <div className="cntr-title__login-user alt-white-cntr-title--design index--position">
                  <h1 className="title__login-user">{role.description_role}</h1>
                </div>
                <img
                  src={
                    new URL(
                      `../../assets/img/${role.name_role}.png`,
                      import.meta.url
                    ).href
                  }
                  alt={`Img ${role.description_role}`}
                  className="img__login-user"
                />
              </button>
            ))}
          </div>
          <div className="cntr-menu__login-user">
            <div className="cntr-title__login-user alt-black-cntr-title--design cntr-title--responsive">
              <h1 className="title__login-user neon-text--color">
                Iniciar Sesión
              </h1>
            </div>
            <div className="cntr-text__login-user alt-black-cntr-title--design">
              <p className="text__login-user">¿No tienes una cuenta?</p>

              <Link
                to="/register"
                className="text__login-user text--color"
                onClick={() => navigate("/register")}
              >
                Regístrate
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
