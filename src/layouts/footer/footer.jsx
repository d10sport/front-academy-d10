import AppContext from "@context/app/app-context";
import { useContext } from "react";
import "./footer.css";

export default function Footer() {
  const context = useContext(AppContext);
  const user = context.user;
  const currentYear = new Date().getFullYear();

  return (
    <>
      {user.length == 0 ? (
        <div className="fixed bg-transparent bottom-0 left-0"></div>
      ) : (
        <footer className="w-full bg-zinc-900 text-zinc-200">
          <div className="container mx-auto px-4 py-8">
            <div className="mt-8 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
              <p>© {currentYear} D10. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
