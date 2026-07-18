import { useEffect, useState } from "react";
import { FaCalendarAlt, FaSearch, FaTimes, FaCheckCircle, FaUser, FaEnvelope, FaClock, FaStethoscope, FaNotesMedical, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const DoctorAppointmentsPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
 
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');
  const [motivo, setMotivo] = useState('');
  const [cargandoSeguimiento, setCargandoSeguimiento] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    const obtenerCitasDoctor = async () => {
      try {
        const response = await fetch( `${import.meta.env.VITE_API_URL}/api/citas/doctor/${doctorId}`);
        const data = await response.json();

        const citasConUsuario = await Promise.all(
          data.map(async (cita) => {
            try {
              const responseUsuario = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${cita.userId}`);
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
              console.error("Error al obtener usuario:", error);
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

  const handleAgendarSeguimiento = (cita) => {
    setCitaSeleccionada(cita);
    setMostrarModal(true);
  };

  const handleEnviarSeguimiento = async () => {
    if (!nuevaFecha || !nuevaHora || !motivo.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    setCargandoSeguimiento(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/citas/seguimiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: citaSeleccionada.userId,
          doctorId: doctorId,
          doctorName: citaSeleccionada.doctorName,
          fecha: nuevaFecha,
          hora: nuevaHora,
          motivo: motivo,
          citaAnteriorId: citaSeleccionada._id
        })
      });

      if (response.ok) {
        setMensajeExito('✅ Cita de seguimiento agendada con éxito');
        setTimeout(() => setMensajeExito(''), 3000);
        setMostrarModal(false);
        setNuevaFecha('');
        setNuevaHora('');
        setMotivo('');
        setCitaSeleccionada(null);
      } else {
        const error = await response.json();
        alert(error.mensaje || 'Error al agendar seguimiento');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agendar seguimiento');
    } finally {
      setCargandoSeguimiento(false);
    }
  };

  const citasFiltradas = citas.filter(
    (cita) => 
      cita.nombreUsuario?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cita.emailUsuario?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const citasProximas = citasFiltradas.filter(c => new Date(`${c.fecha}T${c.hora}`) >= new Date());
  const citasFinalizadas = citasFiltradas.filter(c => new Date(`${c.fecha}T${c.hora}`) < new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white text-center flex items-center justify-center gap-3 mb-2">
            <FaCalendarAlt className="text-blue-400" />
            Citas agendadas
          </h2>
          <p className="text-gray-300 text-center">Gestiona y realiza seguimientos de tus pacientes</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar paciente por nombre o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-500 bg-slate-600 text-white placeholder-slate-400 shadow-lg outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />  
          </div>
        </div>

        {mensajeExito && (
          <div className="mb-6 max-w-2xl mx-auto bg-green-100 text-green-700 px-6 py-4 rounded-xl shadow-lg text-center font-semibold">
            {mensajeExito}
          </div>
        )}

        {cargando && (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-300 text-lg">Cargando citas...</p>
          </div>
        )}

        {!cargando && citasFiltradas.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <p className="text-gray-500 text-lg">No se encontraron citas con esos criterios de búsqueda.</p>
          </div>
        )}

        {!cargando && citasFiltradas.length > 0 && (
          <div className="space-y-8">
            
            {citasProximas.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-8 bg-green-400 rounded"></div>
                  Próximas citas ({citasProximas.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {citasProximas.map((cita) => (
                    <div
                      key={`${cita._id || 'sin-id'}-${cita.userId}-${cita.fecha}-${cita.hora}`}
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105"
                      >
                      <div className="flex items-start gap-3 mb-4">
                        <FaUser className="text-blue-500 text-2xl mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800">{cita.nombreUsuario || "Usuario no disponible"}</h3>
                          <p className="text-gray-500 text-sm flex items-center gap-1">
                            <FaEnvelope size={14} /> {cita.emailUsuario}
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <FaCalendarAlt className="text-blue-500" /> <strong>Fecha:</strong> {cita.fecha}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaClock className="text-blue-500" /> <strong>Hora:</strong> {cita.hora}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaStethoscope className="text-blue-500" /> <strong>Doctor:</strong> {cita.doctorName}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaNotesMedical className="text-blue-500"/> <strong>Motivo:</strong> {cita.motivo}
                        </p>
                      </div>
                      

                      <div className="mt-4">
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                          Próxima cita
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {citasFinalizadas.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-8 bg-orange-400 rounded"></div>
                  Citas finalizadas ({citasFinalizadas.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {citasFinalizadas.map((cita) => (
                    <div 
                       key={`${cita._id || 'sin-id'}-${cita.userId}-${cita.fecha}-${cita.hora}`}
                       className="bg-slate-100 rounded-2xl shadow-lg p-6 border-l-4 border-orange-400"
                      >
                      <div className="flex items-start gap-3 mb-4">
                        <FaUser className="text-gray-400 text-2xl mt-1" />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-700 line-through">{cita.nombreUsuario || "Usuario no disponible"}</h3>
                          <p className="text-gray-500 text-sm flex items-center gap-1">
                            <FaEnvelope size={14} /> {cita.emailUsuario}
                          </p>
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <FaCalendarAlt className="text-orange-500" /> <strong>Fecha:</strong> {cita.fecha}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaClock className="text-orange-500" /> <strong>Hora:</strong> {cita.hora}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaStethoscope className="text-orange-500" /> <strong>Doctor:</strong> {cita.doctorName}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaNotesMedical className="text-orange-500" /> <strong>Motivo:</strong> {cita.motivo}
                        </p>
                      </div>

                      <button
                        onClick={() => handleAgendarSeguimiento(cita)}
                        className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition font-semibold flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle /> Agendar seguimiento
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => navigate(`/doctor-dashboard/${doctorId}`)}
          className="mt-10 bg-slate-600 text-white px-8 py-3 rounded-lg hover:bg-slate-700 transition font-semibold flex items-center justify-center gap-2 mx-auto"
        >
          <FaArrowLeft /> Volver al panel del doctor
        </button>

        {mostrarModal && (
             <div className="fixed inset-0 bg-slate-700 bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                  ´<div className="flex justify-between items-center mb-6">
                     <h3 className="text-2xl font-bold text-slate-800">Agendar Seguimiento</h3>
                       <button
                         onClick={() => setMostrarModal(false)}
                         className="text-gray-400 hover:text-gray-600 transition"
                       >
                         <FaTimes size={24} />
                       </button>
                     </div>
       
                     <div className="mb-6 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                       <p className="text-slate-700 mb-1">
                         <strong>Paciente:</strong> {citaSeleccionada?.nombreUsuario}
                       </p>
                       <p className="text-slate-700 text-sm">
                         <strong>Cita anterior:</strong> {citaSeleccionada?.fecha} a las {citaSeleccionada?.hora}
                       </p>
                     </div>
       
                     <div className="space-y-4">
                       <div>
                         <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                           <FaCalendarAlt className="text-blue-500" /> Fecha
                         </label>
                         <input
                           type="date"
                           value={nuevaFecha}
                           onChange={(e) => setNuevaFecha(e.target.value)}
                           className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                         />
                       </div>
       
                       <div>
                         <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                           <FaClock className="text-blue-500" /> Hora
                         </label>
                         <input
                           type="time"
                           value={nuevaHora}
                           onChange={(e) => setNuevaHora(e.target.value)}
                           className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                         />
                       </div>
       
                       <div>
                         <label className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                           <FaNotesMedical className="text-blue-500" /> Motivo del seguimiento
                         </label>
                         <textarea
                           value={motivo}
                           onChange={(e) => setMotivo(e.target.value)}
                           placeholder="Ej: Control post-operatorio, revisión de resultados..."
                           className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition"
                           rows="4"
                         />
                       </div>
                     </div>
       
                     <div className="flex gap-3 mt-6">
                       <button
                         onClick={() => setMostrarModal(false)}
                         className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                       >
                         Cancelar
                       </button>
                       <button
                         onClick={handleEnviarSeguimiento}
                         disabled={cargandoSeguimiento}
                         className="flex-1 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition font-semibold disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                       >
                         {cargandoSeguimiento ? (
                           <>
                             <FaCheckCircle /> Agendando...
                           </>
                         ) : (
                           <>
                             <FaCheckCircle /> Agendar
                           </>
                         )}
                       </button>
                     </div>
                   </div>
                 </div>
               )}
             </div>
           </div>
         );
       };
       
       export { DoctorAppointmentsPage };