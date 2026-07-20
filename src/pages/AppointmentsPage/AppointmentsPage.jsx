import { useEffect, useState } from "react";
import { FaCalendarAlt, FaArrowLeft, FaCheckCircle,  FaStethoscope } from "react-icons/fa";
import {  useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AppoimentList } from "../../components/AppointmentList/AppointmentList";

const AppointmentsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUsuario(data);
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      }
    };

    if (userId) {
      obtenerUsuario();
    }
  }, [userId]);

  useEffect(() => { 
    const obtenerCitas = async () => {
      try {
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/citas/${userId}`);
        const data = await response.json();

        setCitas(data);
      } catch (error) {
        console.error('Error al obtener las citas:', error);
      } finally {
        setCargando(false);
      }
    };
 
     obtenerCitas();

     const intervalo = setInterval(() => {
       obtenerCitas();
     }, 30000);

     return() => clearInterval(intervalo);
   }, [userId]);

   const cancelarCita = async (citaId) => {
     const result = await Swal.fire({
      title: 'Cancelar cita',
      text: 'La cita será eliminada del sistema.',
      showCancelButton: true,
      confirmButtonText: 'Cancelar cita',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      reverseButtons: true,
      width: '290px',
      padding: '1.2rem',
      customClass: {
      popup: 'rounded-3xl'
     }
    
  });

  if (!result.isConfirmed) return;

  try {
   const response = await fetch(`${import.meta.env.VITE_API_URL}/api/citas/${citaId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
      setCitas(prev => 
        prev.filter(cita => cita._id !== citaId)
      );

      await Swal.fire({
        title: 'Cita cancelada',
        text: 'La cita fue cancelada correctamente.',
        timer: 1500,
        showConfirmButton: false,
        width: '200px',
        padding: '1.30rem'
      });
     }
    } catch (error) {
      console.error('Error al cancelar cita:', error);

       Swal.fire({
        title: 'Error',
        text: 'No se pudo cancelar la cita.',
        confirmButtonColor: '#ef4444',
        width: '150px'
      });
     }
   };

   

   

   const citasProximas = citas
     .filter(c => new Date(`${c.fecha}T${c.hora}`) >= new Date())
     .filter(c => c.tipo !== 'seguimiento');
   
   const citasFinalizadas = citas.filter(
    c => new Date(`${c.fecha}T${c.hora}`) < new Date()
   );

   const citasSeguimiento = citas.filter(
      c => c.tipo === 'seguimiento'
   );

   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <FaCalendarAlt className="text-blue-400"/>
             Mis citas médicas
          </h1>

           <p className="text-gray-300">
             {usuario?.name &&
              `Hola ${usuario.name}, aquí están todas tus citas agendadas`}
            </p>
           </div>

           {cargando && (
             <div className="flex items-center justify-center py-20">
               <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-400"></div>
               <div className="ml-6 text-gray-300 text-lg font-medium">
                 Cargando tus citas...
               </div>
             </div>
           )}

           {!cargando && citas.length === 0 && (
            <div className="bg-white rounded-2xl p-16 text-center shadow-2xl">
              <FaCalendarAlt className="text-6xl text-gray-300 mx-auto mb-6"/>
            <p className="text-gray-600 text-xl font-medium mb-8">
              No tienes citas guardadas aún
            </p>

            <button
             onClick={() => navigate(`/dashboard/${userId}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition transform hover:scale-105"
            >
              Agendar mi primera cita
            </button>
           </div>
           )}

           {!cargando && citas.length > 0 && (
             <div className="space-y-10">

              {citasProximas.length > 0 && (
                <div>
                 <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-green-400 rounded"></div>
                    <h2 className="text-3xl font-bold text-white">
                       Citas próximas
                    </h2>

                    <span className="ml-auto bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {citasProximas.length}
                    </span>
                 </div>

                 <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <AppoimentList
                   citas={citasProximas}
                   cancelarCita={cancelarCita}
                   />
                 </div>
                </div>
                )}

                {citasSeguimiento.length > 0 && (
                  <div>
                   <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-10 bg-purple-400 rounded"></div>
                    <h2 className="text-3xl font-bold text-white">
                      Citas de seguimiento
                    </h2>

                   <span className="ml-auto bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                    {citasSeguimiento.length}
                   </span>
                  </div>

                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <AppoimentList
                     citas={citasSeguimiento}
                     cancelarCita={cancelarCita}
                     />
                  </div>
                </div>
                )}


               {citasFinalizadas.length > 0 && (
                <div>
                 <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-10 bg-gray-400 rounded"></div>
                  <h2 className="text-3xl font-bold text-white">
                     Citas completadas
                  </h2>

                  <span className=" ml-auto bg-gray-500 text-white px-4 py-2 rounded-full font-bold text-lg">
                    {citasFinalizadas.length}
                  </span>
                 </div>

                 <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <AppoimentList
                   citas={citasFinalizadas}
                   cancelarCita={cancelarCita}
                   />
                 </div>
                </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">
                        Próximas citas
                      </p>
                      <p className="text-4xl font-bold">
                        {citasProximas.length}
                      </p>
                    </div>

                    <FaCalendarAlt className="text-5xl opacity-20"/>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">
                        Seguimientos
                      </p>
                      <p className="text-4xl font-bold">
                        {citasSeguimiento.length}
                      </p>
                    </div>

                    <FaCheckCircle className="text-5xl opacity-20"/>
                  </div>
                </div>

              <div className="bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-100 text-sm font-medium">
                        Completadas
                      </p>
                      <p className="text-4xl font-bold">
                       {citasFinalizadas.length}
                      </p>
                    </div>

                    <FaStethoscope className="text-5xl opacity-20"/>
                  </div>
                </div>
              
              </div>

            </div>
           )}

          <button
            onClick={() => navigate(`/dashboard/${userId}`)}
            className="mt-12 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-8 py-4 rounded-lg font-bold transition transform hover:scale-105 flex items-center gap-2 mx-auto shadow-lg"
            >
           <FaArrowLeft />
            Volver al dashboard
          </button>

         </div>
      </div>
    );
 }

 export { AppointmentsPage };

                

























