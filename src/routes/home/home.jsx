/* eslint-disable react/no-unescaped-entities */
import Header from "../../layouts/header/header.jsx";
import './home.css';

export default function Home() {

  if (!localStorage.getItem('token')) {
    window.location.href = '/#/signin';
  }

  return (
    <>
      <Header />
      <div>Home</div>
    </>
  )
}
