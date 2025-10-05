import { useState, useEffect } from "react";

import { ClientApi } from "../../../api/clientApi";
import Tracker from "../tracker/Tracker";

import "./TrackerBoard.css";
function TrackerBoard() {
  const accounts = [
    {
      gameName: "TannerennaT",
      tagLine: "na1",
    },
  ];

  return (
    <div className="TrackerBoard">
      {accounts.map((account, index) => (
        <Tracker key={index} account={account} />
      ))}
    </div>
  );
}
export default TrackerBoard;
