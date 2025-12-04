import SummonerSearch from "./components/summoner_search/SummonerSearch";
import TrackerBoard from "./components/tracker_board/TrackerBoard";

function App() {
  function saveDummyAccounts() {
    console.log("hi");
  }
  return (
    <div className="flex flex-col items-center">
      <SummonerSearch />
      <TrackerBoard />
      <button onClick={saveDummyAccounts}>save</button>
    </div>
  );
}

export default App;
