import { useState, useEffect } from "react";

import Tracker from "components/tracker/Tracker";
import TrackerSearch from "components/tracker_search/TrackerSearch";
import AccountManager from "objects/AccountManager";

import "./TrackerBoard.css";

function TrackerBoard() {
  const accountManager = new AccountManager();

  return (
    <div className="TrackerBoard">
      {accountManager.accounts &&
        accountManager.accounts.map((account) => {
          console.log(account);
          return <Tracker account={account} />;
        })}
      <TrackerSearch callback={accountManager.addAccount} />
    </div>
  );
}
export default TrackerBoard;
