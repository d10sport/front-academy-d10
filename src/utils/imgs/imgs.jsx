import fondoHome from "../../assets/img/fondo2.jpg";
import fondoHomeAboutUs from "../../assets/img/fondo_home_about.png";
import fondoHomeD10Academy from "../../assets/img/fondo_home_d10_academy.png";

function BackgroundHome() {
  return (
    <img
      src={fondoHome}
      alt="Descripción de la imagen"
      className="img-fondo__home"
    />
  );
}

function BackgroundAboutUsHome() {
  return (
    <img
      src={fondoHomeAboutUs}
      alt="Descripción de la imagen"
      className="absolute w-full h-full -z-0"
    />
  );
}

function BackgroundHomeD10Academy() {
  return (
    <img
      className="relative object-cover w-full h-full"
      src={fondoHomeD10Academy}
    />
  );
}

export { BackgroundHome, BackgroundAboutUsHome, BackgroundHomeD10Academy };
