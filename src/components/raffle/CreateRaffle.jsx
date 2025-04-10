import { useState } from "react";
import InputField from "../UI/InputField";
import useAuthStore from "../../store/useAuthStore";

const CreateRaffle = ({ onClose }) => {
  const { token } = useAuthStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    totalNumbers: "",
    pricePerNumber: "",
    date: "",
    whatsapp: "",
    alias: "",
    winnersCount: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    const res = await fetch(`${import.meta.env.VITE_URL}/api/raffles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      // TODO: redirigir o limpiar el formulario
      setFormData({
        title: "",
        description: "",
        totalNumbers: "",
        pricePerNumber: "",
        date: "",
        whatsapp: "",
        alias: "",
        winnersCount: ""
      });
    } else {
      console.error("Error al crear sorteo:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Crear Nuevo Sorteo</h2>

      <InputField label="Título del sorteo" name="title" value={formData.title} onChange={handleChange} />
      <InputField label="Descripción" name="description" value={formData.description} onChange={handleChange} />
      <InputField label="Cantidad de números" name="totalNumbers" type="number" value={formData.totalNumbers} onChange={handleChange} />
      <InputField label="Cantidad de ganadores" name="winnersCount" type="number" value={formData.winnersCount} onChange={handleChange} />
      <InputField label="Precio por número" name="pricePerNumber" type="number" value={formData.pricePerNumber} onChange={handleChange} />
      <InputField label="Fecha del sorteo" name="date" type="date" value={formData.date} onChange={handleChange} />

      <hr className="my-4" />

      <InputField
        label="WhatsApp del creador"
        name="whatsapp"
        value={formData.whatsapp}
        onChange={handleChange}
        placeholder="Ej: +5492901234567"
      />
      <InputField
        label="Alias o método de pago"
        name="alias"
        value={formData.alias}
        onChange={handleChange}
        placeholder="Ej: alias.mp"
      />

      <button 
        onClick={onClose}
        type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Crear Sorteo
      </button>
    </form>
  );
};

export default CreateRaffle;
