import ServicesAdmin from "@components/admin/admin-services/admin-services.jsx";
import AboutUsAdmin from "@components/admin/admin-aboutus/admin-aboutus.jsx";
import GalleryAdmin from "@components/admin/admin-gallery/admin-gallery.jsx";
import HomeAdmin from "@components/admin/admin-home/admin-home.jsx";
import NewsAdmin from "@components/admin/admin-news/admin-news.jsx";
import Loader from "../../ui/loaders/fake-load/loader.fake.jsx";
import { useState, useEffect, useContext } from "react";
import AppContext from "@context/app/app-context";
import "./admin.css";

export default function Admin() {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

   useEffect(() => {
    if (!context.token) {
      context.fetchToken();
    } else {
      setTimeout(() => {
        context.getElementHeader();
      }, 500);
    }
  }, [context.token]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="admin-section">
          <HomeAdmin />

          <AboutUsAdmin />

          <ServicesAdmin />

          <GalleryAdmin />

          <NewsAdmin />
        </section>
      )}
    </>
  );
}
