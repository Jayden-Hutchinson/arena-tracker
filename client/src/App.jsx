import TrackerForm from "./components/tracker/TrackerForm";
import TrackerBoard from "./components/tracker_board/TrackerBoard";
import TrackedRiotAccountsController from "./controllers/TrackedRiotAccountsController";

function App() {
  const trackedRiotAccounts = TrackedRiotAccountsController.loadAll();

  if (!trackedRiotAccounts) {
    console.debug("No tracked riot accounts");
  } else {
    console.debug("Loaded saved accounts", trackedRiotAccounts);
  }

  return (
    <div className="flex flex-col items-center">
      <TrackerForm />
      {trackedRiotAccounts && (
        <TrackerBoard trackedRiotAccounts={trackedRiotAccounts} />
      )}
    </div>
  );
}

export default App;
