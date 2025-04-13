import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchHistory = () => {
  const [history, setHistory] = useState([]);

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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("raffleHistory") || "[]");
    setHistory(saved);
  }, []);

  if (history.length === 0) return null;

  return (
    <div className="mt-6 max-w-md mx-auto">
      <h3 className="text-md font-medium mb-2">Sorteos visitados recientemente:</h3>
      <ul className="list-disc pl-4 space-y-1 text-lg text-blue-700">
        {history.map((raffle) => (
          <li key={raffle.shortCode} className="text-lg">
            <Link to={`/${raffle.shortCode}`} className=" flex gap-2 items-center">
              <p className="uppercase font-semibold hover:underline">{raffle.title}</p>
              <p className="bg-gray-200 text-md px-2 py-[1px] rounded-lg">{raffle.shortCode}</p>
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
