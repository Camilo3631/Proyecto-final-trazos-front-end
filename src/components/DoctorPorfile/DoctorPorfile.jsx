import { FaUser, FaEnvelope, FaTrash } from "react-icons/fa";

const DoctorProfile = ({ doctor, eliminarCuenta}) => {
    return (
     <div className="bg-white p-8 rounded-2xl shadow-md max-w-md mx auto">
        <h3 className="text-2xl font-bold text-center mb-6">
           Mi Perfil
        </h3>

        <div className="flex flex-col gap-4">

         <div className="flex items-center gap-3 border-b pb-4">
           <FaUser className="text-blue-500 text-xl"/>
         <div>
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-gray-700 font-medium">
              {doctor.name}
            </p>
         </div>
       </div>

       <div className="flex items-center gap-3 boder-b pb-4">
        <FaEnvelope className="text-blue-500 text-xl"/>
        <div>
          <p className="text-xs text-gray-400">Email</p>
          <p className="text-gray-700 fomt-medium">
            {doctor.email}
          </p>
        </div>
       </div>

       <button
         onClick={eliminarCuenta}
         className="mt-4 bg-red-100 text-red-500 px-4 py-3 rounded-lg hover:bg-red-200 transition w-full"
         >
         <FaTrash className="inline mr-2"/>
         Eliminar Cuenta
       </button>
     </div>
   </div>
   );
};

export { DoctorProfile }


