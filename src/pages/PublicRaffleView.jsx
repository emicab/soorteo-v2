import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NumberBoard from "../components/raffle/NumberBoard";
import ScreenWinners from "../components/raffle/ScreenWinners";
import RaffleLoader from "../components/UI/RaffleLoader";
import RaffleNotFound from "../components/UI/RaffleNotFound";
import CheckVerified from "../components/UI/icons/CheckVerified";
import { Helmet } from "react-helmet";

const PublicRaffleView = () => {
  const { id, shortcode } = useParams();
  const [raffle, setRaffle] = useState(null);
  const [prizes, setPrizes] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false)

  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const loadRaffle = async () => {
      try {
        let raffleData;

        if (id) {
          // Ruta tradicional con ID
          const res = await fetch(`${URL}/api/raffles/${id}`);
          raffleData = await res.json();
        } else if (shortcode) {
          // Nueva ruta con shortCode
          const res = await fetch(`${URL}/api/raffles/shortcode/${shortcode}`);
          raffleData = await res.json();
        }

        if (raffleData?.id) {
          setRaffle(raffleData);

          const [prizesRes, numbersRes] = await Promise.all([
            fetch(`${URL}/api/prizes/${raffleData.id}`),
            fetch(`${URL}/api/raffles/numbers/${raffleData.id}`),
          ]);

          const prizesData = await prizesRes.json();
          const numbersData = await numbersRes.json();

          setPrizes(prizesData);
          setNumbers(numbersData);
        }
      } catch (err) {
        console.error("Error al cargar sorteo:", err);
        setNotFound(true)
      }
    };

    loadRaffle();
  }, [id, shortcode]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${URL}/api/raffles/${raffle.id}/results`);
        if (!res.ok) {
          if (res.status === 404) {
            console.warn("Resultados no encontrados.");
            setNotFound(true);
          } else {
            throw new Error("Error al obtener resultados");
          }
          return;
        }

        const data = await res.json();
        if (!data || data.length === 0) {
          setNotFound(true);
        } else {
          setResults(data);
        }
      } catch (err) {
        console.error("Error al cargar ganadores:", err);
        setNotFound(true);
      }
    };

    if (raffle?.status === "finished") {
      fetchResults();
    }
    if (notFound) return <RaffleNotFound />;
  }, [raffle]);

  if (!raffle) return <RaffleLoader />;

  if (raffle?.status === "finished") {
    return <ScreenWinners results={results} />;
  }

  const sendWhatsAppMessage = () => {
    const stored = localStorage.getItem("latestReservation");

    //copiar alias en portapapeles
    const alias = raffle.alias;
    navigator.clipboard.writeText(alias)

    const data = JSON.parse(stored);
    if (!data) return;
    const { buyerName, buyerDni, referenceCode, numbers } = data;

    const msg = `Hola, soy *${buyerName || "participante"} - DNI: ${buyerDni}*, reservé los números: ${numbers.join(", ")}. Ya hice la transferencia.
Código de reserva: *${referenceCode}*`;

    const whatsappURL = `https://wa.me/${raffle.whatsapp}?text=${encodeURIComponent(msg)}`;
    // localStorage.clear("latestReservation")
    return whatsappURL
  };



  return (
    <>
      <Helmet>
        <title>{`Sorteo ${raffle.title}`} | Rifalo</title>
        <meta name="description" content={raffle.description} />
        <meta property="og:title" content={`Sorteo ${raffle.title} | Rifalo`} />
        <meta property="og:description" content={raffle.description} />
        <meta property="og:url" content={`https://rifalo.com.ar/${raffle.shortCode}`} />
      </Helmet>

      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-sm">
        <div className="flex mb-4 items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800  uppercase">
            {raffle.title}
          </h2>
          <div>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full 
            ${raffle.status === "pending"
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
        <div className="flex items-center gap-1 mb-2">
          <p className="text-gray-500 text-sm">Sorteo creado por: </p>
          <p className="text-sm font-semibold text-gray-700">
            {raffle.owner.username}
          </p>
          <CheckVerified verified={raffle.owner.verified} />
        </div>
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
            <p className="text-sm text-gray-500">📱 Contactate con el organizador</p>
            <Link
              className="text-blue-600 font-semibold underline cursor-pointer"
              to={sendWhatsAppMessage()}
              
            >
              Ir al chat
            </Link>
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
    </>
  );
};

export default PublicRaffleView;
