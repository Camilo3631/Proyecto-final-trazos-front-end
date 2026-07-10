import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaStethoscope } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const DOCTORES_POR_PAGINA = 3;

const DashboardPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [mensaje, setMensaje] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [usuario, setUsuario] = useState(null);


  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
        const data = await response.json();

    
      if (response.ok) {
        setUsuario(data)
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    };
    }

    if (userId) {
       obtenerUsuario();
    }
  }, [userId]);

  useEffect(() => {
    if (!selectedDate) return;

    const fecha = selectedDate.toLocaleDateString('en-CA'); 

    const consultarDisponibilidad = async () => {
      setCargando(true);
      setDisponibilidad(null);
      setPaginaActual(1);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/disponibilidad/${fecha}`);
        const data = await response.json();
        setDisponibilidad(data);
      } catch (error) {
        console.error('Error al consultar disponibilidad:', error);
      } finally {
        setCargando(false);
      }
    };

    consultarDisponibilidad();
  }, [selectedDate]);

  const agendarCita = async (doctorId, doctorName, hora) => {
    try {
      const fecha = selectedDate.toLocaleDateString('en-CA');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/citas`,  {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, doctorId, doctorName, fecha, hora })
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`✅ Cita agendada con ${doctorName} el ${fecha} a las ${hora}`);
        setTimeout(() => setMensaje(null), 3000);
        setSelectedDate(new Date(selectedDate));
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      console.error("Error al agendar cita:", error);
    }
  };

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
    <div className="min-h-[calc(100vh-80px)] bg-slate-700 p-8">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl text-white font-bold text-center mb-2 mt-9">
          Bienvenido{usuario?.name ? `, ${usuario.name}`: ''}
        </h2>
        <p className="text-gray-300 text-center mb-10">
          Gestiona tus citas médicas
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              inline
            />
          </div>

          <div className="flex flex-col gap-6 h-full">
            <button
              onClick={() => navigate(`/doctors/${userId}`)}
              className="bg-white p-9 rounded-2xl shadow-md text-left hover:bg-gray-100 transition duration-300 flex-1">
              <h3 className="text-3xl font-semibold mb-2 flex items-center gap-2">
                <FaStethoscope className="text-blue-500" /> Ver doctores
              </h3>
              <p className="text-gray-500">Agenda una cita con un especialista.</p>
            </button>

            <button
              onClick={() => navigate(`/appointments/${userId}`)}
              className="bg-white p-9 rounded-2xl shadow-md text-left hover:bg-gray-100 transition duration-300 flex-1">
              <h3 className="text-3xl font-semibold mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-gray-400" /> Mis citas
              </h3>
              <p className="text-gray-500">Revisa tus citas agendadas.</p>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Disponibilidad</h3>

          {!selectedDate && (
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <FaCalendarAlt /> Selecciona un día para consultar disponibilidad
            </p>
          )}

          {cargando && (
            <p className="text-gray-400 text-sm">Consultando disponibilidad...</p>
          )}

          {!cargando && selectedDate && disponibilidad && (
            <div>
              <p className="text-gray-600 text-sm mb-2">
                {selectedDate.toLocaleDateString("es-CO")}
              </p>
              <p className={`font-semibold text-sm mb-4 ${disponibilidad.disponible ? 'text-green-600' : 'text-red-500'}`}>
                {disponibilidad.mensaje}
              </p>


              {disponibilidad.disponible && (
                <div>
                  <div className="flex justify-center mb-4">
                    <input
                      type="text"
                      placeholder="Buscar por especialidad..."
                      value={busqueda}
                      onChange={(e) => {setBusqueda(e.target.value); setPaginaActual(1); }}
                      className="w-64 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {doctoresPaginados.map((doctor) => (
                      <div key={doctor.doctorId} className="border border-gray-200 rounded-xl p-4 w-full md:w-72 mx-auto">
                        <p className="text-sm font-semibold text-gray-700 mb-1">{doctor.doctorName}</p>
                        <p className="text-xs text-gray-400 mb-3">{doctor.especialidad}</p>
                        <div className="flex flex-wrap gap-2">
                          {doctor.horasLibres.map((hora) => ( 
                            <button
                             key={hora}
                             onClick={() => agendarCita(doctor.doctorId, doctor.doctorName, hora)}
                             className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full hover:bg-green-200 transition">
                             {hora}
                          </button>
                         ))}
                        </div>
                      </div>
                      ))}
                  </div>

                  {doctoresFiltrados.length === 0 && (
                    <p className="text-gray-400 text-sm text-center mt-4">
                      No hay doctores  disponibles para esa especialidad.
                    </p>
                  )}

                  {totalPaginas > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-6">
                     {paginaActual > 1 && (
                       <button
                        onClick={() => setPaginaActual(p => Math.max(p - 1, 1))}
                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                        ← Anterior
                     </button>
                     )}
                     <span className="text-gray-500 text-xs">
                      {paginaActual} / {totalPaginas}
                     </span>
                      {paginaActual < totalPaginas && (
                         <button
                          onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))}
                          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
                          Siguiente →
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
                      )}

          {mensaje && (
            <div className="flex justify-center mt-6">
              <div className="max-w-xl w-full bg-green-100 text-green-700 px-6 py-4 rounded-xl shadow-md text-sm font-medium text-center">
                {mensaje}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { DashboardPage };
