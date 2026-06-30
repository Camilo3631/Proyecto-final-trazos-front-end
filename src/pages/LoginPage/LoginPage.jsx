import {useEffect, useState  } from "react";


const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');



   useEffect(() => {
        console.log('Registro montado');

        const consumirApiAlMontar = async () => {
            try {
                // Configurado como POST
                const response = await fetch("http://localhost:3000/api/login", {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({}) // Cuerpo vacío de prueba
                });
                const data = await response.json();
                
                // Verás la respuesta del servidor directamente en la consola del navegador
                console.log("Datos obtenidos con POST al cargar:", data);

            } catch (error) {
                console.error("Error al consumir la API en el montaje (POST):", error);
            }
        };

        consumirApiAlMontar();

        return () => {
             console.log('Registro desmontado');
        };
    }, []);



   const handledSubmit = (e) => {
      e.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password)
   };

   return (
     <div className="min-h-screen flex items-center justify-center bg-slate-700">

      <form 
        onSubmit={handledSubmit}
        className='bg-white p-8 rounded-2xl shadow-md max-w-md'>

          <h1 className="text-3xl font-bold text-center mb-1 text-blue-600">
            Mój Lekarz
          </h1>

         <h2 className="text-2xl font-bold mb-6 text-center">
           Iniciar sesión
         </h2>

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
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Entrar
          </button>

           <p className="text-center text-sm mt-4 text-gray-500">
            ¿No tienes cuenta? <a href="/register" className="text-blue-600 font-semibold">Regístrate</a>
          </p>
       </form> 
     </div>
   )
}

export { Login }