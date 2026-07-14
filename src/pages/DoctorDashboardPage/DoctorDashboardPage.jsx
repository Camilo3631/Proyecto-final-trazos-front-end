import { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

const DoctorDashboardPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState()

  useEffect(() => {
      const obtDoctor = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/citas/doctor/${doctorId}`);
          const data = await response.json();
  
      
        if (response.ok) {
          setDoctor(data)
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
      };
      }
  
      if (doctorId) {
         obtDoctor();
      }
    }, [doctorId]);


 

  return (
    <div className="min-h-screen bg-slate-700 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mt-10 mb-3">
          {doctor?.[0]?.doctorName
          ? `${doctor[0].doctorName.startsWith("Dra.")
          ? "Panel de la"
          : "Panel del"} ${doctor[0].doctorName}`
          : "Panel del médico"}
        </h1>

        <p className="text-gray-300 text-center mb-10">
          Gestiona las citas de tus pacientes.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() =>
              navigate(`/doctor-appointments/${doctorId}`)
            }
            className="bg-white rounded-2xl p-8 shadow-lg text-left hover:scale-105 transition w-full max-w-md"
          >
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-3">
              <FaCalendarAlt className="text-green-500 textce" />
              Mis citas
            </h2>

            <p className="text-gray-500">
              Consulta las citas agendadas por tus pacientes.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export { DoctorDashboardPage };