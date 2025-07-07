import Loader from "../../ui/loaders/fake-load/loader.fake.jsx";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "@context/app/app-context";
import { UserCheck, Medal, ArrowRight } from "lucide-react";

export default function LoginUser() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [roles, setRoles] = useState(context.roleSystem);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);

  const Club = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-12 h-12 mx-auto"
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4v18" />
      <path d="M19 21V11l-6-4" />
      <path d="M9 9v.01" />
      <path d="M9 12v.01" />
      <path d="M9 15v.01" />
      <path d="M9 18v.01" />
    </svg>
  );

  const Entrenador = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-12 h-12 mx-auto"
    >
      <UserCheck />
    </svg>
  );

  const Deportista = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-12 h-12 mx-auto"
    >
      <Medal />
    </svg>
  );

  const iconMap = {
    Club,
    Entrenador,
    Deportista,
  };

  const descriptionMap = {
    Club: "Gestión completa del club deportivo",
    Entrenador: "Herramientas para entrenadores profesionales",
    Deportista: "Portal personalizado del atleta",
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  const handleUserSelection = (role) => {
    context.setTypeUser({
      role_id: role.id,
      name_role: role.description_role,
      description_role: role.name_role,
    });
    navigate("/login");
  };

  async function getDataRole() {
    const data = await context.fetchRoleUsers();
    if (data == undefined) {
      return;
    }
    const usersRol = data.splice(data, 3);
    context.setRoleSystem(usersRol);
    setRoles(usersRol);
    context.setIsLoading(false);
  }

  useEffect(() => {
    context.setIsLoading(true);
    getDataRole();
  }, []);

  return (
    <>
      {context.isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto px-6 py-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl select-none md:text-6xl font-bold text-white mb-6 tracking-tight">
                  Inicio de sesión
                </h1>
                <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
                <p className="text-lg select-none  text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Selecciona tu perfil para acceder a la plataforma deportiva
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {roles.map((role) => {
                  const IconComponent = iconMap[role.description_role];
                  const DescriptionComponent =
                    descriptionMap[role.description_role];
                  const isSelected = selectedOption === role;
                  const isHovered = hoveredOption === role.id;

                  return (
                    <button
                      key={role.id}
                      id={role.id}
                      onClick={() => handleOptionSelect(role)}
                      onMouseEnter={() => setHoveredOption(role.id)}
                      onMouseLeave={() => setHoveredOption(null)}
                      className={`group relative p-12 border-2 transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-white/10 active:scale-95 ${isSelected
                          ? "border-white bg-gray-800 shadow-xl shadow-white/20 scale-105"
                          : "border-gray-600 bg-gray-900 hover:border-gray-400 hover:bg-gray-800"
                        } `}
                    >
                      {/* Patrón de fondo */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 text-center space-y-6">
                        {/* Icono */}
                        <div
                          className={`flex justify-center transition-all duration-300 ${isHovered || isSelected
                              ? "text-white scale-110"
                              : "text-gray-300"
                            }`}
                        >
                          {IconComponent ? <IconComponent /> : null}
                        </div>

                        {/* Label */}
                        <h3
                          className={`text-2xl font-bold transition-colors duration-300 ${isSelected
                              ? "text-white"
                              : "text-gray-200 group-hover:text-white"
                            } `}
                        >
                          {role.description_role}
                        </h3>

                        {/* Descripción */}
                        <p
                          className={`text-base leading-relaxed transition-colors duration-300 ${isSelected
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300"
                            }`}
                        >
                          {DescriptionComponent}
                        </p>
                      </div>

                      {/* Indicador de selección */}
                      {isSelected && (
                        <div className="absolute top-6 right-6">
                          <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}

                      {/* Hover Glow Effect */}
                      <div
                        className={`absolute inset-0 border-2 border-transparent transition-all duration-300 ${isHovered ? "shadow-inner shadow-white/10" : ""
                          }`}
                      ></div>
                    </button>
                  );
                })}
              </div>

              <div className="text-center mt-8 pt-6 border-t border-gray-700">
                {selectedOption ? (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <button
                      onClick={() => handleUserSelection(selectedOption)}
                      className="inline-flex items-center px-12 py-4 bg-white rounded-lg text-black text-lg font-semibold hover:bg-gray-200 active:bg-gray-300 transition-all duration-300 ease-out hover:shadow-xl hover:shadow-white/20 active:shadow-lg hover:scale-105 active:scale-95 border-2 border-white hover:border-gray-200 group"
                    >
                      <span>Continuar</span>
                      <svg
                        className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <ArrowRight />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <p className="text-sm select-none text-gray-500">
                    ¿Necesitas ayuda? Contacta con nuestro equipo de soporte
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
