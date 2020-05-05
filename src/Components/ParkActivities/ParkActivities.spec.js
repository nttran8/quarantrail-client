import React from "react";
import ReactDOM from "react-dom";
import ParkActivities from "./ParkActivities";

it("ParkActivities renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<ParkActivities />, div);
  ReactDOM.unmountComponentAtNode(div);
});
