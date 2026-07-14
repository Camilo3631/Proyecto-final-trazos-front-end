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
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

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
     setError('');

     if (
      !formData.nombre ||
      !formData.email || 
      !formData.password ||
      !formData.especialidad ||
      formData.horarios.length === 0
     ) {
       setError('Todos los campos son obligatorios');
       return;
     }

     if (formData.password.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres');
      return;
     }

     setCargando(true);

     try {
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/register`, {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData)
       }
      );

      const data = await response.json();

      if (response.ok) {
        navigate(`/verify-code?email=${encodeURIComponent(formData.email)}`);
      } else {
        setError(data.mensaje || 'Error al registrarse');
      }
     } catch (error) {
       console.log('Error en la conexión:', error);
       setError('No se puede conectar con el servidor');
     } finally {  
       setCargando(false);
     }
   };

   return (
    <div className="min-h-screen bg-slate-700 p-8 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-slate-500 rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
          Registrar Doctor
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm">{error}</p>
          </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-4">
          <input
           type="text"
           name="nombre"
           placeholder="Nombre"
           value={formData.nombre}
           onChange={handleChange}
           className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-slate-400" 
           disabled={cargando}
           required
           />

           <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-slate-400"
            disabled={cargando}
            required
            />

           <input 
            type="password"
            name="password"
            placeholder="Contraseña (min 6 caracteres)"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-slate-400"
            disabled={cargando}
            required
            />

            <input
             type="text"
             name="especialidad"
             placeholder="Especialidad"
             value={formData.especialidad}
             onChange={handleChange}
             className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-slate-400"
             disabled={cargando}
             required
             />

             <div className="mb-4">
               <label className="block text-sm font-semibold mb-2 text-white">
                 Horarios
               </label>

               <div className="flex gap-2 mb-2">
                <input
                 type="time"
                 value={nuevoHorario}
                 onChange={(e) => setNuevoHorario(e.target.value)}
                 className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-700 text-slate-400"
                 disabled={cargando}
                 />
                 <button
                  type="button"
                  onClick={agregarHorario}
                  className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                  disabled={cargando}
                  >
                   Agregar
                  </button>
               </div>

               {formData.horarios.length > 0 && ( 
                <div className="bg-slate-700 p-3 rounded-lg">
                  {formData.horarios.map((horario, index) => (
                    <div
                     key={index}
                     className="flex justify-between items-center mb-2 p-2 bg-slate-700 rounded"
                     >
                      <span className="text-sm text-slate-400">{horario}</span>
                      <button
                        type="button"
                        onClick={() => eliminarHorario(index)}
                        className="text-red-600 text-sm font-bold hover:text-red-700 disabled:text-gray-400"
                        disabled={cargando}
                        >
                          ✕
                        </button>
                      </div>
                     ))}
                 </div>
                 )}
             </div>

             <button
               type="submit"
               className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
               disabled={cargando}
               >
                {cargando ? 'Registrando...' : 'Registrar'}
             </button>
         </form>

         <p className="text-center text-slate-300 text-sm mt-4">
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={() => navigate('/login-doctor')}
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Inicia sesión
           </button>
         </p>
      </div>
    </div>
   );
};
 

export { RegisterDoctorPage };