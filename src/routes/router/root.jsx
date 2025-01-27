import AthleteRegisterOne from "@routes/athlete-register/athlete-register-one.jsx";
import AthleteThree from "@routes/athlete-register/athlete-register-three.jsx";
import AthleteTwo from "@routes/athlete-register/athlete-register-two.jsx";
import ClubRegisterThree from "@routes/club-register/club-register-three.jsx";
import ClubRegisterFour from "@routes/club-register/club-register-four.jsx";
import ClubRegisterTwo from "@routes/club-register/club-register-two.jsx";
import ClubRegisterOne from "@routes/club-register/club-register-one.jsx";
import CoachRegisterOne from "@routes/coach-register/coach-register-one.jsx";
import CoachregisterTwo from "@routes/coach-register/coach-register-two.jsx";
import ClubRequest from "@routes/club-request/club-request.jsx";
import Success from "@routes/success-register/success-register.jsx";
import LoginUser from "@routes/login-user/login-user.jsx";
import Register from "@routes/register/register.jsx";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "@routes/router/error.jsx";
import Forgot from "@routes/forgot/forgot.jsx";
import Login from "@routes/login/login.jsx";
import Home from "@routes/home/home.jsx";


import ClassDetail from "../../components/video-class/video-class.jsx";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      

      <Route path="/class/:classId" element={<ClassDetail />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/register/club/step-one" element={<ClubRegisterOne />} />
      <Route path="/register/club/step-two" element={<ClubRegisterTwo />} />
      <Route path="/register/club/step-three" element={<ClubRegisterThree />} />
      <Route path="/register/club/step-four" element={<ClubRegisterFour />} />
      <Route path="/register/coach/step-one" element={<CoachRegisterOne />} />
      <Route path="/register/coach/step-two" element={<CoachregisterTwo />} />
      <Route path="/register/athlete/step-one" element={<AthleteRegisterOne />} />
      <Route path="/register/athlete/step-two" element={<AthleteTwo />} />
      <Route path="/register/athlete/step-three" element={<AthleteThree />} />
      <Route path="/club-request" element={<ClubRequest />} />
      <Route path="/success-register" element={<Success />} />
      <Route path="/login-user" element={<LoginUser />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
