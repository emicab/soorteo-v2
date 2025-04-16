import { useEffect } from "react";

const ReservationReceiptModal = ({
  show,
  onClose,
  buyerName,
  buyerDni,
  title,
  tickets = [],
  }) => {
  if (!show || !Array.isArray(tickets) || tickets.length === 0) return null;

  const referenceCode = tickets[0]?.referenceCode;
  const numbers = tickets.map((t) => t.number).sort((a, b) => a - b);

  useEffect(() => {
    if (show) {
      const reservationData = {
        buyerName,
        buyerDni,
        referenceCode,
        numbers,
        title,
      };
      localStorage.setItem("latestReservation", JSON.stringify(reservationData));

    }
  }, [show, buyerName, buyerDni, referenceCode, numbers, title]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/90 px-2 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-3xl text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-1 text-center">
          Comprobante de Reserva
        </h2>

        <div className="mt-2 flex flex-col items-center gap-2 justify-around">
          <p className="text-sm text-center">
            <strong>Sorteo: </strong>{title}
          </p>
          <div className="flex gap-2">
            <p className="text-sm"><strong>Nombre:</strong> {buyerName}</p>
            <p className="text-sm"><strong>DNI:</strong> {buyerDni}</p>
          </div>
          <p className="text-sm"><strong>Números reservados:</strong> {numbers.join(", ")}</p>
        </div>

        <p className="font-mono text-center bg-gray-100 px-2 py-1 mt-2 rounded">
          Codigo: {referenceCode}
        </p>
        <div className="mt-6 text-center">
          <p className="text-sm text-green-600 font-semibold">✔️ Ya tenes el alias copiado</p>
          <p className="text-sm text-gray-700">
            Ahora transferí el monto correspondiente y avisale al organizador que ya realizaste el pago.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationReceiptModal;
