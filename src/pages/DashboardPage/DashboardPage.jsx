import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaStethoscope, FaClock, FaUser, FaSearch, FaPencilAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BsCalendarCheck } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";

const DOCTORES_POR_PAGINA = 3;

const DashboardPage = () => {
  const { userId } = useParams()
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [mensaje, setMensaje] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [motivo, setMotivo] = useState('');

 useEffect(() => {
   const obtenerUsuario = async () => {
     try {
       const response = await fetch(`http://localhost:3000/api/users/${userId}`);
       const data = await response.json();


      if (response.ok) {
        setUsuario(data)
      }
     } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
   }

   if (userId) {
     obtenerUsuario();
   }
  }, [userId]);

  useEffect(() => {
    if (!selectedDate) return

     const fecha = selectedDate.toLocaleDateString('en-CA'); 

    const consultarDisponibilidad = async () => {
       setCargando(true)
       setDisponibilidad(null)
       setPaginaActual(1)
       try {
        const response = await fetch(`http://localhost:3000/api/disponibilidad/${fecha}`);
         const data = await response.json();
         setDisponibilidad(data);
       } catch (error) {
         console.error('Error al consultar disponibilidad:', error)
       } finally {
         setCargando(false);
       }
    };

    consultarDisponibilidad();
  }, [selectedDate]);

  const agendarCita = async (doctorId, doctorName, hora) => {
     if (!motivo.trim()) {
       alert('Por favor, describe el motivo de tu consulta');
      return;
     }

     try {
        const fecha = selectedDate.toLocaleDateString('en-CA');

        const response = await fetch(`http://localhost:3000/api/citas`,  {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
           body: JSON.stringify({ 
            userId,
            doctorId,
            doctorName,
            fecha,
            hora,
            motivo })
         })

         const data = await response.json()

         if (response.ok) {
           setMensaje(`✅ Cita agendada con ${doctorName} el ${fecha} a las ${hora}`);
           setTimeout(() => setMensaje(null), 4000);
           setMotivo('');
           setSelectedDate(new Date(selectedDate)); 
         } else {
           alert(data.mensaje);
         }
       } catch (error) {
         console.error("Error al agendar cita:", error);
       }
      }

       const doctoresDisponibles = disponibilidad?.doctores?.filter(d => d.disponible) || [];

      const doctoresFiltrados = busqueda
       ? doctoresDisponibles.filter(doctor => 
          doctor.especialidad.toLowerCase().includes(busqueda.toLocaleLowerCase()) ||
          doctor.doctorName.toLowerCase().includes(busqueda.toLocaleLowerCase()) 
       )
       : doctoresDisponibles;

    const totalPaginas = Math.ceil(doctoresFiltrados.length / DOCTORES_POR_PAGINA);
    const doctoresPaginados = doctoresFiltrados.slice(
      (paginaActual - 1) * DOCTORES_POR_PAGINA,
      paginaActual * DOCTORES_POR_PAGINA
    );

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-800 to-slate-700 p-12">
          <div className="w-full max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-white mb-2">
                Bienvenido{usuario?.name ? `, ${usuario.name}` : ''}
              </h1>
              <p className="text-gray-300 text-lg">Agenda tus citas médicas de forma rápida y segura</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

              <div className="bg-white rounded-2xl shadow-2xl p-5 lg:col-span-1 flex flex-col items-center">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500"/> Selecciona una fecha
                </h2>
                 <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={new Date()}
                  inline
                  wrapperClassName="flex justify-center"
                  calendarClassName="shadow-none border-none"
                  />
              </div>


              <div className="flex flex-col gap-8 h-full lg:col-span-2">
                <button
                  onClick={() => navigate(`/doctors/${userId}`)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 p-10 rounded-2xl shadow-xl text-left transition text-white"
                  >
                 <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
                   <FaStethoscope/> Ver doctores
                 </h3>
                  <p className="text-blue-100">Explora todos nuestros especialistas disponibles</p>
                </button>

                <button
                  onClick={() => navigate(`/appointments/${userId}`)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 p-10 rounded-2xl shadow-xl text-left transition transform  text-white"
                  >
                  <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <FaCalendarAlt/> Mis citas
                  </h3>
                  <p className="text-green-100">Consulta tus citas agendadas y pendientes</p>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                <BsCalendarCheck className="inline mr-2" /> Disponibilidad
              </h3>

            {!selectedDate && (
              <div className="flex items-center gap-4 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <FaCalendarAlt className="text-blue-500 text-2xl"/>
                <p className="text-slate-700 font-medium">
                   Selecciona un día en el calendario para ver la disponibilidad de nuestros doctores
                </p>
              </div>
             )}

             {cargando && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                 <p className="ml-4 text-slate-700 font-medium">Consultando disponibilidad...</p>
              </div>
             )}

             {!cargando && selectedDate && disponibilidad && (
              <div>
                <div className="mb-6 p-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg">
                  <p className="text-slate-600 font-medium">
                  <FaCalendarAlt className="inline mr-2" /> {selectedDate.toLocaleDateString("es-CO", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                   <p className={`font-bold text-lg mt-2 ${disponibilidad.disponible ? 'text-green-600' : 'text-red-500'}`}>
                    {disponibilidad.mensaje}
                  </p>
                </div>

                {disponibilidad.disponible && (
                  <div>
                    <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                     <label className="block text-lg font-bold text-slate-700 mb-3">
                       <FaPencilAlt className="inline mr-2" /> ¿Cuál es el motivo de tu consulta?
                      </label>
                      <textarea
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        placeholder="Describe brevemente tu motivo de consulta..."
                        className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-slate-700"
                        rows="3"
                        /> 
                      </div>

                      <div className="mb-8">
                        <div className="relative w-full">
                          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                          <input
                           type="text"
                           placeholder="Busca por especialidad o nombre del doctor..."
                           value={busqueda}
                           onChange={(e) => {setBusqueda(e.target.value); setPaginaActual(1); }}
                           className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                           />
                        </div>
                      </div>

                      {doctoresFiltrados.length === 0 ? (
                        <div className="text-center py-12">
                          <FaStethoscope className="text-sm text-gray-300 mx-auto mb-4" />
                           <p className="text-gray-500 text-lg">
                            No hay doctores disponibles para esa especialidad en esta fecha
                          </p>
                      </div>
                      ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctoresPaginados.map((doctor) => (
                          <div
                           key={doctor.doctorId} 
                           className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition bg-gradient-to-r from-white to-gray-50"
                           >
                          <div className="flex items-start justify-between mb-4">
                             <div className="flex items-start gap-4 flex-1">
                              <FaUser className="text-blue-500 text-xs mt-1"/>
                           <div className="flex-1">
                             <h3 className="text-2xl font-bold text-slate-800">{doctor.doctorName}</h3>
                              <p className="text-blue-600 font-semibold">{doctor.especialidad}</p>
                             </div>
                           </div>
                         </div>

                         <div className="mb-4">
                           <p className="text-slate-600 font-medium mb-3">Horarios disponibles:</p>
                         <div className="flex flex-wrap gap-2">
                           {doctor.horasLibres.map((hora) => (
                           <button
                             key={hora}
                             onClick={() => agendarCita(doctor.doctorId, doctor.doctorName, hora)}
                             className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition transform hover:scale-110 flex items-center gap-2"
                           > 
                            <FaClock size={11} /> {hora}
                           </button>
                           ))}
                          </div>
                        </div>
                      </div>
                     ))}
                    </div>
                  )}

                  {totalPaginas > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-8">
                      {paginaActual > 1 && (
                        <button
                         onClick={() => setPaginaActual(p => Math.max(p -1, 1))}
                         className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition font-semibold"
                         >
                         <FaArrowLeft className="inline mr-2" /> Anterior
                        </button>
                      )}
                     <span className="bg-blue-100 text-blue-700 px-6 py-2 rounded-lg font-bold">
                      {paginaActual} / {totalPaginas}
                     </span>
                     {paginaActual < totalPaginas && (
                       <button
                        onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition font-semibold"
                       >
                        Siguiente <FaArrowRight className="inline ml-2" />
                      </button>
                     )}
                    </div>
                    )}
                  </div>
                )}
              </div>
             )}

             {mensaje && (
              <div className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-8 py-6 rounded-xl shadow-lg text-center font-bold border-l-4 border-green-500">
                {mensaje}
              </div>
              )}
            </div>
        </div>
     </div>
   );
};

export { DashboardPage };

