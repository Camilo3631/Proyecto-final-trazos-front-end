import { useEffect, useState } from "react";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const DoctorAppointmentsPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
 
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerCitasDoctor = async () => {
      try {
        const response = await fetch(
           `${import.meta.env.VITE_API_URL}/api/citas/doctor/${doctorId}`
        );

        const data = await response.json();

        const citasConUsuario = await Promise.all(
          data.map(async (cita) => {
            try {
              const responseUsuario = await fetch(
                `${import.meta.env.VITE_API_URL}/api/users/${cita.userId}`
              );

              if (responseUsuario.ok) {
                const usuario = await responseUsuario.json();

                return {
                  ...cita,
                  nombreUsuario: usuario.name,
                  emailUsuario: usuario.email,
                };
              }

              return cita;

            } catch (error) {
              console.error(
                "Error al obtener usuario:",
                error
              );

              return cita;
            }
          })
        );

        setCitas(citasConUsuario);

      } catch (error) {
        console.error("Error al obtener citas:", error);
        setCitas([]);

      } finally {
        setCargando(false);
      }
    };

    if (doctorId) {
      obtenerCitasDoctor();
    }

  }, [doctorId]);

  const citasFiltradas = citas.filter(
    (cita) => 
      cita.nombreUsuario
      ?.toLowerCase()
      .includes(busqueda.toLowerCase()) ||
    cita.emailUsuario
      ?.toLowerCase()
      .includes(busqueda.toLowerCase())
  );


  return (
    <div className="min-h-screen bg-slate-700 p-8">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-4 mt-9 ">
          <FaCalendarAlt />
          Citas agendadas
        </h2>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Buscar paciente..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="
                w-full
                pl-12
                pr-4
                py-3
                rounded-xl
                border
                border-gray-300
                bg-slate-600
                text-white 
                placeholder-slate-400 
                shadow-lg
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
              />  
          </div>
        </div>


        {cargando && (
          <p className="text-gray-300 text-center">
            Cargando citas...
          </p>
        )}

        {!cargando && citasFiltradas.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <p className="text-gray-500">
              No se encontraron citas.
            </p>
          </div>
        )}

         {!cargando && citasFiltradas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {citasFiltradas.map((cita) => { 

                const citaPasada =
                 new Date(`${cita.fecha}T${cita.hora}`) <  new Date()

                return (
                  <div
                   key={cita._id}
                   className={`
                     bg-white
                     rounded-2xl
                     shadow-lg
                     p-6
                     transition
                     ${
                       citaPasada
                         ? "opacity-60"
                         : "hover:scale-105"
                        }
                      `}
                      >

                      <h3
                       className={`text-xl font-bold mb-3 ${
                         citaPasada ? "line-through" : ""
                        }`}
                      >
                       {cita.nombreUsuario ||
                         "Usuario no disponible"}
                      </h3>

                      <p className={citaPasada ? "line-through" : ""}>
                        <strong>Email:</strong>{" "}
                        {cita.emailUsuario || "No disponible"}
                      </p>

                      <p className={citaPasada ? "line-through" : ""}>
                        <strong>Doctor:</strong>{" "}
                        {cita.doctorName}
                      </p>

                      <p className={citaPasada ? "line-through" : ""}>
                        <strong>Fecha:</strong>{" "}
                        {cita.fecha}
                      </p>

                      <p className={citaPasada ? "line-through" : ""}>
                        <strong>Hora:</strong>{" "}
                        {cita.hora}
                      </p>

                      <div className="mt-4">

                        {citaPasada ? (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                          Finalizada
                        </span>
                        ) : (
                         <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                          Próxima cita
                         </span>
                        )}
                      </div>

                    </div>
                   );
                  })}


                </div>
             )}

             <button
               onClick={() => 
                 navigate(`/doctor-dashboard/${doctorId}`)
               }
               className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition block mx-auto"
               >
                Volver al panel del doctor
             </button>
         </div>
     </div>
    );
 };
            
export { DoctorAppointmentsPage };       



                








//               // Detectar si la cita ya pasó
//               const citaPasada =
//                 new Date(`${cita.fecha}T${cita.hora}`) < new Date();

//               return ( */}
//                 <div
//                   key={cita._id}
//                   className={`
//                     bg-white
//                     rounded-2xl
//                     shadow-lg
//                     p-6
//                     transition
//                     ${
//                       citaPasada
//                         ? "opacity-60"
//                         : "hover:scale-105"
//                     }
//                   `}
//                 >

//                   <h3
//                     className={`text-xl font-bold mb-3 ${
//                       citaPasada ? "line-through" : ""
//                     }`}
//                   >
//                     {cita.nombreUsuario ||
//                       "Usuario no disponible"}
//                   </h3>


//                   <p className={citaPasada ? "line-through" : ""}>
//                     <strong>Email:</strong>{" "}
//                     {cita.emailUsuario || "No disponible"}
//                   </p>


//                   <p className={citaPasada ? "line-through" : ""}>
//                     <strong>Doctor:</strong>{" "}
//                     {cita.doctorName}
//                   </p>


//                   <p className={citaPasada ? "line-through" : ""}>
//                     <strong>Fecha:</strong>{" "}
//                     {cita.fecha}
//                   </p>


//                   <p className={citaPasada ? "line-through" : ""}>
//                     <strong>Hora:</strong>{" "}
//                     {cita.hora}
//                   </p>


//                   {/* Estado de la cita */}
//                   <div className="mt-4">

//                     {citaPasada ? (
//                       <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
//                         Finalizada
//                       </span>
//                     ) : (
//                       <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
//                         Próxima cita
//                       </span>
//                     )}

//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         )}


//         <button
//           onClick={() =>
//             navigate(`/doctor-dashboard/${doctorId}`)
//           }
//           className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition block mx-auto"
//         >
//           Volver al panel del doctor
//         </button>

//       </div>
//     </div>
//   );
// };

