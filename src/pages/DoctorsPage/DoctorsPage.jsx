import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft }from "react-icons/fa";
import { DoctorList } from "../../components/DoctorList/DoctorList";

const DoctorsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [doctores, setDoctores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDoctores = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors`);
        const data = await response.json();
        setDoctores(data);
      } catch (error) {
        console.error("Error al obtener doctores:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDoctores();
  }, []);

  return (
    <div className="min-h-screen bg-slate-700 p-8">
      <div className="max-w-6xl mx-auto mt-9">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Nuestros doctores
        </h2>

        {cargando && (
          <p className="text-gray-300 text-center">Cargando doctores...</p>
        )}

        {!cargando && doctores.length === 0 && (
          <p className="text-gray-300 text-center">No hay doctores disponibles.</p>
        )}

        {!cargando && doctores.length > 0 && (
          <DoctorList doctores={doctores} />
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
};

export { DoctorsPage };