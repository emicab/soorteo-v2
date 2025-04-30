import { useState } from "react";

const SellersForm = ({ sellers, setSellers }) => {
  const [vendedorInput, setVendedorInput] = useState("");

  const agregarVendedor = () => {
    const nombre = vendedorInput.trim();
    if (nombre && !sellers.includes(nombre)) {
      setSellers([...sellers, nombre]);
      setVendedorInput("");
    }
  };

  const eliminarVendedor = (index) => {
    setSellers(sellers.filter((_, i) => i !== index));
  };

  return (
    <div className="my-4">
      <label className="block text-sm font-semibold mb-1">Vendedores</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={vendedorInput}
          onChange={(e) => setVendedorInput(e.target.value)}
          placeholder="Nombre del vendedor"
          className="border rounded px-2 py-1 w-full"
        />
        <button
          type="button"
          onClick={agregarVendedor}
          className="bg-violet-500 text-white px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      {sellers.length > 0 && (
        <ul className="mt-2 space-y-1">
          {sellers.map((v, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded"
            >
              {v}
              <button
                type="button"
                onClick={() => eliminarVendedor(i)}
                className="text-red-500 hover:text-red-700"
              >
                {sellers.length > 0 ? "❌" : ""}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellersForm;
