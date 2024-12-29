import { Route, Routes } from "react-router-dom"
import SignIn from '../sign-in/sing-in.jsx'
import SignUp from '../sign-up/sign-up.jsx'
import Forgot from '../forgot/forgot.jsx'
import NewForm1 from '../new-form-1/new-form-1.jsx'
import NewForm2 from '../new-form-2/new-form-2.jsx'
import NewForm3 from '../new-form-3/new-form-3.jsx'
import NewLogin from '../new-login/new-login.jsx'
import NewRegister from '../new-register/new-register.jsx'
import NewSuccess from '../new-success/new-success.jsx'

import ErrorPage from './error.jsx'
import Home from "../home/home.jsx"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/form1" element={<NewForm1 />} />
      <Route path="/form2" element={<NewForm2 />} />
      <Route path="/form3" element={<NewForm3 />} />
      <Route path="/login" element={<NewLogin />} />
      <Route path="/register" element={<NewRegister />} />
      <Route path="/success" element={<NewSuccess />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
