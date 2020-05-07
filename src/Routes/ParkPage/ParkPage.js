import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Day from "../../Components/Day/Day";
import Character from "../../Components/Character/Character";
import Stock from "../../Components/Stock/Stock";
import Music from "../../Components/Music/Music";
import Curveball from "../../Components/Curveball/Curveball";
import Song from "../../Sound/morningmagic.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ParkActivities from "../../Components/ParkActivities/ParkActivities";
import Feedback from "../../Components/Feedback/Feedback";
import "./ParkPage.css";

export default class ParkPage extends Component {
  static contextType = PersonContext;

  updateLocation = () => {
    this.context.updateLocation("home");
    this.props.history.push("/");
  };

  render() {
    let disabled;
    if (this.context.renderCurve) {
      disabled = true;
    } else {
      disabled = false;
    }
    return (
      <section className="parkpage gameSetting">
        {this.context.checkIfGameOver()}
        <div className="top">
          <StatusBar />
          <Day />
        </div>
        <Character selectCharacter={false} />
        <Stock />
        <button
          id="first"
          className="interactiveButton"
          disabled={disabled}
          onClick={this.updateLocation}
        >
          <FontAwesomeIcon icon="home" />
        </button>
        {this.context.renderCurve && <Curveball />}
        {this.context.renderFeedback && <Feedback />}
        <ParkActivities {...this.props} />
        <Music song={Song} />
      </section>
    );
  }
}
