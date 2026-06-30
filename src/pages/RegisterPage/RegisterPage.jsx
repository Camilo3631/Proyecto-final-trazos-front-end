import {  useEffect, useState  } from "react";
import { useNavigate } from "react-router"; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [enviarFormulario, setEnviarFormulario] = useState(null);

    const navigate  = useNavigate();


   useEffect(() => {
       
    if (!enviarFormulario) return;

        const RegisterUser = async () => {
            try {
                // Ruta actualizada a /api/register con método POST
                const response = await fetch("http://localhost:3000/api/register", {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // Enviamos las variables al servidor
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    }) 
                });
                const data = await response.json();
                
                console.log("Respuesta de /api/register al cargar:", data);

                if (response.ok) {
                  navigate('/Login');
                } else {
                    alert(data.message || 'Error al registrar');
                }

               } catch (error) {
                console.error("Error al consumir la API en el montaje (POST):", error);
            } finally {
             setEnviarFormulario(false)
            }
           
        };
        RegisterUser();
        return () => {
             console.log('Registro desmontado');
        };
    }, [enviarFormulario, name, email, password, navigate]); // Al dejar el array vacío [], se ejecuta una sola vez al montar


    const handleSubmit = (e) => {
      e.preventDefault()

       console.log('Name:', name);
       console.log('Email:', email);
       console.log('Password:', password);
       console.log('Confirm Password:', confirmPassword);

       setEnviarFormulario(true);
    };

    return (
     <div className="min-h-screen flex items-center justify-center bg-slate-700">
       <form
        onSubmit={handleSubmit}
         className="bg-white p-8 rounded-2xl shadow-md max-w-md">

          <h1 className="text-3xl font-bold text-center mb-1 text-blue-600">
          Mój Lekarz
        </h1>



         <h2 className="text-2xl font-bold mb-6 text-center">
           Registro
          </h2>

           <input
             type="text"
             placeholder="Nombre"
             className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:blue-500"
             value={name}
             onChange={(e) => setName(e.target.value)}
             />
                     
             <input
              type="email"
               placeholder="Email"
               className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               />

               <input 
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />

                <input 
                  type="password"
                  placeholder="Confirmar contraseña"
                  className="w-full p-3 mb-6 border rounded-lg focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                 <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 blue-700 transition">
                   Crear cuenta
                 </button>
          </form>
     </div>
     )
};

export { Register };