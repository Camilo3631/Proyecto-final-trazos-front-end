import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const NavbarPrivadoDoctor = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const doctorId = location.pathname.split('/')[2];

  const cerrarSesión = () => {
    setMenuAbierto(false);
    navigate('/login');
  };

  return (
    <nav className="bg-slate-700 shadow-md px-6 py-3 relative">
      <div className="flex items-center justify-between">
        <Link to={`/dashboard/${doctorId}`}>
          <img src="/Logo.png" alt="Mój Lekarz" className="h-23 w-auto"/>
        </Link> 
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="text-white focus:outline-none">
          {menuAbierto ? (
            <span className="text-xl">x</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>
      </div>

      {menuAbierto && (
        <div className="absolute right-4 top-16 bg-slate-800 rounded-lg shadow-lg w-48 py-2 z-50">
          <Link
            to={`/doctor-dashboard/${doctorId}`}
            onClick={() => setMenuAbierto(false)}
            className="block px-4 py-2 text-sm text-white hover:bg-slate-700 transition">
            Dashboard
          </Link>
          <Link
            to={`/doctor-appointments/${doctorId}`}
            onClick={() => setMenuAbierto(false)}
            className="block px-4 py-2 text-sm text-white hover:bg-slate-700 transition">
            Mis citas
          </Link>
          <div className="border-t border-slate-600 mt-2 pt-2">
            <button
              onClick={cerrarSesión}
              className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 transition">
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export { NavbarPrivadoDoctor };