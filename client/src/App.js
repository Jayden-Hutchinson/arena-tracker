import "./App.css";

import Navbar from "components/navbar/Navbar.js";
import TrackerBoard from "components/tracker_board/TrackerBoard.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <TrackerBoard />
    </div>
  );
}

export default App;
