import AppContext from "@context/app/app-context";
import { useContext } from "react";
import "./loader.auth.css";

function LoaderAuth() {
  const context = useContext(AppContext);
  const loadingAuth = context.loadingAuth;
  return (
    <>
      {loadingAuth && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 select-none z-50">
          <div className="loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoaderAuth;
