import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-slate-700 shadow-md px-6 py-3 relative">
      <div className="flex items-center justify-between">
        <Link to="/">
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
        <div className="absolute right-4 top-16 bg-slate-900 rounded-lg shadow-xl w-56 overflow-hidden z-50 flex flex-col">
          
   
          <div className="bg-slate-800 p-3">
            <span className="block px-2 pb-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
               Pacientes
            </span>
            <div className="flex flex-col gap-1">
              <Link
                to="/login"
                onClick={() => setMenuAbierto(false)}
                className="block px-2 py-1.5 text-sm text-white hover:bg-blue-700 rounded transition">
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuAbierto(false)}
                className="block px-2 py-1.5 text-sm text-slate-300 hover:bg-blue-700 hover:text-white rounded transition">
                Crear cuenta
              </Link>
            </div>
          </div>

       
          <div className="bg-slate-850 border-t border-slate-700 p-3">
            <span className="block px-2 pb-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              Médicos
            </span>
            <div className="flex flex-col gap-1">
              <Link
                to="/login-doctor"
                onClick={() => setMenuAbierto(false)}
                className="block px-2 py-1.5 text-sm text-white hover:bg-teal-700 rounded transition">
                Iniciar sesión
              </Link>
              <Link
                to="/register-doctor"
                onClick={() => setMenuAbierto(false)}
                className="block px-2 py-1.5 text-sm text-slate-300 hover:bg-teal-700 hover:text-white rounded transition">
                Crear cuenta
              </Link>
            </div>
          </div>

        </div>
      )}
    </nav>
  );
};

export { Navbar };