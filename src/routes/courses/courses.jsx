import { useEffect, useContext, useState, useRef } from "react";
import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./courses.css";

export default function Courses() {
  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;
  const user = context.user;

  const redirectionRef = useRef(null);
  const [courses, setCourses] = useState([]);

  const handleScroll = () => {
    redirectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  async function getDateCourses() {
    try {
      const response = await axios.get(`${urlApi}academy/g/courses`, {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      });
      setCourses(response.data || []);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  }

  useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      getDateCourses();
      setTimeout(() => {
        context.getElementHeader();
      }, 500);
    }
  }, [context.token]);

  return (
    <>
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            alt="Learning background"
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="object-cover opacity-30"
            src={
              "https://d2u5hr8qa0x6i1.cloudfront.net/images/1747425831633-4dcf8317c839a6b8.png"
            }
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
              color: "transparent",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Bienvenido {user?.first_names}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Continúa tu aprendizaje. Explora nuestra selección de cursos
            diseñados para mejorar tus habilidades.
          </p>
          <button
            onClick={handleScroll}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 bg-white text-black hover:bg-gray-200 text-lg px-8 py-3 rounded-full"
          >
            Explorar Cursos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right ml-2 h-5 w-5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cursos disponibles
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Elija entre nuestra amplia biblioteca de cursos y comience a
            aprender a su propio ritmo.
          </p>
        </div>

        <div
          ref={redirectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-lg border text-card-foreground shadow-sm bg-[#18181b] border-gray-600 hover:border-gray-300 transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              <div className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    alt="Advanced JavaScript"
                    loading="lazy"
                    width="300"
                    height="200"
                    decoding="async"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    src={course.main_photo?.bg_photo}
                    style={{ color: "transparent" }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 left-4">
                    {/* <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    Programming
                  </span> */}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/class/${course.id}`}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-3 bg-white text-black hover:bg-gray-200 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-play h-4 w-4 mr-2"
                      >
                        <polygon points="6 3 20 12 6 21 6 3" />
                      </svg>
                      Iniciar Curso
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-gray-300 font-semibold mb-3 group-hover:text-white transition-colors">
                    {course.course_title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {course.description_course}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className="section__home">
        <h1 className="title__home margin--space">
          Bienvenido {user?.first_names}
        </h1>
        <h1 className="title__home title--color__home margin--space">
          Explora nuestras secciones de curso:
        </h1>
        <h2 className="subtitle__home">
          Explora nuestras secciones de cursos. Ideales para encontrar la
          formación perfecta en todo tipo de ámbito deportivo
        </h2>
        <div className="cntr-course__home">
          {courses.map((course) => (
            <div key={course.id} className="item__home">
              <div className="cntr-info__home">
                <div className="cntr-small-img__home">
                  <img
                    className="sm-img__home"
                    src={course.main_photo?.bg_photo}
                    alt="Imagen del curso"
                  />
                  <img
                    className="lg-img__home"
                    src="https://academy-d10.s3.sa-east-1.amazonaws.com/images/soccer-ball-home.png"
                    alt=""
                  />
                </div>
                <div className="subcntr-info__home">
                  <h1 className="title__home title--color__home">
                    {course.course_title}
                  </h1>
                  <p className="text__home">{course.description_course}</p>
                  <Link to={`/class/${course.id}`} className="link__home">
                    Ir a la clase
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </>
  );
}
