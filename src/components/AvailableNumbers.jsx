import { motion } from "motion/react";
import useStore from "../store/useStore";

const AvailableNumbers = () => {
  const { numbers, numberSelect, toggleNumber } = useStore();

  return (
    <motion.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="bg-white p-6 rounded-2xl text-[#333] flex flex-col gap-2 text-center">
      <h2 className="font-bold text-xl">Números Disponibles</h2>
      <ul className="grid grid-cols-10 gap-2 text-center m-auto">
        {numbers.map((n) => (
          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{scale: 0.8}}
            initial={{y: -10, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.1, delay: 0.2 + (n / 2) * 0.01}}
            key={n}
            className={`cursor-pointer font-bold text-lg rounded-4xl h-10 w-10 leading-10 
              ${numberSelect.includes(n) ? "bg-red-300 cursor-not-allowed text-red-600" : "bg-green-400 hover:scale-110"}`}
            onClick={() => !numberSelect.includes(n) && toggleNumber(n)}
          >
            {n}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AvailableNumbers;
