import fondoHomeD10Academy from '../../assets/img/fondo_home_d10_academy.png';
import { Link } from 'react-router-dom';
import './sing-in.css';

export default function SingIn() {
  return (
    <>
      <main className="w-full h-full grid justify-center py-8">
        <div className='w-full text-center h-fit'>
          <h1 className="text_300 font-extrabold text-6xl">D10+ Academy</h1>
        </div>

        <div className='w-full flex flex-col items-center'>
          <aside className="container__login">
            <div className='relative z-40 pt-8'>
              <h1 className="text_100 font-bold text-3xl">Iniciar Sesión</h1>
            </div>
            <form className="form__login">
              <label className="text_100 text-base">Correo</label>
              <input
                required
                type="email"
                placeholder="correo@gmail.com"
                className="input__login"
              />
              <label className="text_100 text-base">Contraseña</label>
              <input required type="password" placeholder="contraseña" className="input__login" />
              <Link to={"/forgot"} className="link__login">Recordar Contraseña</Link>
              <input type="button" value="Iniciar Sesión" className="btn__login mt-6 text-base font-semibold" />
            </form>
            <div className="line__login"></div>
            <div className='relative z-40 w-full text-center pb-10'>
              <p className="text__login">
                ¿No tienes una cuenta? <Link to={"/signup"} className="link-2__login">Regístrate ahora</Link>
              </p>
            </div>
            <img className='aspect-video absolute left-0 top-0 h-full w-full opacity-35 rounded-3xl z-10 object-cover' src={fondoHomeD10Academy} />
            <div className="absolute h-full w-full bg-gray-200 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"></div>
            <div className='absolute bg-white/15 blur-[45px] h-full w-full rounded-3xl z-20'></div>
          </aside>
        </div>
      </main>
    </>
  )
}