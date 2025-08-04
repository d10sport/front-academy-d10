/* eslint-disable react/prop-types */
// import { useContext, useState, useCallback } from "react";
// import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "sonner";

export default function AddCourse({
  isOpen,
  onClose,
  imgExample,
  userInfo,
  closeUserInfo,
}) {
  // const context = useContext(AppContext);
  // const urlApi = context.urlApi;
  // const apiKey = context.apiKey;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Menu"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.5)", zIndex: "40" },
          content: {
            width: "80%",
            height: "fit-content",
            margin: "auto",
            borderRadius: "8px",
            padding: "8px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          },
        }}
      >
        <section className="add-course" style={{ width: "100%" }}>
          <div className="cntr-one-item__info-user">
            <div className="cntr-img__button-nav">
              <img src={imgExample} alt="img" className="img__info-user" />
            </div>
            <div className="items__info-user">
              <p className="font-bold ml-2.5 text-black">
                {userInfo?.first_names ?? userInfo?.name_club}{" "}
                {userInfo?.last_names ?? ""}
              </p>
            </div>
          </div>

          <div className="cntr-two-item__info-user">
            <h1 className="text-[1.2rem] font-bold mx-0 my-2.5 text-black">
              Información de usuario
            </h1>
            <p className="text-black text-sm">
              <b>Nombre: </b> {userInfo?.first_names ?? userInfo?.president}{" "}
              {userInfo?.last_names ?? ""}
            </p>
            <p className="text-black text-sm">
              <b>Email: </b> {userInfo?.email}
            </p>
            <p className="text-black text-sm">
              <b>Rol: </b>{" "}
              {userInfo?.role.charAt(0).toUpperCase() + userInfo?.role.slice(1)}
            </p>
            <p className="text-black text-sm">
              <b>Club: </b> {userInfo?.club?.name_club ?? userInfo?.name_club}
            </p>
            <Link to={`/change-pass`} className="text-[#4b5563] text-sm hover:underline">
              Cambiar contraseña
            </Link>
          </div>

          <div className="cntr-three-item__info-user">
            <button
              onClick={() => {
                onClose;
                closeUserInfo();
                toast.success("Sesión cerrada correctamente");
              }}
              className="button__info-user"
            >
              Cerrar sesión
            </button>
          </div>
        </section>
      </Modal>
    </>
  );
}
