import QuickRaffle from "../components/raffle/QuickRaffle";
import SearchRaffle from "../components/raffle/SearchRaffle";
import SearchHistory from "../components/raffle/SearchHistory";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Rifalo | Crea y participa en sorteos online</title>
        <meta name="description" content="Crea sorteos personalizados o participa en los que ya están activos. Rifalo es la forma más fácil y segura de organizar y ganar premios." />
        <meta property="og:title" content="Rifalo | Sorteos online" />
        <meta property="og:description" content="Organizá o participá en sorteos desde cualquier lugar. Fácil, rápido y sin complicaciones." />
        <meta property="og:url" content="https://rifalo.com.ar" />
      </Helmet>

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center">¡Bienvenidos a Rifalo!</h1>
        <QuickRaffle />
        <div className="my-2">
          <SearchRaffle />
        </div>
        <SearchHistory />
      </div>
    </>
  );
};

export default HomePage;
