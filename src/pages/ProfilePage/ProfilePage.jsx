import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserProfile } from "../../components/UserProfile/UserProfile";


const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

     const obtenerUsuario= async () => {
       try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
         const data = await response.json();
         setUsuario(data)
       } catch (error) {
         console.error('Error al obtener usuario:', error);
       } finally {
          setCargando(false)
       };
     };

     obtenerUsuario()
  }, [userId]);

  const editarNombre = async (nuevoNombre) => {
    try {
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: nuevoNombre })
       });

       if (response.ok) {
           setUsuario({...usuario, name: nuevoNombre});
       }
      } catch (error) {
      console.log('Error al editar nombre:', error);
    }
  };

  const eliminarCuenta = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
         method: 'DELETE',
      })

      if (response.ok) {
        navigate('/register')
      }  
    } catch (error) {
       console.log('Error al eliminar la cuenta', error);
   }
  }

  if (cargando) return <p className="text-white text-center mt-10">Cargando...</p>

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-700 flex items-center justify-center p-8">
       <div className="w-full max-w-md">
         {usuario && (
          <UserProfile
            usuario={usuario}
            editarNombre={editarNombre}
            eliminarCuenta={eliminarCuenta}
            />
           )}
          <button
             onClick={() => navigate(`/dashboard/${userId}`)}
             className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition block mx-auto">
              Volver
          </button>
       </div>
    </div>
  )
}

export { ProfilePage };








