import { useState } from "react";
import RaffleCountdownDraw from "./raffle/RaffleCountdownDraw";

const DrawButton = ({ raffleId, onDrawSuccess }) => {
  const [showCountdown, setShowCountdown] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowCountdown(true)}
        className="bg-purple-600 text-white w-full mt-4 px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
      >
        🎰 Realizar sorteo
      </button>

      {showCountdown && (
        <RaffleCountdownDraw
          raffleId={raffleId}
          onDrawCompleted={(winners) => {
            if (onDrawSuccess) onDrawSuccess();
          }}
          onClose={() => setShowCountdown(false)}
        />
      )}
    </>
  );
};

export default DrawButton;
