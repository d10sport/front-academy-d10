import ServicesAdmin from "@components/admin/admin-services/admin-services.jsx";
import AboutUsAdmin from "@components/admin/admin-aboutus/admin-aboutus.jsx";
import GalleryAdmin from "@components/admin/admin-gallery/admin-gallery.jsx";
import HomeAdmin from "@components/admin/admin-home/admin-home.jsx";
import NewsAdmin from "@components/admin/admin-news/admin-news.jsx";
import "./admin.css";

export default function Admin() {
  return (
    <>
      <section className="admin-section">
        <HomeAdmin />

        <AboutUsAdmin />

        <ServicesAdmin />

        <GalleryAdmin />

        <NewsAdmin />
      </section>
    </>
  );
}
