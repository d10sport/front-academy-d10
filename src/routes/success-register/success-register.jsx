import imageAthlete from "@assets/img/athlete.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SucessRegister() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login-user");
    }, 5000);
  }, []);

  return (
    <>
      <section className="section__login_academy">
        <h1 className="text-6xl py-6 w-auto font-bold text-white">D10+ Academy</h1>
        <form action="" className="form__login">
          <h2 className="subtitle__login">
            Solicitud de registro exitosa
          </h2>

          <p className="text__login link--color__login">
            Sera notificado cuando se apruebe el ingreso
          </p>
          <div className="cntr-img__login">
            <img src={imageAthlete} alt="img" className="img__login" />
          </div>
        </form>
      </section>
    </>
  );
}
