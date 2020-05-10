import React, { Component } from "react";
import Stock from "../../Components/Stock/Stock";
import Music from "../../Components/Music/Music";
import Activities from "../../Components/Activities/Activities";
import PersonContext from "../../Context/PersonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./GamePage.css";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Day from "../../Components/Day/Day";
import gameService from "../../services/game-service";
import Curveball from "../../Components/Curveball/Curveball";
import Character from "../../Components/Character/Character";
import Song from "../../Sound/morningmagic.mp3";
import Pet from "../../Components/Pet/Pet";
import Feedback from "../../Components/Feedback/Feedback";

export default class GamePage extends Component {
  static contextType = PersonContext;

  componentDidMount() {
    if (Object.entries(this.context.starter).length === 0) {
      gameService
        .getGameinfo()
        .then(initialVal => {
          this.context.setPersonInfo(initialVal);
          this.context.clearActivites();
        })
        .catch(this.context.setError);
    }
  }

  updateLocationM = () => {
    this.context.updateLocation("market");
    this.context.addToHealth(5);
    if (this.context.curveball === false) {
      const rand = Math.random();
      if (rand < 0.5) {
        this.context.updateRenderCurve(true);
      }
    }
    this.props.history.push("/market");
  };

  updateLocationP = () => {
    this.context.updateLocation("park");
    this.context.addToHealth(5);
    if (this.context.curveball === false) {
      const rand = Math.random();
      if (rand < 0.5) {
        this.context.updateRenderCurve(true);
      }
    }
    this.props.history.push("/park");
  };

  render() {
    this.context.checkIfGameOver();
    let disabled;
    if (this.context.renderCurve) {
      disabled = true;
    } else {
      disabled = false;
    }
    return (
      <section className="gamePage gameSetting">
        <div className="top">
          <StatusBar />
          <Day />
        </div>
        <Character selectCharacter={false} />
        <Pet />
        <Stock />
        <Activities {...this.props} />
        <button
          id="first"
          className="interactiveButton"
          disabled={disabled}
          onClick={this.updateLocationM}
        >
          <FontAwesomeIcon icon="store" />
        </button>
        <button
          id="second"
          className="interactiveButton"
          disabled={disabled}
          onClick={this.updateLocationP}
        >
          <FontAwesomeIcon icon="tree" />
        </button>
        {this.context.renderCurve && <Curveball />}
        {this.context.renderFeedback && <Feedback />}
        <Music song={Song} />
      </section>
    );
  }
}
