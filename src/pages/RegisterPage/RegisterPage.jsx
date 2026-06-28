import {  useEffect, useState  } from "react";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    useEffect(() => {

        console.log('Registro montado');

        return () => {
             console.log('Registro desmontado');
        };
    }, []);


    const handleSubmit = (e) => {
       e.prevenDefault();

       console.log('Name:', name);
       console.log('Email:', email);
       console.log('Password:', password);
       console.log('Confirm Password:', confirmPassword);
    };

    return (
     <div className="min-h-screen flex items-center justify-center bg-slate-700">
       <form
        onSubmit={handleSubmit}
         className="bg-white p-8 rounded-2xl shadow-md max-w-md">
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