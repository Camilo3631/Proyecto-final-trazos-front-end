import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DoctorList } from "../../components/DoctorList/DoctorList";

const DoctorsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [doctores, setDoctores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDoctores = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/doctors`);
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
          className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition block mx-auto">
          Volver
        </button>
      </div>
    </div>
  );
};

export { DoctorsPage };