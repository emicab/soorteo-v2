const ScreenWinners = ({ results }) => {
  if (!results || results.length === 0) return null;
  console.log("Ganadores:", results);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        🎉 Ganadores del sorteo
      </h2>
      {results?.map((result, idx) => {
        const ticket = result.ticket;
        const prize = result.prize;

        return (
          <div
            key={result.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm"
          >
            <div>
              <p className="text-xl md:text-2xl font-semibold text-purple-800">
                {idx + 1}. {ticket.buyerName} -{" "}
                <span className="text-gray-700 font-normal">
                  DNI: {ticket.buyerDni}
                </span>
              </p>
              <p className="text-lg text-purple-700 mt-1 font-medium">
                🏆 Premio:{" "}
                <span className="font-bold">
                  {prize?.name || "Sin premio asignado"}
                </span>
              </p>
            </div>

            <p className="text-xs md:text-sm font-medium py-1 px-3 bg-purple-200 text-purple-800 rounded-full">
              Código: {ticket.referenceCode}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ScreenWinners;
