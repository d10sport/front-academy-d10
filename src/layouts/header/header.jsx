import { LogoHeader } from "../../utils/icons/icons";
import AppContext from "@context/app/app-context";
import { useContext } from "react";
import './header.css';
import { toast } from "sonner";

export default function Header() {
  const context = useContext(AppContext);
  const user = context.user;

  function closeSession() {
    context.closeSession();
    toast.success('Sesión cerrada correctamente');
  }

  return (
    <>
      {user.length == 0 ?
        (
          <div className="relative bg-transparent top-0 left-0"></div>
        ) :
        (
          <nav id="nav_header" className="nav">
            <LogoHeader />
            <ul className="list__nav">
              <div></div>
            </ul>
            <button onClick={() => closeSession()} className="border-2 border-[#FFC702] rounded-md px-4 py-2
              text-sm font-semibold text-[#FFC702] hover:text-[#000] hover:bg-[#FFC702] text-center bg-[#000]"
            >
              Salir
            </button>
          </nav>
        )}
    </>
  );
}