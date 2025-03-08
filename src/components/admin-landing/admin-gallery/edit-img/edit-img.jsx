/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import axios from "axios";

export default function EditImg({ isOpen, onClose, indice }) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [galleryImg, setGalleryImg] = useState("");

  async function handleUpdateImg() {
    if (!galleryImg.trim()) {
      console.error("No hay un indice válido para actualizar");
      return;
    }

    try {
      const response = await axios.put(
        `${urlApi}landing/u/update-gallery/1`,
        {
          index: indice,
          imageUrl: galleryImg,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.data.success) {
        console.log("Imagen actualizado con éxito:", response.data);
        onClose();
      } else {
        console.error("Error al actualizar la imagen:", response.data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de actualización:", error);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Editar Curso"
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
          content: {
            width: "fit-content",
            height: "fit-content",
            margin: "auto",
            borderRadius: "8px",
            padding: "40px",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <section className="edit-class">
          <h1 className="title__edit-class lg-margin-bottom">Edit Img</h1>
          <label
            htmlFor="course-title-edit"
            className="label__edit-class sm-margin-bottom"
          >
            Url de la Img
          </label>
          <input
            id="course-title-edit"
            type="text"
            className="input__edit-class lg-margin-bottom"
            placeholder="Enter course title"
            value={galleryImg}
            onChange={(e) => setGalleryImg(e.target.value)}
          />

          <button
            className="btn-edit__edit-class lg-margin-bottom"
            onClick={handleUpdateImg}
          >
            Update Img
          </button>

          <button onClick={onClose} className="btn-back__edit-class">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
