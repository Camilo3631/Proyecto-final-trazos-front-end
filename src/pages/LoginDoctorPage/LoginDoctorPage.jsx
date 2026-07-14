import { useState  } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaArrowLeft, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

const LoginDoctorPage = () => {
  const navigate = useNavigate();

  const [step, setStep ] = useState('credentials');
  const [showPassword, setShowPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [alerta, setAlerta] = useState(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codigo, setCodigo] = useState('' );

  const mostrarAlerta = (mensaje, tipo = 'info') => {
    setAlerta({ mensaje, tipo })

    setTimeout(() => {
    setAlerta(null)
    }, 4000);
  };
  
  const handleSubmitCredentials = async (e) => {
     e.preventDefault();

     setError('')

     if (!email || !password) {
       setError('Email y contraseña son obligatorios');
       return;
     }

     setCargando(true);

     try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
       body: JSON.stringify({
       email,
       password
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setStep('code');
      mostrarAlerta('✓ Código enviado a tu email', 'success');
    } else {
      setError(data.mensaje || 'Email o contraseña incorrectos');
      mostrarAlerta(data.mensaje || 'Email o contraseña incorrectos', 'error');
    }
   } catch (error) {
     console.log(error);
     setError('No se pudo conectar con el servidor');
     mostrarAlerta('No se pudo conectar con el servidor', 'error')
   } finally {
     setCargando(false);
   }
  };
 
  const handleSubmitCode = async (e) => {
    e.preventDefault()

    setError('')

    if (!codigo || codigo.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

    setCargando(true)

   
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/doctors/verify-login-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          codigo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        mostrarAlerta('✓ Login exitoso, redirigiendo...', 'success');

        setTimeout(() => {
          navigate(`/doctor-dashboard/${data.doctor._id}`);
          
        }, 2000);
      } else {
        setError(data.mensaje || 'Código inválido');
        mostrarAlerta(data.mensaje || 'Código inválido', 'error');
      }
    } catch (error) {
      console.log(error);
      setError('No se pudo conectar con el servidor');
      mostrarAlerta('No se pudo conectar con el servidor', 'error');
    } finally {
      setCargando(false)
    }
  };

return (
  <div className="min-h-[calc(100vh-80px)] bg-slate-700 flex items-center justify-center px-4 py-12">
    <div className="max-w-md w-full bg-slate-500 shadow-2xl rounded-2xl p-8 border border-slate-600">
      <h1 className="text-4xl font-bold text-blue-500 text-center mb-2">
        {step === 'credentials' ? 'Login Doctor' : 'Verificación'}
      </h1>

      <p className="text-slate-200 text-center mb-8 text-sm">
        {step === 'credentials'
         ? 'Inicia sesión en tu cuenta'
         : 'Ingresa el código que recibiste en tu email'}
      </p>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {step === 'credentials' ? (
        <form onSubmit={handleSubmitCredentials} className="space-y-6">
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='correo@ejemplo.com'
              disabled={cargando}
              className="w-full px-4 py-3 bg-slate-600 text-white placeholder-slate-400 rounded-lg border border-slate-500 focus:outline-none focus:border-blue-500"
              />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Contraseña
            </label>

            <div className="relative">
              <input
               type={showPassword ? 'text' : 'password'}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder='Tu contraseña'
               disabled={cargando}
              className="w-full px-4 py-3 bg-slate-600 text-white placeholder-slate-400 rounded-lg border border-slate-500 focus:outline-none focus:border-blue-500 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <button
           type='submit'
           disabled={cargando}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
           >
            {cargando ? "Verificando..." : "Continuar"}
           </button>

           <p className="text-center text-slate-300 text-sm">
            ¿No tienes cuenta?{' '}
            <button
              type="button"
              onClick={() => navigate('/register-doctor')}
              className="text-blue-400 hover:text-blue-300 font-semibold"
             >
             Regístrate aquí
            </button>
           </p>
        </form>
      ) : (
        <form onSubmit={handleSubmitCode} className="space-y-6">
          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
               Email
            </label>

            <input 
             type="email"
             value={email}
             disabled
             className="w-full px-4 py-3 bg-slate-600 text-slate-300 rounded-lg border border-slate-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2">
              Código de verificación
            </label>

            <input
             type="text"
             maxLength={6}
             placeholder="000000"
             value={codigo}
             onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
             disabled={cargando}
             className="w-full px-4 py-3 bg-slate-600 text-white placeholder-slate-400 rounded-lg border border-slate-500 focus:outline-none focus:border-blue-500 text-center text-2xl tracking-widest"
             />

             <p className="text-slate-400 text-xs mt-2 text-center">
              Válido por 8 minutos
             </p>
          </div>

          <button
            type="submit"
            disabled={cargando || codigo.length !== 6}
             className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
             >
              {cargando ? 'Verificando...' : 'Iniciar sesión'}
             </button>

             <button
              type="button"
              onClick={() => setStep('credentials')}
              disabled={cargando}
              className="w-full flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 font-semibold disabled:text-slate-400"
             >
              <FaArrowLeft size={16} />
               Volver
             </button>

             <p className="text-slate-400 text-xs text-center">
              ¿No recibiste el código? Revisa tu carpeta de spam.
             </p>
          </form>
          )}

          {alerta && (
            <div
            className={`mt-6 p-4 rounded-xl shadow-lg flex items-center gap-3 w-full ${
             alerta.tipo === "success"
             ? "bg-green-500 text-white border border-green-400"
             : alerta.tipo === "error"
             ? "bg-red-500 text-white border border-red-400"
             : "bg-yellow-500 text-white border border-yellow-300"
            }`}
            >
            {alerta.tipo === "success" && <FaCheckCircle size={20} />}
            {alerta.tipo === "error" && <FaTimesCircle size={20} />}
            {alerta.tipo === "warning" && <FaExclamationCircle size={20} />}

            <span className="font-semibold text-sm">
              {alerta.mensaje}
            </span>
          </div>
          )}
       </div>
   </div>
);
};

export { LoginDoctorPage };