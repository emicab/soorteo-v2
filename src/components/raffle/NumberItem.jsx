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
    <li className="flex flex-col justify-center items-center h-28">
      <div
        className={`p-1 w-12 h-12 leading-10 text-center rounded-full text-xl cursor-pointer group/item  transition-all
        ${getColor(number.status)} ${isSelected ? "ring-2 ring-blue-500" : ""}`}
        onClick={() => {
          if (!isCreator && number.status === "available")
            toggleSelect(number.number);
        }}
      >
        {number.number}
      </div>
      {number.status === "available" && ( <p className="z-1 text-gray-400">Disponible</p> )}
      {number.status === "reserved" && ( <p className="z-1 text-gray-400">Reservado</p> )}
      {!isCreator && number.status === "sold" && ( <p className="z-1 text-red-400">Comprado</p> )}
      {isCreator && number.status !== "available" && (
        <div className="text-lg flex">
          {number.status === "sold" && (
            <p className="text-sm text-gray-600">{number.buyerName} - {number.buyerDni}</p>
          )}
          {number.status === "reserved" && (
            <button
              onClick={() => approvePayment(number.id)}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded z-2 cursor-pointer"
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
