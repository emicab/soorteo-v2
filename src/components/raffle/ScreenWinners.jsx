import React from 'react'

const ScreenWinners = ({winners}) => {
    return (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
            🎉 Ganadores del sorteo
          </h2>
          {winners.map((winner, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 bg-purple-50 border border-purple-200 rounded-lg p-4 shadow-sm"
            >
              <p className="text-xl md:text-2xl font-semibold text-purple-800">
                {idx + 1}. {winner.buyerName} -{" "}
                <span className="text-gray-700 font-normal">
                  {winner.buyerDni}
                </span>
              </p>
              <p className="text-xs md:text-sm font-medium py-1 px-3 bg-purple-200 text-purple-800 rounded-full">
                Código: {winner.referenceCode}
              </p>
            </div>
          ))}
        </div>
      );
    }

export default ScreenWinners