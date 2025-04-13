import { useEffect, useState } from "react";

const RaffleLoader = () => {
  const loadingPhrases = [
    "Buscando tu suerte...",
    "Cargando números mágicos...",
    "Girando la ruleta...",
    "Acomodando premios...",
    "Verificando sorteo...",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-green-700 font-semibold">
        {loadingPhrases[phraseIndex]}
      </p>
    </div>
  );
};

export default RaffleLoader;
