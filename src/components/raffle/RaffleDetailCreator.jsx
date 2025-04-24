import { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import PrizeManager from "../prize/PrizeManager";
import NumberBoard from "./NumberBoard";
import { jwtDecode } from "jwt-decode";
import DrawButton from "../DrawButton";
import ScreenWinners from "./ScreenWinners";
import SellersPanel from "../sellers/SellersPanel";
import { Link, useParams } from "react-router-dom";
import RaffleLoader from "../UI/RaffleLoader";
import CheckVerified from "../UI/icons/CheckVerified";
import UploadExcel from "../UploadExcel";

const URL = import.meta.env.VITE_URL;

const RaffleDetailCreator = ({ raffleId: propRaffleId }) => {
  const { shortcode } = useParams();
  const { token } = useAuthStore();
  const [raffleId, setRaffleId] = useState(propRaffleId || null);
  const [raffle, setRaffle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [results, setResults] = useState([]);
  const [file, setFile] = useState(null);
  const [loadingExcel, setLoadingExcel] = useState(false);

  const fetchRaffle = async () => {
    try {
      const response = await fetch(`${URL}/api/raffles/${raffleId}/creator`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setRaffle(data);
        if (token) {
          const decoded = jwtDecode(token);
          setIsOwner(decoded.id === data.ownerId);
        }
      } else {
        console.error("Error al obtener el sorteo:", data);
      }
    } catch (error) {
      console.error("Error de red al obtener el sorteo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchByShortCode = async () => {
      try {
        const res = await fetch(
          `${URL}/api/raffles/creator/shortcode/${shortcode}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        if (res.ok) {
          setRaffleId(data.id);
        } else {
          console.error(
            "No se encontró el sorteo por shortcode:",
            data.message
          );
        }
      } catch (err) {
        console.error("Error al buscar sorteo por shortcode:", err);
      }
    };

    if (!propRaffleId && shortcode) {
      fetchByShortCode();
    }
  }, [shortcode, propRaffleId]);

  useEffect(() => {


    if (raffleId) {
      fetchRaffle();
    }
  }, [raffleId, token]);

  // Cargar resultados si ya está terminado
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${URL}/api/raffles/${raffle.id}/results`);
        if (!res.ok) {

          if (res.status === 404) {
            console.warn("Resultados no encontrados.");
          } else {
            throw new Error("Error al obtener resultados");
          }
          return;
        }

        const data = await res.json();
        setResults(data);

      } catch (err) {
        console.error("Error al cargar ganadores:", err);
      }
    };

    if (raffle?.status === "finished") {
      fetchResults();
    }
  }, [raffle]);

  if (loading) return <RaffleLoader />;
  if (!raffle) return <p>No se pudo cargar el sorteo.</p>;

  const totalSold = raffle.tickets.filter((t) => t.status === "sold").length;
  const totalReserved = raffle.tickets.filter(
    (t) => t.status === "reserved"
  ).length;
  const totalAvailable = raffle.tickets.length - totalSold - totalReserved;
  const totalIncome = totalSold * raffle.pricePerNumber;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    setLoadingExcel(true);

    const res = await fetch(`${URL}/api/raffles/${raffleId}/import`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoadingExcel(false);
    alert(data.message);
  };

  const privacity = raffle.privacity === "public" ? "Público" : "Privado";


  if (raffle?.status === "finished") {
    return <ScreenWinners results={results} />;
  }

  return (
    <div className="container mx-auto p-4 mb-10">
      <div className="container mx-autox ">
        <Link to="/dashboard" className="text-blue-500 underline mb-8">
          ← Volver
        </Link>

        <div className="flex my-2 items-center justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <h2 className="text-lg sm:text-3xl font-bold text-gray-800 uppercase ">
              {raffle.title}
            </h2>
            <p className={`rounded-full text-sm font-semibold px-2 ${raffle.privacity == "public" ? 'bg-blue-600 text-blue-100' : 'bg-red-600 text-red-100'}`}>{privacity}</p>
          </div>

          <div>
            <span
              className={`text-lg font-semibold px-3 py-1 rounded-full 
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

        <div className="flex items-center gap-1 mb-2">
          <p className="text-gray-500 text-sm">Sorteo creado por: </p>
          <p className="text-sm font-semibold text-gray-700">
            {raffle.owner.username}
          </p>
          <CheckVerified verified={raffle.owner.verified} />
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Descripción</p>
              <p className="text-lg text-gray-800">{raffle.description}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Precio por número</p>
              <p className="text-lg text-green-600 font-semibold">
                ${raffle.pricePerNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Cantidad de ganadores</p>
              <p className="text-lg font-semibold text-gray-800">
                {raffle.winnersCount}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Fecha del sorteo</p>
              <p className="text-lg text-gray-800">
                {new Date(raffle.date).toLocaleDateString("es-AR")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2 bg-gray-100 px-4 py-3 rounded-lg border border-gray-300">
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
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-md my-6 p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          📊 Estado del sorteo
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col items-center bg-gray-50 p-3 rounded">
            <span className="text-xl">🎟️</span>
            <p className="text-gray-500">Total</p>
            <p className="text-gray-800 font-semibold">
              {raffle.tickets.length}
            </p>
          </div>

          <div className="flex flex-col items-center bg-gray-50 p-3 rounded">
            <span className="text-xl">✅</span>
            <p className="text-gray-500">Vendidos</p>
            <p className="text-green-600 font-semibold">{totalSold}</p>
          </div>

          <div className="flex flex-col items-center bg-gray-50 p-3 rounded">
            <span className="text-xl">⏳</span>
            <p className="text-gray-500">Reservados</p>
            <p className="text-yellow-600 font-semibold">{totalReserved}</p>
          </div>

          <div className="flex flex-col items-center bg-gray-50 p-3 rounded">
            <span className="text-xl">📭</span>
            <p className="text-gray-500">Disponibles</p>
            <p className="text-blue-600 font-semibold">{totalAvailable}</p>
          </div>

          <div className="flex flex-col items-center bg-purple-50 p-3 rounded col-span-2 sm:col-span-1">
            <span className="text-xl">💰</span>
            <p className="text-gray-500">Recaudado</p>
            <p className="text-purple-600 font-bold text-lg">${totalIncome}</p>
          </div>
        </div>
      </div>

      {/* Tablero de números */}
      <NumberBoard
        raffleId={raffle.id}
        isCreator={isOwner}
        title={raffle.title}
      />

      {/* Sección para gestionar premios */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Premios</h3>
        <PrizeManager raffleId={raffleId} />
        <SellersPanel
          raffleId={raffle.id}
          pricePerNumber={raffle.pricePerNumber}
        />
      </div>
      {/* {
        loadingExcel ? (
          <div className="w-full h-64 flex items-center justify-center">
            <p className="font-semibold text-2xl animate-pulse text-violet-600">Bancá, estoy procesando el archivo...</p>
          </div>
        ) : (
          <UploadExcel file={file} handleFileChange={handleFileChange} handleUpload={handleUpload} setLoadingExcel={setLoadingExcel} />
        )
      } */}

      <div className="fixed bottom-0 left-0 w-full p-4 shadow-md z-50">
        <DrawButton raffleId={raffleId} onDrawSuccess={fetchRaffle} />
      </div>
    </div>
  );
};

export default RaffleDetailCreator;
