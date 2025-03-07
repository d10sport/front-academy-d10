import HomeAdmin from "@components/admin-landing/admin-home/admin-home.jsx";
import AboutUsAdmin from "@components/admin-landing/admin-aboutus/admin-aboutus.jsx";
import ServicesAdmin from "@components/admin-landing/admin-services/admin-services.jsx";
import "./admin.css";

export default function Admin() {
  return (
    <>
      <section className="admin-section">
        <HomeAdmin />

        <AboutUsAdmin />

        <ServicesAdmin />
      </section>
    </>
  );
}
