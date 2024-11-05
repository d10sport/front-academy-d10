import SignIn from '../sign-in/sing-in.jsx'
import SignUp from '../sign-up/sign-up.jsx'
import HomeAcademy from '../home/home.jsx'
import { Route, Routes } from "react-router-dom"
import ErrorPage from './error.jsx'
import Home from "../home/home.jsx"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/d10/academy/signin" element={<SignIn />} />
      <Route path="/d10/academy/signup" element={<SignUp />} />
      <Route path="/d10/academy/home" element={<HomeAcademy />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
