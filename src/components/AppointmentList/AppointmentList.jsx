import { FaCalendarAlt, FaStethocope, FaClock } from "react-icons/fa";


const AppoimentList = ({ citas, cancelarCita}) => {
  return (
    <div className="grid grid-cols-1 md:gird-cols-2 gap-4">
      {citas.map((cita) => (
        <div key={cita._id} className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <FaStethocope className="text-blue-500 text-3xl"/>
            <h3 className="text-lg font-semibold">{cita.doctorName}</h3>
          </div>
          <div className="border-t pt-3 flex justify-between items-center">
            <div>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <FaCalendarAlt/> {cita.fecha}
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <FaClock /> {cita.hora}
               </p>
            </div>
           <button
             onClick={() => cancelarCita(cita._id)}
             className="bg-red-100 text-red-500 text-sm px-4 py-2 rounded-lg hover:bg-red-200 transition">
             Cancelar Cita
            </button>
          </div>
        </div>
      ))}
    </div>
   );
};


export { AppoimentList }