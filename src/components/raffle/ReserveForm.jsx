import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ReserveForm = ({
  selectedNumbers,
  name,
  dni,
  setName,
  setDni,
  onBuy, // Nuevo nombre
  sellers,
  selectedSeller,
  setSelectedSeller,
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSubmit = () => {
    if (!acceptedTerms) {
      toast.error("Debes aceptar los términos y condiciones para continuar.");
      return;
    }
    if (sellers.length > 1 && !selectedSeller) {
      toast.warn("Debes seleccionar un vendedor.");
      return;
    }

    reserveNumber({ sellerId: selectedSeller }); // Pasar el seller seleccionado
  };

  return (
    <div className="mt-4 p-4 rounded-lg border bg-white shadow-md flex flex-col gap-2 max-w-md mx-auto">
      <h3 className="font-bold text-lg text-center">
        Comprar {selectedNumbers.length} número{selectedNumbers.length > 1 && "s"}
      </h3>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="DNI (3 dígitos)"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        className="p-2 border rounded"
        maxLength={3}
      />

      {sellers.length > 0 && (
        <select
          value={selectedSeller || ""}
          onChange={(e) => setSelectedSeller(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Seleccionar vendedor</option>
          {sellers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      )}

      <button
        onClick={onBuy}
        className="bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition"
      >
        Proceder al pago
      </button>
    </div>
  );
};

export default ReserveForm;
