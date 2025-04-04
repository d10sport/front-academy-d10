import { useEffect, useState, useContext } from "react";
import AppContext from "@context/app/app-context";
import AWSContext from "@context/aws/aws-context";
import { toast } from "sonner";
import Modal from "react-modal";
import axios from "axios";
import "./home.css";

export default function Home() {
  const context = useContext(AppContext);
  const { fetchFiles } = useContext(AWSContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const user = context.user;

  const [imageUrl, setImageUrl] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!oldPassword || !password || !confirmPassword) {
      toast.error("Por favor complete todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await axios.post(`${urlApi}academy/config/user/p/login`,
        {
          user_id: user.id_login,
          username: user.email,
          passwordOld: oldPassword,
          passwordNew: password,
          verify: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
          }
        });

      if (!response.data.success) throw new Error("Error al actualizar contraseña");

      toast.success("Contraseña actualizada con éxito");
      setIsOpen(false);
    } catch (error) {
      toast.error("Error al actualizar la contraseña: " + error.message);
    }
  }

  async function validFirstSession() {
    if (user?.length === 0 || user == undefined) return;

    const dataLoginUser = await context.fetchLoginUsers(user.id_login);
    if (dataLoginUser[0].verify === 0) {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      validFirstSession();
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

      <Modal
        isOpen={isOpen}
        onRequestClose={() => { }}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="Actualizar contraseña"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.75)" },
          content: {
            width: "60%",
            height: "80%",
            margin: "auto",
            borderRadius: "12px",
            padding: "40px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          },
        }}
      >
        <h2 className="title__add-class sm-margin-bottom">
          Por favor actualice su contraseña
        </h2>
        <form onSubmit={handleSubmit} className="form__add-class">
          <div className="form__add-class__container">
            <label className="label__add-class">Contraseña Anterior</label>
            <input
              type="password"
              className="input__add-class"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form__add-class__container">
            <label className="label__add-class">Nueva Contraseña</label>
            <input
              type="password"
              className="input__add-class"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form__add-class__container">
            <label className="label__add-class">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              className="input__add-class"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <button type="submit" className="btn__add-class">
            Actualizar Contraseña
          </button>
        </form>
      </Modal>
    </>
  );
}
