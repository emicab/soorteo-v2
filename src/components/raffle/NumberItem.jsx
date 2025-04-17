import { motion } from "motion/react";
const NumberItem = ({
  number,
  isCreator,
  selectedNumbers,
  toggleSelect,
  approvePayment,
}) => {
  const getColor = (status) => {
    if (status === "sold") return "bg-red-400 text-red-700 cursor-not-allow";
    if (status === "reserved") return "bg-yellow-300";
    return "bg-green-500 hover:bg-green-400";
  };

  const isSelected = selectedNumbers.includes(number.number);

  return (
    <li className="flex flex-col justify-between items-center h-24 mt-4 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [1, 1.15, 1] }}
        transition={{ duration: 0.32, ease: "circOut" }}
        whileInView={{ opacity: 1, scale: 1.05 }}
        className={`p-1 w-12 h-12 leading-10 text-center rounded-full text-xl cursor-pointer group/item transition-all
    ${getColor(number.status)} ${isSelected ? "ring-3 ring-offset-1 ring-blue-500" : ""}`}
        onClick={() => {
          if (!isCreator && number.status === "available")
            toggleSelect(number.number);
        }}
      >
        {number.number}
      </motion.div>

      {/* Estado visible para todos */}
      {number.status === "available" && (
        <p className="text-xs text-gray-400">Disponible</p>
      )}
      {!isCreator && number.status === "reserved" && (
        <p className="text-xs text-yellow-500">Reservado</p>
      )}
      {!isCreator && number.status === "sold" && (
        <p className="text-xs text-red-400">Comprado</p>
      )}

      {/* vista creador */}
      {isCreator && number.status === "reserved" && (
        <p className="text-xs text-gray-400 whitespace-nowrap">{number.buyerName}</p>
      )}
      {isCreator && number.status !== "available" && (
        <div className="text-xs w-20 text-center overflow-hidden text-ellipsis whitespace-nowrap">
          {number.status === "sold" && (
            <p className="text-gray-600">
              {number.buyerName} - {number.buyerDni}
            </p>
          )}
          {number.status === "reserved" && (
            <button
              onClick={() => approvePayment(number.id)}
              className="mt-1 bg-blue-500 text-white px-2 py-0.5 rounded text-xs"
            >
              Aceptar
            </button>
          )}
        </div>
      )}
    </li>
  );
};

export default NumberItem;
