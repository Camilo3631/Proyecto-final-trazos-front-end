import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import './App.css';
import { Navbar } from "./shared/Navbar/Navbar";
import { NavbarPrivado } from "./shared/NavbarPrivado/NavbarPrivado";
import { NavbarPrivadoDoctor } from "./shared/NavbarPrivadoDoctor/NavbarPrivadoDoctor"; // ✅ Corregido
import { Footer } from "./shared/Footer/Footer";
import { Home } from './pages/HomePage/HomePage';
import { Login } from "./pages/LoginPage/LoginPage";
import { Register } from './pages/RegisterPage/RegisterPage';
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { DoctorDashboardPage } from "./pages/DoctorDashboardPage/DoctorDashboardPage";
import { AppointmentsPage } from './pages/AppointmentsPage/AppointmentsPage';
import { DoctorAppointmentsPage } from "./pages/DoctorAppointmentsPage/DoctorAppointmentsPage";
import { LoginDoctorPage } from './pages/LoginDoctorPage/LoginDocotPage';
import { DoctorsPage } from './pages/DoctorsPage/DoctorsPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { VerifyPageDoctor } from "./pages/VerifyPageDoctor/VerifyPageDoctor";
import { RegisterDoctorPage } from './pages/RegisterDoctorPage/RegisterDoctorPage';

const rutasPrivadas = [
'/dashboard',
'/appointments',
'/doctors',
'/profile'
];

const rutasPrivadasDoctor = [
'/doctor-dashboard',
'/doctor-appointments'
];

const Layout = ({ children }) => {
  const location = useLocation();
  
  const esPrivada = rutasPrivadas.some(
    ruta => location.pathname.startsWith(ruta)
  );
  
  const esPrivadaDoctor = rutasPrivadasDoctor.some(
    ruta => location.pathname.startsWith(ruta)
  );

  return (
    <>
      {
        esPrivadaDoctor ? (
          <NavbarPrivadoDoctor />
        ) : esPrivada ? (
          <NavbarPrivado />
        ) : (
          <Navbar />
        )
      }
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-doctor" element={<LoginDoctorPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-doctor" element={<RegisterDoctorPage />} />
          <Route path="/dashboard/:userId" element={<DashboardPage />} />
          <Route path="/appointments/:userId" element={<AppointmentsPage />} />
          <Route path="/doctor-dashboard/:doctorId" element={<DoctorDashboardPage />} />
          <Route path="/doctor-appointments/:doctorId" element={<DoctorAppointmentsPage />} />
          <Route path="/doctors/:userId" element={<DoctorsPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/verify/:token" element={<VerifyPageDoctor />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;