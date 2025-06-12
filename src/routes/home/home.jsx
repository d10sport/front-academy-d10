import { useEffect, useState, useContext, useCallback } from "react";
import { GraphicLineBarChart } from "@ui/charts/line-chart";
import { GraphicBarChart } from "@ui/charts/bar-chart";
import { DataTable } from "@ui/charts/data-table";
import AppContext from "@context/app/app-context";
import AWSContext from "@context/aws/aws-context";
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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [strength, setStrength] = useState(0);
  const [dataDataTable, setDataDataTable] = useState([]);
  const [dataGraphicBarChart, setDataGraphicBarChart] = useState([]);
  const [dataLineChart, setDataLineChart] = useState([]);
  const [error, setError] = useState("");

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

  const isPassValid = password == confirmPassword;

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

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
      setIsOpenModal(false);
    } catch (error) {
      toast.error("Error al actualizar la contraseña: " + error.message);
    }
  }

  const validFirstSession = useCallback(async () => {
    if (user?.length === 0 || user == undefined) return;

    const dataLoginUser = await context.fetchLoginUsers(user.id_login);
    if (dataLoginUser[0].verify === 0) {
      setIsOpenModal(true);
    }
  }, [user, context]);

  const fetchAllUserForClub = useCallback(
    (id) => {
      if (id == undefined) {
        setDataDataTable([]);
        return;
      }
      axios
        .get(`${urlApi}academy/g/users-from-club/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setDataDataTable(response.data.data);
          }
        })
        .catch(() => {
          setDataDataTable([]);
        });
    },
    [urlApi, apiKey]
  );

  const fetchAllRegistersVerifiedByDate = useCallback(() => {
    axios
      .get(`${urlApi}academy/graphics/registers/mounth/year`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setDataLineChart(response.data.data);
        }
      })
      .catch(() => {
        setDataLineChart([]);
      });
  }, [urlApi, apiKey]);

  const getElementHeader = () => {
    const header = document.getElementById("header_academy");
    if (header.classList.contains("hidden")) {
      header.classList.remove("hidden");
    }
  }

  const fetchAllCountUsers = useCallback(() => {
    axios
      .get(`${urlApi}academy/graphics/role/registers/club`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setDataGraphicBarChart(response.data.data);
        }
      })
      .catch(() => {
        setDataGraphicBarChart([]);
      });
  }, [urlApi, apiKey]);

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      validFirstSession();
      fetchAllUserForClub(context?.user?.id);
      fetchAllCountUsers();
      fetchAllRegistersVerifiedByDate();
    }
  }, [context.token]);

  useEffect(() => {
    async function loadImage() {
      const url = await fetchFiles(
        "academy/images/1747425831633-4dcf8317c839a6b8.png"
      );
      setImageUrl(url);
    }
    loadImage();

    setTimeout(() => {
      getElementHeader();
    }, 1000);

  }, []);

  return (
    <>
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {imageUrl ? (
            <img
              alt="Learning background"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="object-cover opacity-30"
              src={imageUrl}
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                inset: 0,
                color: "transparent",
              }}
            />
          ) : (
            <p>Cargando imagen...</p>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Bienvenido a{" "}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              D10Academy
            </span>
          </h1>
        </div>
      </section>

      {context?.permissionsUser[0]?.name_role == "admin" &&
        user?.role == "admin" && (
          <>
            <section className="section__home">
              <section className="w-full px-12 flex flex-col">
                <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 gap-4">
                  <div className="rounded-xl p-4 flex flex-col justify-center text-white">
                    <div className="pl-16">
                      <h2 className="text-lg mb-2">
                        Total registros por año:{" "}
                        <span className="text-2xl font-bold">
                          {dataGraphicBarChart.length}
                        </span>{" "}
                      </h2>
                      <div className="text-xs text-muted-foreground">
                        +20.1% desde el último mes
                      </div>
                    </div>
                    <GraphicLineBarChart data={dataLineChart} />
                  </div>
                  <div className="rounded-xl p-4 flex flex-col justify-center text-white">
                    <div className="pl-16">
                      <h2 className="text-lg mb-2">
                        Total de roles:{" "}
                        <span className="text-2xl font-bold">
                          {dataGraphicBarChart.length}
                        </span>{" "}
                      </h2>
                      <div className="text-xs text-muted-foreground">
                        +180.1% desde el último mes
                      </div>
                    </div>
                    <GraphicBarChart data={dataGraphicBarChart} />
                  </div>
                </div>
              </section>
            </section>

            {dataDataTable.length > 0 && (
              <>
                <section className="section__home pt-4">
                  <div className="w-full text-center">
                    <h1 className="text-2xl">Lista de usuarios</h1>
                  </div>
                </section>
                <section className="section__home">
                  <section className="w-full px-12 flex flex-col">
                    <DataTable data={dataDataTable} />
                  </section>
                </section>
              </>
            )}
          </>
        )}

      {context?.permissionsUser[0]?.name_role == "club" &&
        user?.role == "club" && (
          <>
            <section className="section__home">
              <section className="w-full px-12 flex flex-col">
                <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 gap-4">
                  <div className="rounded-xl p-4 flex flex-col justify-center text-white">
                    <div className="pl-16">
                      <h2 className="text-lg mb-2">
                        Total registros por año:{" "}
                        <span className="text-2xl font-bold">
                          {dataGraphicBarChart.length}
                        </span>{" "}
                      </h2>
                      <div className="text-xs text-muted-foreground">
                        +20.1% desde el último mes
                      </div>
                    </div>
                    <GraphicLineBarChart data={dataLineChart} />
                  </div>
                  <div className="rounded-xl p-4 flex flex-col justify-center text-white">
                    <div className="pl-16">
                      <h2 className="text-lg mb-2">
                        Total de roles:{" "}
                        <span className="text-2xl font-bold">
                          {dataGraphicBarChart.length}
                        </span>{" "}
                      </h2>
                      <div className="text-xs text-muted-foreground">
                        +180.1% desde el último mes
                      </div>
                    </div>
                    <GraphicBarChart data={dataGraphicBarChart} />
                  </div>
                </div>
              </section>
            </section>

            {dataDataTable.length > 0 && (
              <>
                <section className="section__home pt-4">
                  <div className="w-full text-center">
                    <h1 className="text-2xl">Lista de usuarios</h1>
                  </div>
                </section>
                <section className="section__home">
                  <section className="w-full px-12 flex flex-col">
                    <DataTable data={dataDataTable} />
                  </section>
                </section>
              </>
            )}
          </>
        )}

      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => { }}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        contentLabel="Actualizar contraseña"
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.75)",
            zIndex: 1000,
          },
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

          {error && <p style={{ color: "red" }}>{error}</p>}

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
                marginBottom: "5px",
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
            disabled={!isFormValid && !isPassValid}
            className="btn__change-pass"
            style={{
              backgroundColor: isFormValid && isPassValid ? "#4CAF50" : "#ccc",
              cursor: isFormValid && isPassValid ? "pointer" : "not-allowed",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              color: "white",
              transition: "background-color 0.3s ease",
            }}
            onClick={(e) => handleSubmit(e)}
          >
            Actualizar Contraseña
          </button>
        </section>
      </Modal>
    </>
  );
}
