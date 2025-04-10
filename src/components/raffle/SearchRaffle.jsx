import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchRaffle = () => {
  const [shortCode, setShortCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_URL;

  const handleSearch = async () => {
    if (!shortCode.trim()) return;

    try {
      const res = await fetch(
        `${URL}/api/raffles/shortcode/${shortCode}`
      );
      if (!res.ok) throw new Error("Sorteo no encontrado");

      const raffle = await res.json();

      // Guardar en historial local (opcional)
      const history = JSON.parse(localStorage.getItem("raffleHistory") || "[]");
      const updated = [
        raffle,
        ...history.filter((r) => r.id !== raffle.id),
        ...history.filter((r) => r.status !== raffle.status),
      ].slice(0, 5);
      localStorage.setItem("raffleHistory", JSON.stringify(updated));

      navigate(`/raffle/${raffle.id}/public`);
    } catch (err) {
      setError("No se encontró ningún sorteo con ese código.");
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2 text-center">
        Buscar sorteo por código
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          placeholder="Ej: ABC123"
          className="flex-1 border border-gray-300 px-3 py-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default SearchRaffle;
