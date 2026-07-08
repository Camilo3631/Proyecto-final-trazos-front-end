import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import './App.css'
import { Navabar } from "./shared/Navbar/Navbar";
import { NavbarPrivado } from "./shared/NavbarPrivado/NavbarPrivado";
import { Home } from './pages/HomePage/HomePage'
import { Login } from "./pages/LoginPage/LoginPage";
import { Register } from './pages/RegisterPage/RegisterPage'
import { Footer } from "./shared/Footer/Footer";
import { DashboardPage } from "./pages/DashboardPage/DashboardPage";
import { AppointmentsPage } from './pages/AppointmentsPage/AppointmentsPage';
import { DoctorsPage } from './pages/DoctorsPage/DoctorsPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';

const rutasPrivadas = ['/dashboard', '/appointments', '/doctors', '/profile'];

const Layout = ({ children }) => {
  const location = useLocation();
  const esPrivada = rutasPrivadas.some(ruta => location.pathname.startsWith(ruta));

  return (
    <>
      {esPrivada ? <NavbarPrivado /> : <Navabar />}
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
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/dashboard/:userId' element={<DashboardPage />} />
          <Route path='/appointments/:userId' element={<AppointmentsPage />} />
          <Route path='/doctors/:userId' element={<DoctorsPage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;