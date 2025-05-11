/* eslint-disable react/prop-types */
// import { useContext, useState, useCallback } from "react";
// import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "./menu-nav.css";

export default function AddCourse({ isOpen, onClose, permission_system }) {
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
        <section className="add-course_menu" style={{ width: "100%" }}>
          <h1 className="title__add-course sm-margin-bottom">Menu</h1>

          {/* <Link to={"#/"} style={{ color: "black" }} onClick={onClose}>
            Inicio
          </Link> */}

          <ul
            className="list__nav"
            style={{
              width: "100%",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              padding: "10px 0px",
            }}
          >
            {permission_system?.length > 0 &&
              permission_system.map((permission) => (
                <li
                  key={permission.permission_id ?? permission.id_permission}
                  className="item__nav_menu"
                >
                  <Link to={permission.link} onClick={onClose}>
                    {permission.description_permission}
                  </Link>
                </li>
              ))}
          </ul>

          <button
            onClick={onClose}
            style={{ color: "red" }}
            className="btn-back__edit-course"
          >
            Cerrar
          </button>
        </section>
      </Modal>
    </>
  );
}
