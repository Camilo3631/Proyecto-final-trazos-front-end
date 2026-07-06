import { useEffect, useState } from 'react';
import { FaCalendarAlt  } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { AppoimentList } from '../../components/AppointmentList/AppointmentList';


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
               <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-4 mt-9">
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
                <AppoimentList citas={citas} cancelarCita={cancelarCita} />  
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




















