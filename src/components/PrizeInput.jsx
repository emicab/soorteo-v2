import React, { useState } from "react";
import useStore from "../store/useStore";

const PrizeInput = () => {
  const [prize, setPrize] = useState("");
  const { premios, addPrize, removePrize } = useStore();

  const handleAddPrize = () => {
    if (prize.trim() !== "") {
      addPrize(prize);
      setPrize("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl text-[#333] flex flex-col items-center gap-2 text-center">
      <h2 className="font-bold text-xl">Premios a sortear</h2>

      <div className="flex gap-2">
        <input
          type="text"
          value={prize}
          onChange={(e) => setPrize(e.target.value)}
          placeholder="Ej: Botella de vino"
          className="border p-2 rounded w-34 md:w-64"
        />
        <button onClick={handleAddPrize} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Agregar
        </button>
      </div>

      <ul className="mt-2 w-full text-left">
        {premios.map((p, index) => (
          <li key={index} className="flex justify-between bg-gray-100 p-2 rounded my-1">
            {p}
            <button
              onClick={() => removePrize(index)}
              className="text-red-500 hover:text-red-700"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrizeInput;
