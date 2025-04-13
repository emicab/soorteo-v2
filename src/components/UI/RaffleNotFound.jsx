import { useNavigate } from "react-router-dom";

const RaffleNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4 text-center">
      <div className="text-6xl mb-4">😢</div>
      <h2 className="text-2xl font-bold text-red-600 mb-2">Sorteo no encontrado</h2>
      <p className="text-gray-600 mb-6">
        El código ingresado no corresponde a ningún sorteo activo. Verificá que esté bien escrito.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-all"
      >
        Volver al inicio
      </button>
    </div>
  );
};

export default RaffleNotFound;
