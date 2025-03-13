import Loader from "../../ui/loaders/fake-load/loader.fake.jsx";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "@context/app/app-context";
import "./register.css";

export default function Register() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  const [roles, setRoles] = useState(context.roleSystem);

  const handleUserSelection = (role) => {
    context.setTypeUser({
      role_id: role.id,
      name_role: role.description_role,
      description_role: role.name_role
    })
    navigate(`/register/${role.name_role}/step-one`);
  }

  async function getDataRole() {
    const data = await context.fetchRoleUsers();
    setRoles(data);
    context.setIsLoading(false);
  }

  useEffect(() => {
    getDataRole();
  }, []);

  return (
    <>
      {context.isLoading ? (
        <Loader />
      ) : (
        <section className="section__register">
          <div className="cntr-link__register">
            {roles.map((role) => (
              <button
                key={role.id}
                id={role.id}
                onClick={() => handleUserSelection(role)}
                className="link__register"
              >
                <div className="cntr-title__register index--position">
                  <h1 className="title__register">{role.description_role}</h1>
                </div>
                <img
                  src={new URL(`../../assets/img/${role.name_role}.png`, import.meta.url).href}
                  alt={`Img ${role.description_role}`}
                  className="img__register"
                />
              </button>
            ))}
          </div>
          <div className="cntr-menu__register">
            <div className="cntr-title__register alt-cntr-title--design cntr-title--responsive">
              <h1 className="title__register neon-text--color">Registro</h1>
            </div>
            <div className="cntr-text__register">
              <p className="text__register">¿Ya tienes una cuenta?</p>
              <Link
                to="/login-user"
                className="text__register text--color"
                onClick={() => navigate('/login-user')}
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
