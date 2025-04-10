import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const LoginForm = ({ onClose }) => {
  const { login } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const URL = import.meta.env.VITE_URL

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user, data.token);
        setMessage("Inicio de sesión exitoso.");
        // onClose(); // Cierra el modal después de iniciar sesión
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error en el servidor.");
    }
  };

  return (
    <div className="p-6 text-[#333]">
      <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full text-[#333] p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded transition"
        >
          Ingresar
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default LoginForm;
