import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RaffleCountdownDraw = ({ raffleId, onDrawCompleted, onClose }) => {
  const [seconds, setSeconds] = useState(5);
  const [loading, setLoading] = useState(false);
  const [winners, setWinners] = useState(null);

  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          performDraw();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const performDraw = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}/api/raffles/${raffleId}/draw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al realizar el sorteo.");
        onClose();
      } else {
        setWinners(data.winners);
        if (onDrawCompleted) onDrawCompleted(data.winners);
      }
    } catch (err) {
      toast.error("Error al conectar con el servidor.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 text-white flex flex-col justify-center items-center z-50 text-center px-4">
      {!winners ? (
        <>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            El sorteo comienza en...
          </h2>
          <p className="text-7xl md:text-9xl font-extrabold text-yellow-400 animate-pulse">
            {seconds}
          </p>
        </>
      ) : (
        <>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🎉 Ganador/es 🎉
          </h2>
          {winners.map((winner, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm"
            >
              <p className="text-xl md:text-2xl font-semibold text-purple-800">
                {idx + 1}. {winner.buyerName} -{" "}
                <span className="text-gray-700 font-normal">
                  {winner.buyerDni}
                </span>
              </p>
              <p className="text-xs md:text-sm font-medium py-1 px-3 bg-purple-200 text-purple-800 rounded-full">
                Código: {winner.referenceCode}
              </p>
            </div>
          ))}
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded"
          >
            Cerrar
          </button>
        </>
      )}
    </div>
  );
};

export default RaffleCountdownDraw;
