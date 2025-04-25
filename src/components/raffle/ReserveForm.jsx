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
  reserveNumber,
  sellers = [],
  selectedSeller,
  setSelectedSeller
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
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    
    className="mt-6 bg-white p-6 rounded-lg shadow-md space-y-4 border border-gray-200">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          placeholder="Ej: Juan Pérez"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Últimos 3 dígitos del DNI
        </label>
        <input
          type="number"
          placeholder="Ej: 123"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          maxLength={3}
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </div>

      {sellers.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendedor
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={selectedSeller}
            onChange={(e) => setSelectedSeller(e.target.value)}
          >
            <option value="">Selecciona un vendedor</option>
            {sellers.map((seller) => (
              <option key={seller.id} value={seller.id}>
                {seller.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          className="mt-1 min-w-7 h-7 text-blue-600 bg-gray-100 border-gray-300 rounded"
        />
        <p className="text-sm font-semibold text-gray-600 my-auto leading-tight">
          Acepto los{" "}
          <Link
            to="/termsAndConditions"
            className="text-blue-600 underline hover:text-blue-800"
          >
            términos y condiciones
          </Link>{" "}
          del sorteo. El sitio solo funciona como intermediario.
        </p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!selectedNumbers.length}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-200
          ${
            (!acceptedTerms || name.length < 3 || dni.length !== 3)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        Reservar números
      </button>
    </motion.div>
  );
};

export default ReserveForm;
