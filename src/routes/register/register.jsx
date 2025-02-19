import imageAthlete from "@assets/img/deportista.png";
import imageCoach from "@assets/img/entrenador.png";
import imageClub from "@assets/img/club.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import LoaderFake from "../../ui/loaders/fake-load/loader.fake.jsx";
import "./register.css";

export default function Register() {
  const { setTypeUser } = useContext(AppContext);
  const navigate = useNavigate();

  // function selectTypeUser(event) {
  //   setTypeUser(event.currentTarget.id);
  //   if (event.currentTarget.id === "athlete")
  //     return navigate("/register/athlete/step-one");
  //   if (event.currentTarget.id === "coach")
  //     return navigate("/register/coach/step-one");
  //   if (event.currentTarget.id === "club")
  //     return navigate("/register/club/step-one");
  // }

  const [isLoading, setIsLoading] = useState(false);

  const handleFakeLoadClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login-user");
    }, 1000);
  };

  const handleUserSelectionWithFakeLoad = (event) => {
    event.preventDefault();

    const selectedUserType = event.currentTarget.id;
    setTypeUser(selectedUserType);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      if (selectedUserType === "athlete") {
        navigate("/register/athlete/step-one");
      } else if (selectedUserType === "coach") {
        navigate("/register/coach/step-one");
      } else if (selectedUserType === "club") {
        navigate("/register/club/step-one");
      }
    }, 1000);
  };

  return (
    <>
      {isLoading ? (
        <LoaderFake />
      ) : (
        <section className="section__register">
          <div className="cntr-link__register">
            <button
              id="athlete"
              onClick={handleUserSelectionWithFakeLoad}
              className="link__register"
            >
              <div className="cntr-title__register index--position">
                <h1 className="title__register">Deportista</h1>
              </div>
              <img
                src={imageAthlete}
                alt="Img Deportista"
                className="img__register"
              />
            </button>

            <button
              id="coach"
              onClick={handleUserSelectionWithFakeLoad}
              className="link__register"
            >
              <img
                src={imageCoach}
                alt="Img Entrenador"
                className="img__register"
              />
              <div className="cntr-title__register index--position">
                <h1 className="title__register">Entrenador</h1>
              </div>
            </button>

            <button
              id="club"
              onClick={handleUserSelectionWithFakeLoad}
              className="link__register"
            >
              <img src={imageClub} alt="Img Club" className="img__register" />
              <div className="cntr-title__register index--position">
                <h1 className="title__register">Club</h1>
              </div>
            </button>
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
                onClick={handleFakeLoadClick}
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
