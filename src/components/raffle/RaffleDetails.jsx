import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const URL = import.meta.env.VITE_URL;

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-300 text-yellow-900";
    case "active":
      return "bg-green-400 text-green-900";
    case "completed":
      return "bg-gray-400 text-gray-900";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "pending":
      return "Pendiente!";
    case "active":
      return "Activo";
    case "completed":
      return "Finalizado";
    default:
      return status;
  }
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  date.setDate(date.getDate() + 1); // corregir desfase
  return date.toLocaleDateString("es-AR");
};

const RaffleDetail = () => {
  const { token } = useAuthStore();
  const { id } = useParams();
  const [raffle, setRaffle] = useState(null);

  useEffect(() => {
    const fetchRaffle = async () => {
      try {
        const res = await fetch(`${URL}/api/raffles/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setRaffle(data);
      } catch (err) {
        console.error("Error al cargar sorteo:", err);
      }
    };
    
    fetchRaffle();
  }, [id, token]);


  if (!raffle) return <p className="text-center mt-10">Cargando sorteo...</p>;

  const vendidos = raffle.tickets.filter((t) => t.userId).length;
  const reservados = raffle.tickets.filter((t) => !t.userId).length;
  const disponibles = raffle.totalNumbers - raffle.tickets.length;
  const recaudado = vendidos * raffle.price;

  const getTicketStatus = (num) => {
    const ticket = raffle.tickets.find((t) => t.number === num);
    if (ticket?.userId) return "vendido";
    if (ticket) return "reservado";
    return "disponible";
  };

  const getTileColor = (status) => {
    switch (status) {
      case "vendido":
        return "bg-red-500 text-white";
      case "reservado":
        return "bg-yellow-400 text-black";
      case "disponible":
        return "bg-green-400 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">{raffle.title}</h1>
      <h2 className="text-3xl font-bold mb-4 text-center">{raffle.alias}</h2>
      <p className="mb-2 text-gray-700">{raffle.description}</p>

      <div className="flex flex-wrap gap-4 items-center text-sm mb-6">
        <span className="font-semibold">Fecha del sorteo:</span> {formatDate(raffle.date)}
        <span className="font-semibold">Estado:</span>
        <span className={`px-2 py-1 rounded ${getStatusColor(raffle.status)}`}>
          {getStatusText(raffle.status)}
        </span>
        <span className="font-semibold">Precio por número:</span> ${raffle.price}
        <span className="font-semibold">Ganadores:</span> {raffle.winnersCount}
      </div>

      <h2 className="text-xl font-semibold mb-2">Estadísticas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 p-3 rounded text-center">
          <p className="font-bold">{vendidos}</p>
          <p>Vendidos</p>
        </div>
        <div className="bg-gray-100 p-3 rounded text-center">
          <p className="font-bold">{reservados}</p>
          <p>Reservados</p>
        </div>
        <div className="bg-gray-100 p-3 rounded text-center">
          <p className="font-bold">{disponibles}</p>
          <p>Disponibles</p>
        </div>
        <div className="bg-gray-100 p-3 rounded text-center">
          <p className="font-bold">${recaudado}</p>
          <p>Recaudado</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Premios</h2>
      <ul className="list-disc pl-5 mb-6">
        {raffle.prizes.map((prize) => (
          <li key={prize.id}>{prize.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-4">Tablero de Números</h2>
      <div className="grid grid-cols-10 gap-2 text-center mb-6">
        {Array.from({ length: raffle.totalNumbers }, (_, i) => {
          const num = i + 1;
          const status = getTicketStatus(num);
          return (
            <div
              key={num}
              className={`p-2 rounded font-semibold ${getTileColor(status)}`}
              title={`Número ${num} - ${status}`}
            >
              {num}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded"
        >
          Iniciar Sorteo
        </button>
      </div>
    </div>
  );
};

export default RaffleDetail;
