import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { FaCheck, FaExclamationCircle, FaEnvelope } from "react-icons/fa";

const VerifyCodePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState('Ingresa el código de 6 dígitos que recibiste en tu email');
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleVerificar = async (e) => {
    e.preventDefault()

    if (!codigo || codigo.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

      setCargando(true);
      setError('');

      try {
        const response = await fetch('http://localhost:3000/api/doctors/verify-code', {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
         body: JSON.stringify({
          email,
          codigo,
        })
      }
    );

    const data = await response.json();

    if (response.ok) {
      setExito(true);
      setMensaje('¡Email verificado correctamente!');
      
      setTimeout(() => {
        navigate('/login-doctor');
      }, 2000);
    } else {
       setError(data.mensaje || 'Código inválido');
    }
   } catch (error) {
    console.error(error)
    setError('No se pudo conectar con el servidor');
   } finally {
     setCargando(false);
   }
  };

  if (!email) {
    return (
       <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-700 px-4">
        <div className="bg-slate-500 shadow-2xl rounded-2xl p-8 max-w-md w-full text-center border border-slate-600">
          <FaExclamationCircle className="text-red-500 text-6xl mx-auto mb-5"/>

          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Error
          </h1>

          <p className="text-slate-300 text-lg mb-6">
           Email no encontrado. Intenta registrarte de nuevo.
          </p>

          <button
            onClick={() => navigate('/register-doctor')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-lg">
             Volver al registro
            </button>
          </div>
       </div>
       );
     }

     return (
       <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-700 px-4">
        <div className="bg-slate-500 shadow-2xl rounded-2xl p-8 max-w-md w-full border border-slate-600">
          {exito ? (
            <>
             <FaCheck className="text-green-500 text-6xl mx-auto mb-5"/>

             <h1 className="text-3xl font-bold text-green-500 mb-4 text-center">
               ¡Verificado!
             </h1>

             <p className="text-slate-300 text-lg text-center">
              {mensaje}
             </p>

             <p className="text-slate-400 text-sm text-center mt-4">
                Redirigiendo al login...
             </p>
            </>
          ) : (
            <>
             <FaEnvelope className="text-blue-400 text-6xl mx-auto mb-5"/>

             <h1 className="text-3xl font-bold text-blue-400 mb-4 text-center">
               Verifica tu email
             </h1>

             <p className="text-slate-300 text-sm text-center mb-6">
                 Enviamos un código de 6 dígitos a:
             </p>

             <p className="text-slate-200 font-semibold text-center mb-6 break-all">
              {email}
             </p>

             
             <form onSubmit={handleVerificar} className="space-y-4">
               <div>
                 <label className="block text-slate-300 text-sm font-semibold mb-2">
                   Código de verificación
                 </label>

                 <input 
                   type="text"
                   maxLength={6}
                   placeholder="000000"
                   value={codigo}
                   onChange={(e) => 
                    setCodigo(e.target.value.replace(/\D/g, ''))
                   }
                   className="w-full px-4 py-3 bg-slate-600 text-white placeholder-slate-400 rounded-lg border border-slate-500 focus:outline-none focus:border-blue-500 text-center text-2xl tracking-widest"
                   disabled={cargando}
                   />

                   <p className="text-slate-400 text-xs mt-2 text-center">
                     Válido por 8 minutos
                   </p>
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                 )}

                 <button
                  type="submit"
                  disabled={cargando || codigo.length !== 6}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-lg">
                    {cargando ? "Verificando..." : "Verificar código"}
                </button>
             </form>

             <p className="text-slate-400 text-xs text-center mt-6">
                ¿No recibiste el código? Revisa tu carpeta de spam.
             </p> 
            </>
           )}
        </div>
    </div>
   )
};

export { VerifyCodePage }