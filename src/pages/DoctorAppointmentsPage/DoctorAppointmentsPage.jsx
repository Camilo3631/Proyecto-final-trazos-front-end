import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const DoctorAppointmentsPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerCitasDoctor = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/citas/doctor/${doctorId}`
        );

        const data = await response.json();

        const citasConUsuario = await Promise.all(
          data.map(async (cita) => {
            try {
              const responseUsuario = await fetch(
                `http://localhost:3000/api/users/${cita.userId}`
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


  return (
    <div className="min-h-screen bg-slate-700 p-8">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-bold text-white text-center mb-8 flex items-center justify-center gap-4 mt-9">
          <FaCalendarAlt />
          Citas agendadas
        </h2>


        {cargando && (
          <p className="text-gray-300 text-center">
            Cargando citas...
          </p>
        )}


        {!cargando && citas.length === 0 && (
          <div className="bg-white rounded-2xl p-6 text-center">
            <p className="text-gray-500">
              No tienes citas agendadas.
            </p>
          </div>
        )}


        {!cargando && citas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {citas.map((cita) => (
              <div
                key={cita._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <h3 className="text-xl font-bold mb-3">
                  {cita.nombreUsuario || "Usuario no disponible"}
                </h3>


                <p>
                  <strong>Email:</strong>{" "}
                  {cita.emailUsuario || "No disponible"}
                </p>


                <p>
                  <strong>Doctor:</strong> {cita.doctorName}
                </p>


                <p>
                  <strong>Fecha:</strong> {cita.fecha}
                </p>


                <p>
                  <strong>Hora:</strong> {cita.hora}
                </p>

              </div>
            ))}

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