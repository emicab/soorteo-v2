import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { delayRedirect } from "../../utils/utils";
import SearchIcon from "../UI/icons/SearchIcon";
import SearchHistory from "../raffle/SearchHistory";
import { toast } from "react-toastify";

const SearchRaffle = ({ setSearchModalOpen }) => {
  const [shortCode, setShortCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const URL = import.meta.env.VITE_URL;

  const handleSearch = async () => {
    if (!shortCode.trim()) return;

    try {
      const res = await fetch(`${URL}/api/raffles/shortcode/${shortCode}`);
      if (!res.ok) throw new Error("Sorteo no encontrado");

      const raffle = await res.json();

      const history = JSON.parse(localStorage.getItem("raffleHistory") || "[]");
      const updated = [
        raffle,
        ...history.filter((r) => r.id !== raffle.id),
        ...history.filter((r) => r.status !== raffle.status),
      ].slice(0, 5);
      localStorage.setItem("raffleHistory", JSON.stringify(updated));

      delayRedirect(navigate, `/${shortCode}`);
      setSearchModalOpen(false);
    } catch (err) {
      setError("No se encontró ningún sorteo con ese código.");
      console.error(err);
      toast.error("No se encontró ningún sorteo con ese código.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <input
          type="text"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="ABC123"
          className={`bg-white border-gray-300 px-3 py-2 rounded-tl-lg rounded-bl-lg border focus:outline-blue-500 w-full md:max-w-3xs ${error ? "border-red-500" : "border-gray-300"}`}
        />
        <button
          onClick={() => handleSearch}
          className="bg-blue-600 text-white px-4 hover:bg-blue-700 rounded-tr-lg rounded-br-lg"
        >
          <SearchIcon />
        </button>
      </div>
      {/* <SearchHistory /> */}
    </div>
  );
};

export default SearchRaffle;
