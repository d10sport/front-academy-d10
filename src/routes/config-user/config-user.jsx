import "./config-user.css";

export default function ConfigUser() {
  return (
    <>
      <div className="cntr-form__config-menu">
        <div className="config-menu">
          <h1 className="title__config-menu">Información de Usuario</h1>
          <div className="info__config-menu">
            <p className="text__config-menu">
              <b>Nombre: </b>Juan Pérez
            </p>
          </div>
          <div className="info__config-menu">
            <p className="text__config-menu">
              <b>Correo: </b>juan.perez@example.com
            </p>
          </div>
          <div className="info__config-menu space-between__config-menu">
            <p className="text__config-menu">
              <b>Contraseña: </b>••••••••
            </p>
            <a href="#" className="link__config-menu">
              Cambiar
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
