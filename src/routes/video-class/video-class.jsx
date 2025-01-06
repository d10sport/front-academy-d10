import "./video-class.css";

export default function LoginUser() {
  return (
    <>
      <section className="class">
        <div className="cntr-list__class">
          <div className="subcntr-list__class">
            <h1 className="title__class">Clases</h1>
            <ul className="list__class">
              <li className="list-item__class item--active">Clase 1</li>
              <li className="list-item__class item--active">Clase 2</li>
              <li className="list-item__class item--nowplaying">clase 3</li>
              <li className="list-item__class">clase 4</li>
            </ul>
          </div>
        </div>

        <div className="cntr-video__class">
          <div className="subcntr-video__class">
            <video
              className="video__class"
              src="https://youtu.be/dQw4w9WgXcQ"
              controls
              muted
            ></video>
          </div>

          <div className="description__class">
            <h2 className="subtitle__class">Titulo del Video: Introducción</h2>
            <p className="text__class">Descripción del Video</p>
            <div className="profile__class">
              <img className="profile-img__class" src="" alt="Profile" />
              <p className="text__class">Prof. Juan Pérez</p>
            </div>
          </div>

          <div className="cntr-comment__class">
            <h2 className="subtitle__class">Comentarios</h2>
            <form action="" className="form__class">
              <textarea
                className="textarea__class"
                name=""
                id=""
                placeholder="Escribe tu comentario..."
              ></textarea>
              <button className="btn__class">Publicar</button>
            </form>

            <ul className="comment__class">
              <li className="comment-item__class">
                <h2 className="subtitle__class">Ana Garcia</h2>
                <p className="text__class">
                  ¡Excelente video! Muy informativo.
                </p>
              </li>
              <li className="comment-item__class">
                <h2 className="subtitle__class">Carlos Rodriguez</h2>
                <p className="text__class">
                  Gracias por la explicación detallada
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
