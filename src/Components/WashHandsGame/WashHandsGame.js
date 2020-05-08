import React, { Component } from "react";
import { Link } from "react-router-dom";
import WashGame from "./Hands";
import PersonContext from "../../Context/PersonContext";
import Music from "../Music/Music";
import Song from "../../Sound/washHands.mp3";
import "./WashHandsGame.css";

export default class BestGameEver extends Component {
  static contextType = PersonContext;

  state = {
    ready: false,
    done: false,
    count: 0
  };

  move = () => {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 200);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    setTimeout(() => this.setState({ done: true }), 20250);
  };

  ready = () => {
    this.setState({ ready: true });
    this.move();
  };

  updateHealth = () => {
    const { count } = this.state;
    let score = -1;
    if (count >= 90) {
      score = -20;
    } else if (count >= 80) {
      score = -15;
    } else if (count >= 70) {
      score = -10;
    } else if (count >= 60) {
      score = -5;
    }
    this.context.addToHealth(score);
    this.context.updateFeedback(true);
    this.context.updateScore({ health: score, boredom: 0 });
  };

  doneScreen = () => {
    let disabled;

    if (this.context.renderCurve) {
      disabled = true;
    } else {
      disabled = false;
    }
    const { count } = this.state;
    let phrase;
    if (count >= 90) {
      phrase = "Great Job your hands are super clean!";
    } else if (count >= 80) {
      phrase = "Pretty Good!";
    } else if (count >= 70) {
      phrase = "Not bad, but scrub more next time.";
    } else if (count >= 60) {
      phrase = "Could do better...";
    } else if (count < 60) {
      phrase = "Did you even use soap?";
    }

    return (
      <div className="minigame-end-screen">
        <div className="popupScreen">
          <h2>All CLean!</h2>
          <p>you got a score of {count}</p>
          <br />
          <p>{phrase}</p>
          <Link
            to={{
              pathname: "/",
              state: {
                washHands: true
              }
            }}
          >
            <button
              className="popupButton"
              disabled={disabled}
              onClick={this.updateHealth}
            >
              Done
            </button>
          </Link>
        </div>
      </div>
    );
  };

  changeCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { ready, done } = this.state;
    return (
      <section className="washHandGame">
        <div className="washHandTimerContainer">
          <div id="myBar" className="washHandTimer"></div>
        </div>
        {!ready && (
          <div className="popupScreen">
            <p>Please scrub for 20 seconds</p>
            <button className="popupButton" onClick={this.ready}>
              Ready
            </button>
          </div>
        )}
        {ready && <WashGame changeCount={this.changeCount} />}
        {done && this.doneScreen()}
        <Music song={Song} />
      </section>
    );
  }
}
