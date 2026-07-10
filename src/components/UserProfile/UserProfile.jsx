import { useState } from "react";
import { FaUser, FaEnvelope, FaTrash, FaEdit, FaCheck } from "react-icons/fa";


const UserProfile = ({ usuario, tipo, eliminarCuenta, editarNombre }) => {
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(usuario.name);

  const handleGuardar = () => {
    editarNombre(nuevoNombre);
    setEditando(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-center mb-6">Mi Perfil</h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b pb-4">
          <FaUser className="text-blue-500 text-xl"/>
          <div className="flex-1">
            <p className="text-xs text-gray-400">Nombre:</p>
            {editando ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="border rounded-lg px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleGuardar}
                  className="text-green-500 hover:text-green-600">
                  <FaCheck />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-medium">{usuario.name}</p>
                {tipo !== "doctor" && (
                  <button
                    onClick={() => setEditando(true)}
                    className="text-blue-400 hover:text-blue-600 ml-2">
                    <FaEdit/>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 border-b pb-4">
          <FaEnvelope className="text-blue-500 text-xl"/>
          <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-gray-700 font-medium">{usuario.email}</p>
          </div>
        </div>

        <button
          onClick={eliminarCuenta}
          className="mt-4 bg-red-100 text-red-500 px-4 py-3 rounded-lg hover:bg-red-200 transition w-full">
          <FaTrash className="inline mr-2"/>
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export { UserProfile };