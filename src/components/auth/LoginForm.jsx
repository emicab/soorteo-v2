import { useState } from "react";
import { z } from "zod";
import useAuthStore from "../../store/useAuthStore";
import { loginSchema } from "../schema/authSchema";

const LoginForm = ({ onClose }) => {
  const { login } = useAuthStore();
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const URL = import.meta.env.VITE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" }); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validar antes de enviar
    try {
      loginSchema.parse(form); // lanza error si no pasa

      const response = await fetch(`${URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user, data.token);
        setMessage("Inicio de sesión exitoso.");
        onClose();
      } else {
        setMessage(data.message || "Error al iniciar sesión.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error inesperado:", error);
        setMessage("Error en el servidor.");
      }
    }
  };
  return (
    <div className="p-6 text-[#333]">
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            onChange={handleChange}
            className="w-full text-[#333] p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-violet-500 hover:bg-violet-600 text-white font-semibold p-3 rounded transition"
        >
          Ingresar
        </button>
      </form>

      {message && <p className={`mt-4 text-center font-semibold ${message.includes("exitoso") ? "text-green-500" : "text-red-500"}`}>
        {message}
      </p>}
    </div>
  );
};

export default LoginForm;
