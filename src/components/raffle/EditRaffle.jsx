import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

const URL = import.meta.env.VITE_URL;

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
        setTimeout(() => onClose(), 1000);
      } else {
        setMessage(data.message || "Error al actualizar el sorteo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error en el servidor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white max-h-[90vh] overflow-y-auto w-full max-w-xl p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">Editar Sorteo</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del sorteo</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-xl focus:ring-violet-400"
            />
          </div>

          {/* Agrupados: Total de números y ganadores */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Números</label>
              <input
                type="number"
                name="totalNumbers"
                value={parseInt(form.totalNumbers)}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-violet-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ganadores</label>
              <input
                type="number"
                name="winnersCount"
                value={parseInt(form.winnersCount)}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-violet-400"
              />
            </div>
          </div>

          {/* Agrupados: Precio por número y Alias */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio por Número</label>
              <input
                type="number"
                name="pricePerNumber"
                value={form.pricePerNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-violet-400"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alias (MercadoPago)</label>
              <input
                type="text"
                name="alias"
                value={form.alias || ""}
                onChange={handleChange}
                placeholder="@tualias.mp"
                className="w-full p-2 border border-gray-300 rounded-xl focus:ring-violet-400"
              />
            </div>
          </div>

          {/* Whatsapp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Whatsapp</label>
            <input
              type="text"
              name="whatsapp"
              value={form.whatsapp || ""}
              onChange={handleChange}
              placeholder="+54 9 ..."
              className="w-full p-2 border border-gray-300 rounded-xl focus:ring-violet-400"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition"
            >
              Guardar Cambios
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default EditRaffle;
