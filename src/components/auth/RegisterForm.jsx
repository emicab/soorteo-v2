import { useState } from "react";
import { z } from "zod";
import { delayRedirect } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../schema/authSchema";



const Register = ({ onClose }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // limpiar error del campo al modificar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Validar datos antes de enviar
      registerSchema.parse(form);

      const response = await fetch(`${URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registro exitoso. ¡Ahora inicia sesión!");
        onClose();
        delayRedirect(navigate, "/login");
      } else {
        setMessage(data.message || "Error en el registro.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error); 
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
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Crear Cuenta
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Nombre"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded transition"
        >
          Registrarse
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
