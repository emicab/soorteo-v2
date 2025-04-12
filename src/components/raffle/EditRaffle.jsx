import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const URL = import.meta.env.VITE_URL


const EditRaffle = ({ raffle, onClose, onUpdate }) => {
  const { token } = useAuthStore();
  const [form, setForm] = useState(raffle);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${URL}/api/raffles/${raffle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        onUpdate();
        setMessage("Sorteo actualizado.");
        onClose();
      } else {
        setMessage(data.message || "Error al actualizar el sorteo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error en el servidor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Editar Sorteo</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="totalNumbers"
            value={form.totalNumbers}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="winnersCount"
            value={parseInt(form.winnersCount)}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="pricePerNumber"
            value={form.pricePerNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
        {message && <p className="text-center mt-3 text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default EditRaffle;
