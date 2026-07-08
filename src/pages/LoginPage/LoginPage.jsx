import { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handledSubmit = async (e) => {
    e.preventDefault();

    try {
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso:", data);

        navigate("/dashboard/" + data.usuario._id);
      } else {
        alert(data.message || "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700">
      <form
        onSubmit={handledSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full"
      >
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
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
};

export { Login };