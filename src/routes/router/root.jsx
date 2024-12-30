import { Route, Routes } from "react-router-dom"
import Forgot from '../forgot/forgot.jsx'

import Club1 from '../club_form_1/club_form_1.jsx'
import Club2 from '../club_form_2/club_form_2.jsx'
import Club3 from '../club_form_3/club_form_3.jsx'
import Club4 from '../club_form_4/club_form_4.jsx'

import Coach1 from '../coach-form-1/coach-form-1.jsx'
import Coach2 from '../coach-form-2/coach-form-2.jsx'

import Sport1 from '../sport-form-1/sport-form-1.jsx'
import Sport2 from '../sport-form-2/sport-form-2.jsx'
import Sport3 from '../sport-form-3/sport-form-3.jsx'

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

      <Route path="/club1" element={<Club1 />} />
      <Route path="/club2" element={<Club2 />} />
      <Route path="/club3" element={<Club3 />} />
      <Route path="/club4" element={<Club4 />} />

      <Route path="/coach1" element={<Coach1 />} />
      <Route path="/coach2" element={<Coach2 />} />

      <Route path="/sport1" element={<Sport1 />} />
      <Route path="/sport2" element={<Sport2 />} />
      <Route path="/sport3" element={<Sport3 />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
