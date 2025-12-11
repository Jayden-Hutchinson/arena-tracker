import SummonerSearch from "./components/summoner_search/SummonerSearch";
import TopBar from "./components/top_bar/TopBar";
import TrackerBoard from "./components/tracker_board/TrackerBoard";

function App() {
  function saveDummyAccounts() {
    console.log("hi");
  }
  return (
    <div className="flex h-screen flex-col items-center bg-cyan-950/20">
      <SummonerSearch />
      <TrackerBoard />
      {/* <button onClick={saveDummyAccounts}>save</button> */}
    </div>
  );
}

export default App;
