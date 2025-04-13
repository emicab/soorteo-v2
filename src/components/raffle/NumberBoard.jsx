import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import NumberItem from "./NumberItem";
import ReserveForm from "./ReserveForm";
import ReservationReceiptModal from "../ReservationReceiptModal";

const NumberBoard = ({ raffleId, isCreator, title }) => {
  const { token } = useAuthStore();
  const [numbers, setNumbers] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [name, setName] = useState("");
  const [dni, setDni] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [seller, setSeller] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState();

  const [filters, setFilters] = useState({
    available: true,
    reserved: true,
    sold: true,
  });

  const URL = import.meta.env.VITE_URL;

  const fetchNumbers = async () => {
    try {
      const res = await fetch(`${URL}/api/raffles/numbers/${raffleId}`);
      const data = await res.json();
      setNumbers(data);
    } catch (err) {
      console.error("Error obteniendo números:", err);
    }
  };

  const toggleSelect = (num) => {
    setSelectedNumbers((prev) =>
      prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
    );
  };

  const reserveNumber = async () => {
    if (!name || dni.length !== 3)
      return alert("Completa nombre y DNI (3 dígitos)");

    try {
      const res = await fetch(`${URL}/api/numbers/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raffleId,
          numbers: selectedNumbers,
          buyerName: name,
          buyerDni: dni,
          sellerId: selectedSeller,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setReceiptData({
          buyerName: name,
          buyerDni: dni,
          selectedNumbers: selectedNumbers,
          title: title || "Sorteo",
          tickets: data.tickets,
        });
        setShowReceipt(true);
        setSelectedNumbers([]);
        setName("");
        setDni("");
        fetchNumbers();
      }
    } catch (err) {
      console.error("Error reservando número:", err);
    }
  };

  const fetchSellers = async () => {
    try {
      const res = await fetch(`${URL}/api/sellers/${raffleId}/sellers`);
      const data = await res.json();
      setSeller(data);
    } catch (err) {
      console.error("Error obteniendo vendedores:", err);
    }
  };

  const approvePayment = async (numberId) => {
    try {
      const res = await fetch(`${URL}/api/numbers/approve/${numberId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchNumbers();
    } catch (err) {
      console.error("Error aprobando pago:", err);
    }
  };

  useEffect(() => {
    if (raffleId) {
      fetchNumbers();
      fetchSellers();
    }
  }, [raffleId]);

  const filteredNumbers = numbers.filter((n) => filters[n.status]);

  return (
    <div className="mt-2">
      <div className="flex gap-2 flex-wrap px-2">
        {[
          {
            key: "available",
            label: "Disponibles",
            color: "bg-green-100 text-green-700",
          },
          {
            key: "reserved",
            label: "Reservados",
            color: "bg-yellow-100 text-yellow-700",
          },
          { key: "sold", label: "Vendidos", color: "bg-red-100 text-red-700" },
        ].map(({ key, label, color }) => {
          const isActive = filters[key];
          return (
            <div
              key={key}
              onClick={() =>
                setFilters((prev) => ({ ...prev, [key]: !prev[key] }))
              }
              className={`
          cursor-pointer px-4 py-1 rounded-full font-semibold text-sm
          transition-colors duration-200
          ${
            isActive
              ? `${color} border border-opacity-50 border-gray-300`
              : "bg-gray-100 text-gray-500"
          }
        `}
            >
              {label}
            </div>
          );
        })}
      </div>

      <div className="h-64 py-2 overflow-hidden rounded-lg shadow-lg overflow-y-auto">
        <ul className="grid grid-cols-4 justify-items-center grid-row-5 md:grid-cols-8 md:px-2 gap-2">
          {filteredNumbers.map((n) => (
            <NumberItem
              key={n.id}
              number={n}
              isCreator={isCreator}
              selectedNumbers={selectedNumbers}
              toggleSelect={toggleSelect}
              approvePayment={approvePayment}
            />
          ))}
        </ul>
      </div>

      {!isCreator && selectedNumbers.length > 0 && (
        <ReserveForm
          selectedNumbers={selectedNumbers}
          name={name}
          dni={dni}
          setName={setName}
          setDni={setDni}
          reserveNumber={reserveNumber}
          sellers={seller}
          selectedSeller={selectedSeller}
          setSelectedSeller={setSelectedSeller}
        />
      )}
      <ReservationReceiptModal
        show={showReceipt}
        onClose={() => setShowReceipt(false)}
        buyerName={receiptData?.buyerName}
        buyerDni={receiptData?.buyerDni}
        title={receiptData?.title}
        tickets={receiptData?.tickets}
      />
    </div>
  );
};

export default NumberBoard;
