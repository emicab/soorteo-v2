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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto max-h-[90vh] overflow-y-auto space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
        Crear Nuevo Sorteo
      </h2>

      {/* Título y Descripción */}
      <InputField
        label="Título del sorteo"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Sorteo de un iPhone 14"
      />
      <InputField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Sorteo beneficios a la comunidad"
      />

      {/* Agrupados: cantidad de números + ganadores */}
      <div className="flex sm:flex-row gap-4">
        <div className="flex-1">
          <InputField
            label="Cantidad de números"
            name="totalNumbers"
            type="number"
            value={formData.totalNumbers}
            onChange={handleChange}
            placeholder="100"
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Ganadores"
            name="winnersCount"
            type="number"
            value={formData.winnersCount}
            onChange={handleChange}
            placeholder="5"
          />
        </div>
      </div>

      {/* Agrupados: precio + fecha */}
      <div className="flex sm:flex-row gap-4">
        <div className="flex-1">
          <InputField
            label="Precio por número"
            name="pricePerNumber"
            type="number"
            value={formData.pricePerNumber}
            onChange={handleChange}
            placeholder="2500"
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Fecha del sorteo"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <hr className="my-2" />

      {/* Agrupados: WhatsApp + alias */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <InputField
            label="WhatsApp del creador"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="92901234567"
          />
        </div>
        <div className="flex-1">
          <InputField
            label="Alias o método de pago"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            placeholder="alias.mp.sorteo"
          />
        </div>
      </div>

      <hr className="my-2" />
      <label >
        <span className="text-md font-semibold" >Privacidad:</span>
        <select name="select" className="text-md " onChange={(e) => setFormData({ ...formData, privacity: e.target.value })}>
          <option value="private">Privado</option>
          <option value="public">Público</option>
        </select>
      </label>
      <hr className="my-2" />

      {/* Checkbox y vendedores */}
      <label className="flex items-center space-x-2 text-sm">
        <input
          type="checkbox"
          checked={hasSellers}
          onChange={(e) => setHasSellers(e.target.checked)}
          className="accent-violet-500"
        />
        <span>¿Hay más de un vendedor?</span>
      </label>

      {hasSellers && (
        <div className="mt-2">
          <SellersForm sellers={sellers} setSellers={setSellers} />
        </div>
      )}

      {/* Botón */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl mt-4 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!formData.title || !formData.description || !formData.totalNumbers || !formData.pricePerNumber || !formData.date || !formData.whatsapp || !formData.alias || !formData.winnersCount}
        >
          Crear Sorteo
        </button>
      </div>
    </form>
  );

};

export default CreateRaffle;
