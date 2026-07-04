import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DashboardPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    const fecha = selectedDate.toISOString().split('T')[0];

    const consultarDisponibilidad = async () => {
      setCargando(true);
      setDisponibilidad(null);
      try {
        const response = await fetch(`http://localhost:3000/api/disponibilidad/${fecha}`);
        const data = await response.json();
        setDisponibilidad(data);
      } catch (error) {
        console.error("Error al consultar disponibilidad:", error);
      } finally {
        setCargando(false);
      }
    };

    consultarDisponibilidad();
  }, [selectedDate]);

  const agendarCita = async (doctorId, doctorName, hora) => {
    try {
      const fecha = selectedDate.toISOString().split('T')[0];

      const response = await fetch('http://localhost:3000/api/citas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, doctorId, doctorName, fecha, hora })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ Cita agendada con ${doctorName} el ${fecha} a las ${hora}`);
        setSelectedDate(new Date(selectedDate));
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      console.error("Error al agendar cita:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-700 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl text-white font-bold text-center mb-2">
          Bienvenido
        </h2>
        <p className="text-gray-300 text-center mb-10">
          Gestiona tus citas médicas
        </p>
        <div className="flex flex-col lg:flex-row gap-8">

         
          <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-center lg:w-1/2">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              inline
            />
          </div>


          <div className="flex flex-col gap-6 lg:w-1/2">
            <button
              onClick={() => navigate(`/doctors/${userId}`)}
              className="bg-white p-6 rounded-2xl shadow-md text-left hover:bg-gray-100 transition duration-300">
              <h3 className="text-2xl font-semibold mb-2">🩺 Ver doctores</h3>
              <p className="text-gray-500">Agenda una cita con un especialista.</p>
            </button>

            <button
              onClick={() => navigate(`/appointments/${userId}`)}
              className="bg-white p-6 rounded-2xl shadow-md text-left hover:bg-gray-100 transition duration-300">
              <h3 className="text-2xl font-semibold mb-2">📅 Mis citas</h3>
              <p className="text-gray-500">Revisa tus citas agendadas.</p>
            </button>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Disponibilidad</h3>

              {!selectedDate && (
                <p className="text-gray-400 text-sm">📅 Selecciona un día para consultar disponibilidad</p>
              )}

              {cargando && (
                <p className="text-gray-400 text-sm">Consultando disponibilidad...</p>
              )}

              {!cargando && selectedDate && disponibilidad && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">
                    {selectedDate.toLocaleDateString("es-CO")}
                  </p>
                  <p className={`font-semibold text-sm ${disponibilidad.disponible ? 'text-green-600' : 'text-red-500'}`}>
                    {disponibilidad.mensaje}
                  </p>

                  {disponibilidad.disponible && disponibilidad.doctores && (
                    <div className="mt-3 flex flex-col gap-3">
                      {disponibilidad.doctores.map((doctor) => (
                        doctor.disponible && (
                          <div key={doctor.doctorId}>
                            <p className="text-sm font-semibold text-gray-700">{doctor.doctorName}</p>
                            <div className="flex flex-wrap gap-2 mt-1">
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
                        )
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardPage };