/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import Modal from "react-modal";
import axios from "axios";

export default function AddImg({ isOpen, onClose }) {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [galleryImg, setGalleryImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAddImg() {
    if (!galleryImg.trim()) {
      setError("Los campos no pueden estar vacíos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.put(
        `${urlApi}landing/i/save-gallery/1`,
        {
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
        alert("Curso agregado con éxito");
        setGalleryImg("");
      } else {
        throw new Error("Error al agregar el curso");
      }
    } catch (error) {
      setError("Hubo un problema al agregar el curso");
      console.error("Error:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Agregar Nuevo Curso"
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
        <section className="add-class">
          <h1 className="title__add-class sm-margin-bottom">Add New Img</h1>
          <label className="label__add-class sm-margin-bottom" htmlFor="">
            Url de la imagen
          </label>
          <input
            className="input__add-class sm-margin-bottom"
            type="text"
            placeholder="Enter Img Url"
            onChange={(e) => setGalleryImg(e.target.value)}
            required
          />
          {/* <label className="label__admin-section sm-margin-bottom" htmlFor="">
            Image Upload
          </label>
          <div className="cntr-input__add-course lg-margin-bottom">
            <input className="file__add-course" type="file" disabled />
            <button className="btn-upload__add-course" disabled>
              ⬆
            </button>
          </div> */}

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            className="btn-add__add-class lg-margin-bottom"
            onClick={handleAddImg}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Img"}
          </button>

          <button onClick={onClose} className="btn-back__edit-course">
            Cancelar
          </button>
        </section>
      </Modal>
    </>
  );
}
