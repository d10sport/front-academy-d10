import Maintenance from "../layouts/maintenance/maintenance";
import LoaderAuth from "@ui/loaders/auth/loader.auth";
import Header from "@layouts/header/header";
import Footer from "@layouts/footer/footer";
import Router from "@routes/router/root";
import { Toaster } from "sonner";
import Modal from "react-modal";
import "./App.css";

function App() {
  Modal.setAppElement("#root");
  return (
    <>
      <LoaderAuth />
      <Header />
      <Router />
      <Footer />
      <Toaster richColors />
      <Maintenance />
    </>
  );
}

export default App;
