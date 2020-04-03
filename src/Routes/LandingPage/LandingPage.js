import React, { Component } from "react";
import BooleanContext from "../../Context/BooleanContext";
import "./LandingPage.css";
import Virus from "../../Images/virus.png";
import Music from "../../Components/Music/Music";
import Song from "../../Sound/8bitmenu.mp3";

export default class LandingPage extends Component {
  static contextType = BooleanContext;

  render() {
    return (
      <div className="landingpage">
        <img src={Virus} alt="virus logo" />
        <h1>Corona Trail</h1>
        <p>Covid-19</p>
        <button onClick={this.context.renderUser}>Start</button>
        <p className="player">1 Player</p>
        <Music song={Song} />
      </div>
    );
  }
}
