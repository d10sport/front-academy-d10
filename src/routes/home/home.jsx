import { useEffect, useContext } from "react";
import AppContext from "@context/app/app-context";
import "./home.css";

export default function Home() {
  const context = useContext(AppContext);
  const user = context.user;

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    }
  }, [context.token]);

  return (
    <>
      <section className="section__home">
        <h1 className="title__home margin--space">
          Bienvenido {user?.first_names}
        </h1>
        <div className="cntr-big-img__home">
          <img
            src="https://academy-d10.s3.sa-east-1.amazonaws.com/images/soccer-ball-home.png"
            alt=""
            className="img__home"
          />
        </div>
        <h1 className="title__home title--color__home margin--space">
          Explora nuestras secciones de curso:
        </h1>
        <h2 className="subtitle__home">
          Explora nuestras secciones de cursos. Ideales para encontrar la
          formación perfecta en todo tipo de ámbito deportivo
        </h2>
      </section>
    </>
  );
}
