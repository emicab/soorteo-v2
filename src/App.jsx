import AvailableNumbers from "./components/AvailableNumbers";
import SelectedNumbers from "./components/SelectedNumbers";
import LotterySection from "./components/LotterySection";
import ResultsList from "./components/ResultsList";
import PrizeInput from "./components/PrizeInput";

function App() {
  return (
    <div className="bg-gray-800 p-6">
      <h1 className="text-4xl text-white text-center font-bold py-4">
        Sorteo v2
      </h1>

      <div className="flex flex-col items-center md:flex-row justify-center gap-5">
        <AvailableNumbers />
        <div className="flex flex-col w-full md:w-1/3">
          <SelectedNumbers />
          <PrizeInput />
        </div>
      </div>

      <div className="flex mt-4 justify-center gap-4">
        <LotterySection />
        <ResultsList />
      </div>
    </div>
  );
}

export default App;
