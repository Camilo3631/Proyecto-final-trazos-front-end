import { FaCalendarAlt, FaStethoscope, FaClock, FaNotesMedical, FaCheckCircle } from "react-icons/fa";

const AppoimentList = ({ citas, cancelarCita }) => {

const esCitaPasada = (fechaStr, horaStr) => {
  const hoy = new Date();
  const fechaCita = new Date(`${fechaStr}T${horaStr}`);
  return fechaCita < hoy;
};

return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {citas.map((cita) => {
    const finalizada = esCitaPasada(cita.fecha, cita.hora)
    const esSeguimiento = cita.tipo === 'seguimiento';
  

     return (
       <div
        key={cita._id}
        className={`bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3 transition-all ${
        finalizada ? "bg-slate-50 border border-slate-200 shadow-sm" : "" }`}
        >

       <div className="flex items-center gap-3">
         <FaStethoscope className={finalizada? "text-gray-400 text-3xl" : "text-blue-500 text-3xl"} />
          <h3 className={`text-lg font-semibold ${
           finalizada 
            ? "line-through decoration-red-500 decoration-2 text-gray-400" 
             : "text-slate-800"
          }`}>
           {cita.doctorName}
         </h3>
       </div>
       {esSeguimiento && (
         <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
           <FaCheckCircle /> SEGUIMIENTO
         </span>
       )}

      <div className="border-t pt-3 flex justify-between items-center">
        <div className={finalizada ? "line-through decoration-red-500 decoration-2 text-gray-400" : ""}>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <FaCalendarAlt /> {cita.fecha}
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <FaClock /> {cita.hora}
          </p>

          <p className="text-gray-600 text-sm flex items-center gap-2">
            <FaNotesMedical /> {cita.motivo}
          </p>
        </div>

        <button
          onClick={() => cancelarCita(cita._id)}
          className={`text-sm px-4 py-2 rounded-lg transition font-medium ${
            finalizada
               ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
               : "bg-red-100 text-red-500 hover:bg-red-200" 
            }`} 
            >
           {finalizada ? "Eliminar" : "Cancelar Cita"} 
            </button> 
          </div>
        </div>
        );
      })}
    </div>
  );
};

export { AppoimentList };