import { useNavigate } from "react-router-dom";
import CheckVerified from "../UI/icons/CheckVerified";

const RafflePublicCard = ({ raffle }) => {
  const navigate = useNavigate();

  const handleEnterRaffle = () => {
    navigate(`/${raffle.shortCode}`); // Ajustá la ruta si usás otra convención
  };

  return (
    <div className={`border ${raffle.owner.verified ? "border-blue-500" : "border-gray-300"} p-4 rounded-2xl bg-white hover:shadow-md transition-shadow duration-300 `}>
      <h2 className="text-lg font-semibold text-gray-800 mb-2 uppercase">{raffle.title}</h2>
  
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-700">👤</span>
          <p>{raffle.owner.username}</p>
          {raffle.owner.verified && ( <CheckVerified verified={raffle.owner.verified} /> )}
        </div>
        <p>
          <span className="font-medium text-gray-700">📅 Fecha del sorteo:</span>{" "}
          {new Date(raffle.date).toLocaleDateString("es-AR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "America/Argentina/Buenos_Aires",
          })}
        </p>
  
        <p>
          <span className="font-medium text-gray-700">💸 Precio por número:</span>{" "}
          ${raffle.pricePerNumber.toLocaleString("es-AR")}
        </p>
  
      </div>
  
      <button
        onClick={handleEnterRaffle}
        className="w-full py-2 rounded-md cursor-pointer text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition"
      >
        {raffle.status === "pending" ? "Participar" : "Ver Resultados"}
      </button>
    </div>
  );
  
};

export default RafflePublicCard;
