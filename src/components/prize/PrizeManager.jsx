import { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";

const PrizeManager = ({ raffleId }) => {
  const [prizes, setPrizes] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newPrizeName, setNewPrizeName] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [updatedPrizeName, setUpdatedPrizeName] = useState("");
  const { token } = useAuthStore();

  const URL = import.meta.env.VITE_URL;

  const fetchPrizes = async () => {
    try {
      const res = await fetch(`${URL}/api/prizes/${raffleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setPrizes(data);
      else console.error("Error al obtener premios:", data);
    } catch (error) {
      console.error("Error cargando premios:", error);
    }
  };

  const addPrize = async () => {
    if (!newPrizeName.trim()) return;

    try {
      const res = await fetch(`${URL}/api/prizes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newPrizeName, raffleId }),
      });
      if (res.ok) {
        setNewPrizeName("");
        setFormVisible(false);
        fetchPrizes();
      }
    } catch (err) {
      console.error("Error agregando premio:", err);
    }
  };

  const updatePrize = async (id) => {
    try {
      const res = await fetch(`${URL}/api/prizes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: updatedPrizeName }),
      });
      if (res.ok) {
        setEditMode(null);
        setUpdatedPrizeName("");
        fetchPrizes();
      }
    } catch (err) {
      console.error("Error actualizando premio:", err);
    }
  };

  const deletePrize = async (id) => {
    try {
      const res = await fetch(`${URL}/api/prizes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchPrizes();
    } catch (err) {
      console.error("Error eliminando premio:", err);
    }
  };

  useEffect(() => {
    if (raffleId && token) {
      fetchPrizes();
    }
  }, [raffleId, token]);

  return (
    <div className="bg-gray-100 p-4 rounded mt-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
        onClick={() => setFormVisible(!formVisible)}
      >
        {formVisible ? null : "Agregar Premio"}
      </button>

      {formVisible && (
        <div className="mb-4">
          <input
            type="text"
            value={newPrizeName}
            onChange={(e) => setNewPrizeName(e.target.value)}
            placeholder="Nombre del premio"
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex gap-2">
            <button
              onClick={addPrize}
              disabled={!newPrizeName.trim()}
              className={`px-4 py-1 rounded text-white ${
                newPrizeName.trim()
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-green-300 cursor-not-allowed"
              }`}
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setFormVisible(false);
                setNewPrizeName("");
              }}
              className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">Premios actuales</h3>
      {prizes.length === 0 ? (
        <p className="text-sm text-gray-600">No hay premios aún.</p>
      ) : (
        <ul className="space-y-2 list-none">
          {prizes.map((prize) => (
            <li
              key={prize.id}
              className="bg-white p-3 rounded shadow flex justify-between items-center"
            >
              {editMode === prize.id ? (
                <>
                  <input
                    type="text"
                    value={updatedPrizeName}
                    onChange={(e) => setUpdatedPrizeName(e.target.value)}
                    className="p-1 border rounded mr-2 w-full"
                  />
                  <button
                    onClick={() => updatePrize(prize.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(null);
                      setUpdatedPrizeName("");
                    }}
                    className="text-gray-500"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <span>{prize.name}</span>
                  <div>
                    <button
                      onClick={() => {
                        setEditMode(prize.id);
                        setUpdatedPrizeName(prize.name);
                      }}
                      className="text-yellow-600 mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deletePrize(prize.id)}
                      className="text-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PrizeManager;
