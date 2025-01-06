import AthleteRegisterOne from "@routes/athletes-register/athletes-register-one.jsx";
import AthleteThree from "@routes/athletes-register/athletes-register-three.jsx";
import AthleteTwo from "@routes/athletes-register/athletes-register-two.jsx";
import ClubRegisterThree from "@routes/club-register/club-register-three.jsx";
import ClubRegisterFour from "@routes/club-register/club-register-four.jsx";
import ClubRegisterTwo from "@routes/club-register/club-register-two.jsx";
import ClubRegisterOne from "@routes/club-register/club-register-one.jsx";
import CoachRegisterOne from "@routes/coach-register/coach-register-one.jsx";
import CoachregisterTwo from "@routes/coach-register/coach-register-two.jsx";
import Success from "@routes/success-login/success-login.jsx";
import LoginUser from "@routes/login-user/login-user.jsx";
import Register from "@routes/register/register.jsx";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "@routes/router/error.jsx";
import Forgot from "@routes/forgot/forgot.jsx";
import Login from "@routes/login/login.jsx";
import Home from "@routes/home/home.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/club-form/step-one" element={<ClubRegisterOne />} />
      <Route path="/club-form/step-two" element={<ClubRegisterTwo />} />
      <Route path="/club-form/step-three" element={<ClubRegisterThree />} />
      <Route path="/club-form/step-four" element={<ClubRegisterFour />} />
      <Route path="/coach-form/step-one" element={<CoachRegisterOne />} />
      <Route path="/coach-form/step-two" element={<CoachregisterTwo />} />
      <Route path="/athlete-form/step-one" element={<AthleteRegisterOne />} />
      <Route path="/athlete-form/step-two" element={<AthleteTwo />} />
      <Route path="/athlete-form/step-three" element={<AthleteThree />} />
      <Route path="/login-user" element={<LoginUser />} />
      <Route path="/register" element={<Register />} />
      <Route path="/success" element={<Success />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
