import { useState } from "react";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handledSubmit = async (e) => {
    e.preventDefault();

    setCargando(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso:", data);

        navigate(`/dashboard/${data.usuario._id}`);
      } else {
        alert(
          data.message ||
            "Correo o contraseña incorrectos."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "No se pudo conectar con el servidor."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700 px-4">
      <form
        onSubmit={handledSubmit}
        className="bg-slate-500 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-slate-600"
      >
        <h1 className="text-4xl font-bold text-blue-500 text-center mb-2">
          Login User
        </h1>

        <p className="text-slate-200 text-center mb-8 text-sm">
          Inicia sesión con tu cuenta
        </p>

        <div className="mb-5">
          <label className="block text-slate-300 text-sm font-semibold mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-3 bg-slate-600 text-white placeholder-slate-400 rounded-lg border border-slate-500 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            disabled={cargando}
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-semibold mb-2">
            Contraseña
          </label>

          <div className="relative">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Tu contraseña"
              disabled={cargando}
              required
              className="w-full px-4 py-3 bg-slate-600 text-white placeholder-slate-400 rounded-lg border border-slate-500 focus:outline-none focus:border-blue-500 pr-10"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
            >
              {showPassword ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
        >
          {cargando
            ? "Ingresando..."
            : "Entrar"}
        </button>

        <p className="text-center text-slate-300 text-sm mt-6">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={() =>
              navigate("/register")
            }
            className="text-blue-400 hover:text-blue-300 font-semibold"
          >
            Regístrate aquí
          </button>
        </p>
      </form>
    </div>
  );
};

export { Login };