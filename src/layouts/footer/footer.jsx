import AppContext from "@context/app/app-context";
import { useContext } from "react";
import "./footer.css";

export default function Footer() {
  const context = useContext(AppContext);
  const user = context.user;

  return (
    <>
      {
        user.length == 0 ?
          (
            <div className="fixed bg-transparent bottom-0 left-0"></div>
          ) :
          (
            <footer className="footer">
              <div className="footer__content">
                <div className="footer__text">
                  <p>© 2023 D10 SPORT. Todos los derechos reservados.</p>
                </div>
              </div>
            </footer>
          )
      }
    </>
  )
}