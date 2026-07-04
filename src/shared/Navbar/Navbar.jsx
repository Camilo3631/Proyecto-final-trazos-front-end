import { useState } from "react";
import { Link } from "react-router";

const Navabar = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);

  return (
   <nav className="bg-slate-700 shadow-md px-6 py-3 relative">
     <div className="flex flex-items justify-between">
       <Link to="/">
         <img src="/Logo.png" alt="Mój Lekarz" className="h-26 w-auto"/>
       </Link>

         <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="text-white focus:outline-none">
          {menuAbierto ? (
           <span className="text-4xl">x</span>
           ) : (
           <span className="text-4xl">☰</span>
            )}
          </button>
           </div>

          {menuAbierto && (
           <div className="absolute right-4 top-16 bg-slate-800 rounded-lg shadow-lg w-48 py-2 z-50">
             <Link
              to="/login"
              onClick={() => setMenuAbierto(false)}
              className="block px-4 py-2 text-sm text-white hover:bg-blue-700 transition">
               Iniciar sesión
             </Link>
             <Link
              to="/register"
              onClick={() => setMenuAbierto(false)}
              className="block px-4 py-2 text-sm text-white hover:bg-blue-700 transition">
               Crear cuenta
              </Link>
           </div>
         )}
     </nav>
   )
}

export { Navabar }