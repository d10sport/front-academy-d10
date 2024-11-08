import { Route, Routes } from "react-router-dom"
import SignIn from '../sign-in/sing-in.jsx'
import SignUp from '../sign-up/sign-up.jsx'
import Forgot from '../forgot/forgot.jsx'
import ErrorPage from './error.jsx'
import Home from "../home/home.jsx"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
