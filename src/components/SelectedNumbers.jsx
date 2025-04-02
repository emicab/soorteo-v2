import React from "react";
import useStore from "../store/useStore";

const SelectedNumbers = () => {
  const { numberSelect, removeNumber } = useStore();

  return (
    <div className="bg-white p-6 rounded-2xl text-[#333] mb-10 flex flex-col items-center gap-2 text-center  w-full">
      <h2 className="font-bold text-xl">Números Seleccionados</h2>
      <ul className="flex flex-wrap gap-2">
        {numberSelect.map((n) => (
          <li
            key={n}
            className="cursor-pointer font-bold w-10 h-10 leading-9.5 bg-green-500 rounded-4xl text-center hover:bg-red-500"
            onClick={() => removeNumber(n)}
          >
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedNumbers;
