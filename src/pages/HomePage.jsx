import QuickRaffle from "../components/raffle/QuickRaffle";
import SearchRaffle from "../components/raffle/SearchRaffle";
import SearchHistory from "../components/raffle/SearchHistory";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <QuickRaffle />
      <div className="my-6">
        <SearchRaffle />
      </div>
      <SearchHistory />
    </div>
  );
};

export default HomePage;
