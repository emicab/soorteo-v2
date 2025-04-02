import useStore from "../store/useStore";

const ResultsList = () => {
  const { resultados } = useStore();

  return (
    resultados.length > 0 && (
      <div className="bg-white p-6 rounded-2xl text-[#333] w-2/6">
        <h3 className="font-bold text-xl text-center">Resultados del Sorteo</h3>
        <ul className="mt-4">
          {resultados.map((r, index) => (
            <li key={index} className="p-2 bg-yellow-300 rounded-lg my-1 text-center">
              🎉 Número: <strong>{r.numero}</strong> → Premio: <strong>{r.premio}</strong>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default ResultsList;
