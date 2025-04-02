import useStore from "../store/useStore";

const LotterySection = () => {
  const { cantidadSorteo, setCantidadSorteo, sortear, contador } = useStore();

  return (
    <div className="p-6 rounded-2xl bg-gray-200 text-[#333] flex flex-col gap-4 text-center max-w-md">
      <h2 className="font-bold text-xl">Sorteo</h2>
      <label>
        Cantidad de números a sortear:
        <input
          type="number"
          min="1"
          value={cantidadSorteo}
          onChange={(e) => setCantidadSorteo(Number(e.target.value))}
          className="ml-2 border p-1 rounded w-16 text-center"
        />
      </label>
      <button onClick={sortear} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Sortear
      </button>
      {contador > 0 && <p className="text-xl font-bold text-red-600">Sorteando en {contador}...</p>}
    </div>
  );
};

export default LotterySection;
