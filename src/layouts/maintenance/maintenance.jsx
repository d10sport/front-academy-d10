import imageFondo from "@assets/img/fondo_home_d10_academy.png";
import logo from "@assets/img/logo_sin_fondo.png";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./maintenance.css";

export default function Maintenance() {
    const { maintenance } = useContext(AppContext);

  useEffect(() => {
    if (maintenance == undefined) return;
    if (
      maintenance?.description != "" &&
      maintenance?.subtitle != "" &&
      maintenance?.title != ""
    ) {
      if (maintenance.active) {
        document.title = "Mantenimiento";
        document.body.style.overflow = "hidden";
        setData(maintenance);
      } else {
        document.title = "D10";
        document.body.style.overflow = "auto";
      }
    }
  }, [maintenance]);

  return (
    <>
      {maintenance !== undefined && (
        <div
          id="section_maintenance"
          className={`h-screen w-full select-none z-[60] ${
            maintenance.active ? "relative" : "hidden"
          }`}
        >
          <div className="w-full h-full absolute top-0 left-0 bottom-0">
            {data.bg_photo != "" ? (
              <img
                className="h-full w-full"
                src={data.bg_photo}
                alt="bgPhoto"
              />
            ) : (
              <img className="h-full w-full" src={imageFondo} alt="bgPhoto" />
            )}
          </div>
          <div className="w-full h-full absolute top-0 left-0 bottom-0 bg-transparent user-select-none">
            <div className="w-full h-full sm:h-full relative flex flex-col justify-center gap-4 items-center text-center">
              <div className="absolute top-2 left-2 bg-transparent user-select-none">
                <img
                  className="h-20 sm:h-auto md:h-auto lg:h-auto w-auto"
                  src={logo}
                  alt="logo D10"
                />
              </div>
              <h1 className="text-white text-9xl font-bold">{data.title}</h1>
              <h1 className="text-white text-6xl">{data.subtitle}</h1>
              <p className="text_300 text-2xl">{data.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
