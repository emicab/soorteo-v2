import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

const SellersPanel = ({ raffleId, pricePerNumber }) => {
  const [sellers, setSellers] = useState([]);
  const [newSeller, setNewSeller] = useState("");

  const fetchSellers = async () => {
    try {
      const res = await fetch(`${URL}/api/sellers/${raffleId}`);
      const data = await res.json();
      setSellers(data);
    } catch (err) {
      console.error("Error al cargar vendedores:", err);
    }
  };

  const handleAddSeller = async () => {
    if (!newSeller.trim()) return;
    try {
      const res = await fetch(`${URL}/api/sellers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raffleId, sellers: [newSeller] }),
      });
      if (res.ok) {
        setNewSeller("");
        fetchSellers();
      }
    } catch (err) {
      console.error("Error al agregar vendedor:", err);
    }
  };

  const handleDelete = async (sellerId) => {
    if (!confirm("¿Eliminar este vendedor?")) return;
    try {
      const res = await fetch(`${URL}/api/sellers/${sellerId}`, {
        method: "DELETE",
      });
      if (res.ok) fetchSellers();
    } catch (err) {
      console.error("Error al eliminar vendedor:", err);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, [raffleId]);

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-lg shadow p-4">
      <h3 className="text-xl font-semibold mb-4">🧑 Vendedores</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newSeller}
          onChange={(e) => setNewSeller(e.target.value)}
          placeholder="Nombre del vendedor"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAddSeller}
          className="bg-green-600 text-white px-4 py-2 font-bold rounded hover:bg-green-700"
        >
          +
        </button>
      </div>

      <div className="grid gap-3">
        {sellers.map((seller) => {
          const sold = seller.soldTickets.length || 0;
          const income = sold * pricePerNumber;

          return (
            <div
              key={seller.id}
              className="border p-3 rounded flex justify-between items-center bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-800">{seller.name}</p>
                <p className="text-sm text-gray-500">
                  🎟️ Vendidos: <strong>{sold}</strong> | 💰 Recaudado:{" "}
                  <strong>${income}</strong>
                </p>
              </div>
              <button
                onClick={() => handleDelete(seller.id)}
                className="text-red-600 hover:underline text-sm"
              >
                ❌
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellersPanel;
