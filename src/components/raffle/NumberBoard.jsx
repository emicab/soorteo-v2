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
        console.log(data.tickets);
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

  return (
    <div className="mt-2">
      <div className="h-64 py-4 overflow-hidden rounded-lg shadow-lg overflow-y-auto">
        <ul className="grid grid-cols-4 justify-items-center grid-row-5 md:grid-cols-8 md:px-2 gap-2">
          {numbers.map((n) => (
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
