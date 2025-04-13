import { useState } from "react";
import InputField from "../UI/InputField";
import useAuthStore from "../../store/useAuthStore";
import SellersForm from "../sellers/SellersForm";

import z from "zod";
import { raffleSchema, sellersSchema } from "../schema/raffleSchema.js";

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
    winnersCount: "",
  });

  const [hasSellers, setHasSellers] = useState(false);
  const [sellers, setSellers] = useState([""]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedFormData = raffleSchema.parse(formData);

      const res = await fetch(`${import.meta.env.VITE_URL}/api/raffles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validatedFormData),
      });

      const data = await res.json();
      if (res.ok && data.id) {
        if (hasSellers) {
          try {
            const validatedSellers = sellersSchema.parse(sellers);
            const duplicates = validatedSellers.filter(
              (item, index) => validatedSellers.indexOf(item) !== index
            );

            if (duplicates.length > 0) {
              alert(
                "Hay nombres de vendedores duplicados: " + duplicates.join(", ")
              );
              return;
            }

            await fetch(`${import.meta.env.VITE_URL}/api/sellers`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                raffleId: data.id,
                sellers: validatedSellers,
              }),
            });
          } catch (err) {
            if (err instanceof z.ZodError) {
              alert(
                "Errores en los vendedores:\n" +
                  err.errors.map((e) => e.message).join("\n")
              );
            } else {
              console.error("Error inesperado en vendedores:", err);
            }
            return;
          }
        }

        setFormData({
          title: "",
          description: "",
          totalNumbers: "",
          pricePerNumber: "",
          date: "",
          whatsapp: "",
          alias: "",
          winnersCount: "",
        });
        setHasSellers(false);
        setSellers([""]);
        onClose();
      } else {
        console.error("Error al crear sorteo:", data);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        alert(
          "Errores en el formulario:\n" +
            err.errors.map((e) => `${e.path[0]}: ${e.message}`).join("\n")
        );
      } else {
        console.error("Error inesperado:", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Crear Nuevo Sorteo</h2>

      <InputField
        label="Título del sorteo"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <InputField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <InputField
        label="Cantidad de números"
        name="totalNumbers"
        type="number"
        value={formData.totalNumbers}
        onChange={handleChange}
      />
      <InputField
        label="Cantidad de ganadores"
        name="winnersCount"
        type="number"
        value={formData.winnersCount}
        onChange={handleChange}
      />
      <InputField
        label="Precio por número"
        name="pricePerNumber"
        type="number"
        value={formData.pricePerNumber}
        onChange={handleChange}
      />
      <InputField
        label="Fecha del sorteo"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
      />

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

      <hr className="my-4" />

      <label className="flex items-center space-x-2 mb-2">
        <input
          type="checkbox"
          checked={hasSellers}
          onChange={(e) => setHasSellers(e.target.checked)}
        />
        <span className="text-sm">¿Hay más de un vendedor?</span>
      </label>

      {hasSellers && <SellersForm sellers={sellers} setSellers={setSellers} />}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Crear Sorteo
      </button>
    </form>
  );
};

export default CreateRaffle;
