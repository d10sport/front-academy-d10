import { SubscriptionChart } from "@ui/charts/subscription"
import { useEffect, useState, useContext } from "react";
import { DataTable } from "@ui/charts/data-table";
import AppContext from "@context/app/app-context";
import AWSContext from "@context/aws/aws-context";
import { RevenueChart } from "@ui/charts/revenue";
import Modal from "react-modal";
import { toast } from "sonner";
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
  const [strength, setStrength] = useState(0);

  const handlePasswordChange = (e) => {
    setPassword(e);
    setStrength(getPasswordStrength(e));
  };

  function getPasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength++;

    return strength;
  }

  const isFormValid =
    oldPassword.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    strength >= 4;

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

    const strength = getPasswordStrength(password);
    if (strength < 3) {
      toast.error(
        "La contraseña es demasiado débil. Mejora su seguridad antes de continuar."
      );
      return;
    }

    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:'\",.<>/?]).{8,}$"
    );

    if (!passwordRegex.test(password)) {
      toast.error(
        "La contraseña no cumple con los requisitos mínimos: debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${urlApi}academy/config/user/p/login`,
        {
          user_id: user.id_login,
          username: user.email,
          passwordOld: oldPassword,
          passwordNew: password,
          verify: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Error al actualizar contraseña");
      }

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


  const data = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    }, {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    }, {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    }, {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    }, {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    }, {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    }, {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    }, {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
    },
  ]

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
          Bienvenido {user?.first_names} a <span className="title--color__home">
            D10 Academy
          </span>
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

      <section className="section__home">
        <section className="w-full px-12 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl p-4 text-white">
              <h2 className="text-sm mb-2">Total Revenue</h2>
              <div className="text-2xl font-bold">$15,231.89</div>
              <div className="text-xs text-muted-foreground">+20.1% from last month</div>
              <RevenueChart />
            </div>
            <div className="rounded-xl p-4 text-white">
              <h2 className="text-sm mb-2">Subscriptions</h2>
              <div className="text-2xl font-bold">+2350</div>
              <div className="text-xs text-muted-foreground">+180.1% from last month</div>
              <SubscriptionChart />
            </div>
          </div>
        </section>
      </section>

      <section className="section__home">
        <section className="w-full px-12 flex flex-col">
          <DataTable data={data} />
        </section>
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
            width: "fit-content",
            height: "fit-content",
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
        <h2 className="title__change-pass">
          Por favor actualice su contraseña
        </h2>
        <section className="form__change-pass">
          <div className="form__change-pass__container">
            <label className="label__change-pass">Contraseña Anterior</label>
            <input
              type="password"
              className="input__change-pass"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form__change-pass__container">
            <label className="label__change-pass">Nueva Contraseña</label>
            <input
              type="password"
              className="input__change-pass"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
            />
          </div>
          <div className="form__change-pass__container">
            <label className="label__change-pass">
              Confirmar Nueva Contraseña
            </label>
            <input
              type="password"
              className="input__change-pass"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <div
              style={{
                height: "8px",
                backgroundColor: "#ccc",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(strength / 5) * 100}%`,
                  backgroundColor:
                    strength <= 2 ? "red" : strength === 3 ? "orange" : "green",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                marginTop: "5px",
                color:
                  strength <= 2 ? "red" : strength === 3 ? "orange" : "green",
              }}
            >
              {strength <= 2
                ? "Contraseña débil"
                : strength === 3
                  ? "Contraseña media"
                  : "Contraseña fuerte"}
            </p>
          </div>

          <button
            disabled={!isFormValid}
            className="btn__change-pass"
            style={{
              backgroundColor: isFormValid ? "#4CAF50" : "#ccc",
              cursor: isFormValid ? "pointer" : "not-allowed",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              color: "white",
              transition: "background-color 0.3s ease",
            }}
            onClick={() => handleSubmit()}
          >
            Actualizar Contraseña
          </button>
        </section>
      </Modal>
    </>
  );
}
