import { Route, Routes } from "react-router-dom";
import Forgot from "../forgot/forgot.jsx";

import Club1 from "../club_register/club_register_1.jsx";
import Club2 from "../club_register/club_register_2.jsx";
import Club3 from "../club_register/club_register_3.jsx";
import Club4 from "../club_register/club_register_4.jsx";

import Coach1 from "../coach_register/coach_register_1.jsx";
import Coach2 from "../coach_register/coach_register_2.jsx";

import Athlete1 from "../athletes_register/athletes_register_1.jsx";
import Athlete2 from "../athletes_register/athletes_register_2.jsx";
import Athlete3 from "../athletes_register/athletes_register_3.jsx";

import Login from "../login/login.jsx";
import Register from "../register/register.jsx";
import Success from "../success_login/success_login.jsx";

import ErrorPage from "./error.jsx";
import Home from "../home/home.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forgot" element={<Forgot />} />

      <Route path="/club-form/step-1" element={<Club1 />} />
      <Route path="/club-form/step-2" element={<Club2 />} />
      <Route path="/club-form/step-3" element={<Club3 />} />
      <Route path="/club-form/step-4" element={<Club4 />} />

      <Route path="/coach-form/step-1" element={<Coach1 />} />
      <Route path="/coach-form/step-2" element={<Coach2 />} />

      <Route path="/athlete-form/step-1" element={<Athlete1 />} />
      <Route path="/athlete-form/step-2" element={<Athlete2 />} />
      <Route path="/athlete-form/step-3" element={<Athlete3 />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
