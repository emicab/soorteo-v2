import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NumberBoard from "../components/raffle/NumberBoard";

const PublicRaffleView = () => {
  const { id } = useParams();
  const [raffle, setRaffle] = useState(null);
  const [prizes, setPrizes] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchRaffleData = async () => {
      const res = await fetch(`${URL}/api/raffles/${id}`);
      const data = await res.json();
      setRaffle(data);
    };

    const fetchPrizes = async () => {
      const res = await fetch(`${URL}/api/prizes/${id}`);
      const data = await res.json();
      setPrizes(data);
    };

    const fetchNumbers = async () => {
      const res = await fetch(`${URL}/api/raffles/numbers/${id}`);
      const data = await res.json();
      setNumbers(data);
    };

    fetchRaffleData();
    fetchPrizes();
    fetchNumbers();
  }, [id]);

  if (!raffle)
    return <div className="text-center mt-10">Cargando sorteo...</div>;

  if (raffle?.status === "finished") {
    return <ScreenWinners results={results} />;
  }
  
  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex mb-4 items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800  uppercase">
            {raffle.title}
          </h2>
          <div>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full 
            ${
              raffle.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : raffle.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
            >
              {raffle.status === "pending"
                ? "Pendiente"
                : raffle.status === "active"
                ? "Activo"
                : "Finalizado"}
            </span>
          </div>
        </div>
      <p className="text-gray-600 mb-4 text-lg">{raffle.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-100 p-4 rounded-md">
        <div>
          <p className="text-sm text-gray-500">💵 Precio por número</p>
          <p className="text-lg font-semibold text-gray-800">
            ${raffle.pricePerNumber}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">🗓️ Fecha del sorteo</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Date(raffle.date).toLocaleDateString("es-AR")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">👥 Cantidad de ganadores</p>
          <p className="text-lg font-semibold text-gray-800">
            {raffle.winnersCount}
          </p>
        </div>
        <div className="md:col-span-1">
          <p className="text-sm text-gray-500 mb-1">🎁 Premios</p>
          <ul className="list-disc list-inside text-gray-700">
            {prizes?.length ? (
              prizes.map((prize, index) => (
                <li key={prize.id}>
                  {index + 1}. {prize.name}
                </li>
              ))
            ) : (
              <li>No se han cargado premios.</li>
            )}
          </ul>
        </div>
        
      </div>

      <div className="bg-gray-100 p-4 rounded-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">📛 Alias para transferencias</p>
          <p className="text-lg font-semibold text-gray-800">{raffle.alias}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">📱 Contacto por WhatsApp</p>
          <a
            href={`https://wa.me/54${raffle.whatsapp}`}
            className="text-blue-600 font-semibold underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir al chat
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3 my-2 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300">
        <div className="text-gray-600 font-semibold">
          <span className="block text-sm">Código del sorteo</span>
          <span className="text-xl font-mono text-gray-800">
            {raffle.shortCode}
          </span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(raffle.shortCode);
            alert("Código copiado al portapapeles");
          }}
          className="ml-auto px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Copiar
        </button>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mt-4">
        🎟️ Seleccioná tus números
      </h2>
      <NumberBoard
        isCreator={false}
        raffleId={raffle.id}
        title={raffle.title}
        referenceCode={numbers}
      />
    </div>
  );
};

export default PublicRaffleView;
