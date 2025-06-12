// import Example from "../../assets/img/example-img.png";
import AddCourse from "../../components/academy/admin-course/add-course/add-course.jsx";
import EditCourse from "../../components/academy/admin-course/edit-course/edit-course.jsx";
import DeleteCourse from "../../components/academy/admin-course/delete-course/delete-course.jsx";
import { useEffect, useContext, useState } from "react";
import AppContext from "@context/app/app-context";
import { Link } from "react-router-dom";
import axios from "axios";
import "./menu-course.css";
import Loader from "../../ui/loaders/fake-load/loader.fake.jsx";

export default function MenuCourse() {
  const [modalIsOpenOne, setModalIsOpenOne] = useState(false);
  const [modalIsOpenTwo, setModalIsOpenTwo] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalIsOpenThree, setModalIsOpenThree] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseUrl, setSelectedCourseUrl] = useState(null);

  const [loading, setLoading] = useState(true);

  const context = useContext(AppContext);
  const urlApi = context.urlApi;
  const apiKey = context.apiKey;

  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-7xl min-h-screen h-fit mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-14">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestión de Cursos</h1>
              <p className="text-gray-400">
                Gestiona el catálogo de cursos de tu plataforma
              </p>
            </div>
            <button
              onClick={() => setModalIsOpenOne(true)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-white text-black hover:bg-gray-200"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-«r0»"
              data-state="closed"
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
                className="lucide lucide-plus h-4 w-4 mr-2"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
              className="rounded-lg border text-card-foreground shadow-sm bg-[#18181b] border-[#55555d]"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-gray-400">
                  Cursos Totales
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold text-white">
                  {courses.length}
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border text-card-foreground shadow-sm bg-[#18181b] border-[#55555d]"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl text-white font-semibold leading-none tracking-tight flex items-center">
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
                  className="lucide lucide-book-open h-5 w-5 mr-2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Todos los Cursos
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/5 data-[state=selected]:bg-muted border-[#55555d]">
                      <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">
                        ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">
                        Cursos
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">
                        Creado
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 text-gray-400">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {courses.map((course, index) => (
                      <tr
                        key={index}
                        className="border-b transition-colors hover:bg-muted/5 data-[state=selected]:bg-muted border-gray-800"
                      >
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-400">
                          {course.id}
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <div className="flex items-center space-x-3">
                            <img
                              alt="Advanced JavaScript"
                              loading="lazy"
                              width="48"
                              height="48"
                              decoding="async"
                              data-nimg="1"
                              className="rounded-lg object-cover"
                              src={course.main_photo.bg_photo}
                              style={{ color: "transparent" }}
                            />
                            <div>
                              <div className="font-medium text-white">
                                {course.course_title}
                              </div>
                              <div className="text-sm text-gray-400 max-w-xs truncate">
                                {course.description_course}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-gray-400">
                          {course.created_at}
                        </td>
                        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/menu-class/${course.id}`}
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 text-gray-400 hover:text-white hover:bg-white/20"
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
                                className="lucide lucide-eye-icon lucide-eye"
                              >
                                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                              Administrar clases
                            </Link>
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setModalIsOpenTwo(true);
                              }}
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 text-amber-400 hover:text-amber-300 hover:bg-amber-400/30"
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
                                className="lucide lucide-square-pen h-4 w-4"
                              >
                                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                              </svg>
                              Editar
                            </button>
                            <button
                              onClick={() => {
                                setSelectedCourseId(course.id);
                                setSelectedCourseUrl(
                                  course.main_photo.bg_photo
                                );
                                setModalIsOpenThree(true);
                              }}
                              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 rounded-md px-3 text-red-400 hover:text-red-300 hover:bg-red-900/20"
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
                                className="lucide lucide-trash2 h-4 w-4"
                              >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                <line x1="14" x2="14" y1="11" y2="17"></line>
                              </svg>
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <AddCourse
        isOpen={modalIsOpenOne}
        onClose={() => setModalIsOpenOne(false)}
        refreshCourses={() => getDateCourses()}
      ></AddCourse>

      <EditCourse
        isOpen={modalIsOpenTwo}
        onClose={() => setModalIsOpenTwo(false)}
        course={selectedCourse}
        refreshCourses={() => getDateCourses()}
      />

      <DeleteCourse
        isOpen={modalIsOpenThree}
        onClose={() => setModalIsOpenThree(false)}
        courseId={selectedCourseId}
        courseUrl={selectedCourseUrl}
        refreshCourses={() => getDateCourses()}
      />
    </>
  );
}
