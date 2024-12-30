import Header from "../../layouts/header/header.jsx";
import './home.css';

export default function Home() {
  if (!localStorage.getItem('token')) {
    if (window.location.hostname === 'localhost') {
      window.location.href = "http://localhost:5173/#/login"
      window.location.reload();
      return
    }
    window.location.href = 'https://academia.d10mas.com/#/login';
    window.location.reload();
  }

  return (
    <>
      <Header />
      <div>Home</div>
    </>
  )
}
