import { useEffect, useState } from "react";
import LogoRifalo from "./icons/LogoRifalo";

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
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10">
        <LogoRifalo className="w-30 fill-black"/>
      </div>
      <p className="mt-2 text-text font-semibold">
        {loadingPhrases[phraseIndex]}
      </p>
    </div>
  );
};

export default RaffleLoader;
