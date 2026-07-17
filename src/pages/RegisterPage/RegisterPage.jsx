import { useState } from "react";
import { useNavigate  } from "react-router";

const  Register = () => { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
          method: "POST",
          headers: {
           'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
          navigate("/login");
       } else {
        alert(data.mensaje || data.message || 'Error al registrar')
      }
    } catch (error) {
       console.error('Error al registrar', error);
      alert('No se pudo conectar con el servidor');
     }
   };

    return (
       <div className="min-h-screen flex items-center justify-center bg-slate-700">
        <form 
          onSubmit={handleSubmit}
          className="bg-slate-500 p-8 rounded-2xl shadow-md max-w-md w-full"
          >
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
           Registrar Usuario
          </h2>

          <input 
            type="text"
            placeholder="Nombre"
            className="w-full p-3 mb-4 border rounded-lg bg-slate-700 text-slate-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

          <input
           type="email"
           placeholder="Email"
           className="w-full p-3 mb-4 border rounded-lg bg-slate-700 text-slate-400"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           />

          <input
            type="password"
            placeholder="password"
            className="w-full p-3 mb-6 border rounded-lg bg-slate-700 text-slate-400"
            className="w-full p-3 mb-4 border rounded-lg bg-slate-700 text-slate-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />

          <input
          type="password"
          placeholder="Confirmar contraseña"
          className="w-full p-3 mb-6 border rounded-lg bg-slate-700 text-slate-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />


         <button
           type="submit"
           className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
         >
           Crear cuenta
         </button>
       </form>
     </div>
   );
};

export { Register };