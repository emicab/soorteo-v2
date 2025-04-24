import { useNavigate } from "react-router-dom";
import CheckVerified from "../UI/icons/CheckVerified";

const RafflePublicCard = ({ raffle }) => {
  const navigate = useNavigate();

  const handleEnterRaffle = () => {
    navigate(`/${raffle.shortCode}`); // Ajustá la ruta si usás otra convención
  };

  return (
    <div className={`border ${raffle.owner.verified ? "border-blue-500" : "border-gray-300"} p-4 rounded-2xl bg-white hover:shadow-md transition-shadow duration-300`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{raffle.title}</h2>
  
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p className="flex items-center gap-1">
          <span className="font-medium text-gray-700">👤 Organizador:</span>{" "}
          {raffle.owner.username}
          {raffle.owner.verified && ( <CheckVerified verified={raffle.owner.verified} /> )}
        </p>
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
        className="w-full py-2 rounded-xl cursor-pointer text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Ver Sorteo
      </button>
    </div>
  );
  
};

export default RafflePublicCard;
