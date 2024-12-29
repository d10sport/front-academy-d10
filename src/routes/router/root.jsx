import { Route, Routes } from "react-router-dom"
import Forgot from '../forgot/forgot.jsx'
import Form1 from '../log-form-1/log-form-1.jsx'
import Form2 from '../log-form-2/log-form-2.jsx'
import Form3 from '../log-form-3/log-form-3.jsx'
import Login from '../login/login.jsx'
import Register from '../register/register.jsx'
import Success from '../log-success/log-success.jsx'

import ErrorPage from './error.jsx'
import Home from "../home/home.jsx"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/form1" element={<Form1 />} />
      <Route path="/form2" element={<Form2 />} />
      <Route path="/form3" element={<Form3 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
