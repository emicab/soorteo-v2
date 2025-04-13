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

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/90 px-2 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-3xl text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-2 text-center">
          Comprobante de Reserva
        </h2>
        <p className="font-mono text-center bg-gray-100 px-2 py-1 rounded">
          {referenceCode}
        </p>
        <p className="text-sm text-center mb-1">
          <strong>Sorteo: </strong>
          {title}
        </p>

        <div className="mt-4">
          <p className="text-sm">
            <strong>Nombre:</strong> {buyerName}
          </p>
          <p className="text-sm">
            <strong>DNI:</strong> {buyerDni}
          </p>
          <p className="text-sm">
            <strong>Números reservados:</strong> {numbers.join(", ")}
          </p>
          
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-semibold text-gray-600">Guardá este comprobante sacandole captura o guardá el codigo.</p>
          <p className="text-xs text-gray-500">
            Tus números fueron reservados correctamente. El organizador revisará tu reserva
            y confirmará el pago a la brevedad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationReceiptModal;
