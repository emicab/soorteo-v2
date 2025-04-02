import { motion } from "motion/react";
import useStore from "../store/useStore";

const AvailableNumbers = () => {
  const { numbers, numberSelect, toggleNumber } = useStore();

  return (
    <div className="bg-white p-6 rounded-2xl text-[#333] flex flex-col gap-2 text-center">
      <h2 className="font-bold text-xl">Números Disponibles</h2>
      <ul className="grid grid-cols-10 gap-2 text-center m-auto">
        {numbers.map((n) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{scale: 0.8}}
            key={n}
            className={`cursor-pointer font-bold text-lg rounded-4xl h-10 w-10 leading-9.5 
              ${numberSelect.includes(n) ? "bg-gray-400 cursor-not-allowed text-gray-200" : "bg-green-400 hover:scale-110"}`}
            onClick={() => !numberSelect.includes(n) && toggleNumber(n)}
          >
            {n}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableNumbers;
