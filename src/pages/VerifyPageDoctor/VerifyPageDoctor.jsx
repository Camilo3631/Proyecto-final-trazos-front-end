import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa";

const VerifyPageDoctor = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState("Verificando tu correo...");
  const [exito, setExito] = useState(false);

  useEffect(() => {
    const verificarCorreo = async () => {
      try {
        const response = await fetch(
         `${import.meta.env.VITE_API_URL}/api/doctors/verify/${token}`
        );

        const data = await response.json();

        if (response.ok) {
          setExito(true);
          setMensaje("¡Listo! Has verificado tu correo correctamente.");
        } else {
          setMensaje(data.mensaje || "El enlace no es válido.");
        }

      } catch (error) {
        console.log(error);
        setMensaje("No se pudo conectar con el servidor.");
      }
    };

    verificarCorreo();

  }, [token]);


  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-700 px-4">

      <div className="
        bg-slate-500
        shadow-2xl
        rounded-2xl
        p-8
        max-w-md
        w-full
        text-center
        border
        border-slate-600
      ">

        {exito ? (
          <>

            <FaCheck
             className="text-green-500 text-6xl mx-auto mb-5"
             />

            <h1 className="
              text-3xl
              font-bold
              text-green-500
              mb-4
            ">
              Correo verificado
            </h1>


            <p className="
              text-slate-300
              text-lg
              mb-6
            ">
              Tu cuenta de doctor ya está activa.
              Ahora puedes iniciar sesión.
            </p>


            <button
               onClick={() => navigate("/login-doctor")}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-semibold
                py-3
                px-8
                rounded-xl
                transition
                duration-300
                shadow-lg
              "
            >
              Ir al login
            </button>

          </>
        ) : (
          <>

            <div className="text-6xl mb-5">
              📧
            </div>


            <h1 className="
              text-3xl
              font-bold
              text-blue-400
              mb-4
            ">
              Verificando correo
            </h1>


            <p className="
              text-slate-300
              text-lg
            ">
              {mensaje}
            </p>


            <div className="mt-8">

              <div className="
                animate-spin
                h-12
                w-12
                border-4
                border-blue-400
                border-t-transparent
                rounded-full
                mx-auto
              ">
              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
};


export { VerifyPageDoctor };