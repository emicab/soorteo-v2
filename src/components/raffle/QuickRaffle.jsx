import { useState } from "react";

const QuickRaffle = () => {
  const [participants, setParticipants] = useState("");
  const [winnersCount, setWinnersCount] = useState(1);
  const [winners, setWinners] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [showResult, setShowResult] = useState(false);

  const URL = import.meta.env.VITE_URL


  const handleRaffle = async () => {
    const participantsArray = participants.split("\n").filter((p) => p.trim());
    if (participantsArray.length < winnersCount) {
      alert("Los ganadores no pueden ser más que los participantes.");
      return;
    }

    setIsSorting(true);
    setCountdown(3);
    
    // Cuenta regresiva antes de mostrar el resultado
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    setTimeout(async () => {
      try {
        const response = await fetch(
          `${URL}/api/quick-raffle`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ participants: participantsArray, winnersCount }),
          }
        );

        const data = await response.json();
        setWinners(data.winners);
        setIsSorting(false);
        setShowResult(true);
      } catch (error) {
        console.error("Error en el sorteo:", error);
      }
    }, 3000);
  };

  const handleRetry = () => {
    setShowResult(false);
    handleRaffle();
  };

  const handleNewRaffle = () => {
    setParticipants("");
    setWinners([]);
    setShowResult(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-5 px-4 py-4 bg-white shadow-md rounded">
      {!showResult ? (
        <>
          <h2 className="text-xl font-bold text-center mb-4">🎲 Sorteo Rápido</h2>

          <textarea
            className="w-full p-2 border rounded mb-3"
            rows="5"
            placeholder={`Ingresa los participantes, uno por línea...\n Participante 1\n Participante 2\n Participante 3`}
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            disabled={isSorting}
          />

          <input
            type="number"
            min="1"
            max={participants.split("\n").length}
            className="w-full p-2 border rounded mb-3"
            value={winnersCount}
            onChange={(e) => setWinnersCount(parseInt(e.target.value))}
            disabled={isSorting}
          />

          <button
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={handleRaffle}
            disabled={isSorting}
          >
            ¡Sortear!
          </button>

          {isSorting && (
            <div className="text-center mt-4">
              <p className="text-lg font-bold text-red-500">Sorteando en {countdown}...</p>
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mx-auto mt-2"></div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">🎉 ¡Ganadores!</h2>
          <ul className="text-lg mt-4">
            {winners.map((winner, index) => (
              <li key={index} className="font-semibold">
                🏆 {index + 1}° - {winner}
              </li>
            ))}
          </ul>

          <button
            className="mt-5 w-full bg-yellow-500 text-white p-2 rounded"
            onClick={handleRetry}
          >
            🔄 Sortear de nuevo
          </button>

          <button
            className="mt-3 w-full bg-red-500 text-white p-2 rounded"
            onClick={handleNewRaffle}
          >
            🔁 Nuevo sorteo
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickRaffle;
