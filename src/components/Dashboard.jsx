import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import CreateRaffle from "./raffle/CreateRaffle";
import EditRaffle from "./raffle/EditRaffle";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_URL;

const Dashboard = () => {
  const { token, getUserId } = useAuthStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [raffles, setRaffles] = useState([]);
  const navigate = useNavigate();

  const userId = getUserId();

  const fetchRaffles = async () => {
    try {
      const response = await fetch(`${URL}/api/raffles`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        setRaffles(data);
        setShowCreateModal(false);
      } else {
        console.error("Error en respuesta:", data);
      }
    } catch (error) {
      console.error("Error cargando sorteos:", error);
    }
  };
  useEffect(() => {
    fetchRaffles();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${URL}/api/raffles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setRaffles((prev) => prev.filter((raffle) => raffle.id !== id));
        // eliminamos el sorteo del localStorage
        const raffles = JSON.parse(
          localStorage.getItem("raffleHistory") || "[]"
        );
        const newRaffles = raffles.filter((raffle) => raffle.id !== id);
        localStorage.setItem("raffleHistory", JSON.stringify(newRaffles));
      }
    } catch (error) {
      console.error("Error eliminando sorteo:", error);
    }
  };

  const statusMap = {
    pending: { label: "Pendiente", color: "bg-yellow-400" },
    active: { label: "Activo", color: "bg-green-500" },
    finished: { label: "Completado", color: "bg-gray-400" },
  };

  // ⬇️ VISTA PRINCIPAL
  return (
    <div className="container mx-auto p-4">
      <>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Mis Sorteos
        </h1>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Crear Sorteo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {raffles.map((raffle) => (
            <div
              key={raffle.id}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-5 transition hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800 uppercase">
                  {raffle.title}
                </h3>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    statusMap[raffle.status].color
                  } text-white`}
                >
                  {statusMap[raffle.status].label}
                </span>
              </div>

              <h4 className="text-md text-gray-700 mb-1 font-medium">
                Alias: <span className="font-normal">{raffle.alias}</span>
              </h4>

              <p className="text-sm text-gray-600">
                Precio por número: <strong>${raffle.pricePerNumber}</strong>
              </p>

              <p className="text-xs text-gray-500 my-2">
                📅 Creado: {new Date(raffle.createdAt).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                🎯 Fecha del sorteo:{" "}
                {new Date(raffle.date).toLocaleDateString("es-AR")}
              </p>

              {userId === raffle.ownerId && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowEditModal(raffle)}
                    className="bg-yellow-400 text-white text-sm px-3 py-1.5 rounded-md hover:bg-yellow-500"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(raffle.id)}
                    className="bg-red-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-red-600"
                  >
                    🗑 Eliminar
                  </button>
                  <button
                    onClick={() => navigate(`/${raffle.shortCode}/creator`)}
                    className="bg-indigo-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-indigo-700"
                  >
                    👁 Ver detalle
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {showCreateModal && (
          <CreateRaffle
            onClose={() => {
              setShowCreateModal(false);
              fetchRaffles();
            }}
          />
        )}

        {showEditModal && (
          <EditRaffle
            raffle={showEditModal}
            onClose={() => setShowEditModal(null)}
            onUpdate={fetchRaffles}
          />
        )}
      </>
    </div>
  );
};

export default Dashboard;
