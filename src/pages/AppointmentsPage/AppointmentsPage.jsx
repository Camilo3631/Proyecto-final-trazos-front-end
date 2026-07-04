import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaStethoscope, FaClock  } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const AppointmentsPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [citas, setCitas] = useState([]);
    const [cargando, setCargando] = useState(true);


  useEffect(() => {
     const obternerCitas = async () => {
       try {
         const response = await fetch(`http://localhost:3000/api/citas/${userId}`);
          const data = await response.json();
          setCitas(data);
          } catch (error) {
            console.error('Error al obtener las citas:', error);
          } finally {
            setCargando(false);
           }
        };

     obternerCitas();
     }, [userId])

     const cancelarCita = async (citaId) => {
         try {
            const response = await fetch(`http://localhost:3000/api/citas/${citaId}`, {
               method: 'DELETE'
             }); 

             if (response.ok) {
              setCitas(citas.filter(cita => cita._id !== citaId)); 
                 
                  }
             } catch (error) {
                 console.error('Error al cancelar cita:', error);
            }
        }

        return (
            <div className="min-h-screen bg-slate-700 p-8">
              <div className="max-w-4xl mx-auto">
               <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-4">
               <FaCalendarAlt />  Mis citas
              </h2>
              

              {cargando && (
                <p className="text-gray-300 text-center">Cargando citas...</p>
              )}

              {!cargando && citas.length === 0 && (
                 <div className="bg-white p-6 rounded-2xl text-center">
                    <p className="text-gray-500">No tienes citas guardadas</p>
                 </div>
              )}

              {!cargando && citas.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {citas.map((cita) => (
                   <div key={cita._id} className='bg-white p-6 rounded-2xl shadow-md flex flex-col gap-3'>
                    <div className="flex items-center gap-3">
                      <FaStethoscope className='text-blue-500 text-3xl'/>
                      <h3 className='text-lg font-semibold'>{cita.doctorName}</h3>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                       <div>
                         <p className='text-gray-500 text-sm items-center gap-1'>
                          <FaCalendarAlt/> {cita.fecha}
                         </p>
                         <p className="text-gray-500 text-sm flex items-center gap-1">
                          <FaClock /> {cita.hora}
                         </p>
                       </div>
                       <button 
                         onClick={() => cancelarCita(cita._id)}
                         className='bg-red-100 text-red-500 text-sm px-4 py-2 rounded-lg hover:bg-red-200 transition'>
                           Cancelar Cita
                         </button>
                    </div>
                  </div>
                 ))}
                </div>
               )}
               <button
                onClick={() => navigate(`/dashboard/${userId}`)}
                className='mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition block mx-auto'>
                  Volver
              </button>
            </div>
           </div>
        )
   }

 export { AppointmentsPage };













