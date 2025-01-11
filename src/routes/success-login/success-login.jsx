import imageAthlete from "@assets/img/deportista.png"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NewSuccess() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/login-user')
    }, 5000)
  }, []);

  return (
    <>
      <section className="section__login">
        <h1 className="title__login">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login margin-general__login">
            Registro exitoso
          </h2>

          <p className="text__login link--color__login margin-general__login">
            Sera notificado cuando se apruebe el ingreso
          </p>
          <div className="cntr-img__login">
            <img
              src={imageAthlete}
              alt="img"
              className="img__login"
            />
          </div>
        </form>
      </section>
    </>
  );
}
