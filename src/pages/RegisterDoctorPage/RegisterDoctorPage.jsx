import { useState } from "react";
import { useNavigate } from "react-router";

const RegisterDoctorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    especialidad: '',
    horarios: []
  });
  const [nuevoHorario, setNuevoHorario] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const agregarHorario = () => {
    if (nuevoHorario.trim()) {
      setFormData({
        ...formData,
        horarios: [...formData.horarios, nuevoHorario]
      });
      setNuevoHorario('');
    }
  };

  const eliminarHorario = (index) => {
    setFormData({
      ...formData,
      horarios: formData.horarios.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('✅ Registro exitoso, verifica tu correo');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        console.log(data.mensaje);
      }
    } catch (error) {
      console.log('Error en la conexión:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-700 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg p-6 mt-50">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar Doctor</h2>
        
        {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña (mín 6 caracteres)"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
          <input
            type="text"
            name="especialidad"
            placeholder="Especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Horarios</label>
            <div className="flex gap-2 mb-2">
              <input
                type="time"
                value={nuevoHorario}
                onChange={(e) => setNuevoHorario(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={agregarHorario}
                className="bg-green-600 text-white px-4 py-2 rounded">
                Agregar
              </button>
            </div>

            {formData.horarios.length > 0 && (
              <div className="bg-gray-100 p-3 rounded">
                {formData.horarios.map((horario, index) => (
                  <div key={index} className="flex justify-between items-center mb-2 p-2 bg-white rounded">
                    <span className="text-sm">{horario}</span>
                    <button
                      type="button"
                      onClick={() => eliminarHorario(index)}
                      className="text-red-600 text-sm font-bold">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export { RegisterDoctorPage };