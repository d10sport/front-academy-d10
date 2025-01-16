import imageAthlete from "@assets/img/deportista.png";
import imageCoach from "@assets/img/entrenador.png";
import imageClub from "@assets/img/club.png";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import AppContext from "@context/app/app-context";
// import { useContext } from "react";
import "./login-user.css";

export default function LoginUser() {
  return (
    <>
      <section className="section__register">
        <div className="cntr-link__register">
          <a href="#" className="link__register">
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Deportista</h1>
            </div>
            <img
              src={imageAthlete}
              alt="Img Deportista"
              className="img__register"
            />
          </a>
          <a href="#" className="link__register">
            <img
              src={imageCoach}
              alt="Img Entrenador"
              className="img__register"
            />
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Entrenador</h1>
            </div>
          </a>
          <a href="#" className="link__register">
            <img src={imageClub} alt="Img Club" className="img__register" />
            <div className="cntr-title__register index--position">
              <h1 className="title__register">Club</h1>
            </div>
          </a>
        </div>
        <div className="cntr-menu__register">
          <div className="cntr-title__register">
            <h1 className="title__register">Iniciar Sesión</h1>
          </div>
          <div className="cntr-text__register">
            <p className="text__register">¿No tienes una cuenta?</p>
            <Link to="/register" className="text__register text--color">
              Regístrate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// export default function LoginUser() {
//   const { setTypeUser } = useContext(AppContext);
//   const navigate = useNavigate();

//   function selectTypeUser(event) {
//     setTypeUser(event.currentTarget.id);
//     navigate("/login");
//   }

//   return (
//     <>
//       <section className="section__login">
//         <h1 className="title__login">D10+ Academy</h1>
//         <div className="form__login">
//           <h2 className="subtitle__login">Inicia sessión</h2>
//           <p className="text__login link--color__login margin-general__login">
//             Selecciona el perfil adecuado
//           </p>

//           <div className="cntr-choosen__login">
//             <div className="choosen__login">
//               <p className="text__login margin-general__login">Deportista</p>
//               <button id="athlete" onClick={(event) => selectTypeUser(event)} className="cntr-img__login">
//                 <img
//                   src={imageAthlete}
//                   alt="Img"
//                   className="img__login"
//                 />
//               </button>
//             </div>
//             <div className="choosen__login">
//               <p className="text__login margin-general__login">Entrenador</p>
//               <button id="coach" onClick={(event) => selectTypeUser(event)} className="cntr-img__login">
//                 <img
//                   src={imageCoach}
//                   alt="Img"
//                   className="img__login"
//                 />
//               </button>
//             </div>
//             <div className="choosen__login">
//               <p className="text__login margin-general__login">Club</p>
//               <button id="club" onClick={(event) => selectTypeUser(event)}  className="cntr-img__login">
//                 <img
//                   src={imageClub}
//                   alt="Img"
//                   className="img__login"
//                 />
//               </button>
//             </div>
//           </div>

//           <p className="text__login margin-general__login">
//             ¿No tienes una cuenta?
//           </p>
//           <Link
//             to="/register"
//             className="link__login link--color__login center-text__login"
//           >
//             Registrate
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// }
