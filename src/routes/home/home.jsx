import { useEffect, useState, useContext } from "react";
import AppContext from "@context/app/app-context";
import AWSContext from "@context/aws/aws-context";
import "./home.css";

export default function Home() {
  const context = useContext(AppContext);
  const { fetchFiles } = useContext(AWSContext);
  const user = context.user;

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    }
  }, [context.token]);

  useEffect(() => {
    async function loadImage() {
      const url = await fetchFiles("academy/images/soccer-ball-home.png");
      setImageUrl(url);
    }
    loadImage();
  }, []);

  return (
    <>
      <section className="section__home">
        <h1 className="title__home margin--space">
          Bienvenido {user?.first_names}
        </h1>
        <div className="cntr-big-img__home">
          {imageUrl ? (
            <img src={imageUrl} alt="Soccer Ball" className="img__home" />
          ) : (
            <p>Cargando imagen...</p>
          )}
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