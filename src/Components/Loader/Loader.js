import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loading-container">
      <div>
        <div className="bounceball"></div>
        <div className="loading">loading..</div>
      </div>
    </div>
  );
}
