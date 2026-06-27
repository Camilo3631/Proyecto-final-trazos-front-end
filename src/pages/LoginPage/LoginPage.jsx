import { useState  } from "react";

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handledSubmit = (e) => {
      e.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password)
   };

   return (
     <div className="min-h-screen flex items-center justify-center bg-slate-700">
      <form 
        onSubmit={handledSubmit}
        className='bg-white p-8 rounded-2xl shadow-md w-96'>

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
       </form>
     </div>
   )
}

export { Login }