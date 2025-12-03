import TrackerForm from "./components/tracker/TrackerForm";
import TrackerBoard from "./components/tracker_board/TrackerBoard";
import { storageController } from "./controllers/StorageController";

function App() {
  if (!storageController.riotAccounts) {
    console.debug("No tracked riot accounts");
  } else {
    console.debug("Loaded saved accounts", storageController.riotAccounts);
  }

  return (
    <div className="flex flex-col items-center">
      <TrackerForm />
      {storageController.riotAccounts && (
        <TrackerBoard />
      )}
    </div>
  );
}

export default App;
