import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Activities.css";

export default class Activities extends Component {
  static contextType = PersonContext;

  state = {
    disabled: false,
    viewActivities: false,
    previousAct: "",
    previousCount: 0
  };
  componentDidMount = () => {
    if (this.context.dailyActivities === -1) {
      this.renderSleep();
    }
  };

  handleClickViewActivities = () => {
    this.setState({ viewActivities: !this.state.viewActivities });
  };

  doActivityStuff = (name, health, boredom) => {
    let newBoredom = boredom;
    if (this.state.previousAct === name) {
      this.setState({
        previousCount: this.state.previousCount + 1
      });
      if (this.state.previousCount === 0) {
        newBoredom *= 0.8;
        this.context.setIncrease({ infection: health, boredom: boredom * 0.8 });
      }

      if (this.state.previousCount === 1) {
        newBoredom *= 0.6;
        this.context.setIncrease({ infection: health, boredom: boredom * 0.6 });
      }
    } else {
      this.setState({
        previousAct: name,
        previousCount: 0
      });
      this.context.setIncrease({ infection: health, boredom: boredom });
    }
    let newData2 = {
      id: this.context.starter.id,
      health: this.context.starter.health + health,
      boredom: this.context.starter.boredom + newBoredom,
      toiletpaper: this.context.starter.toiletpaper,
      food: this.context.starter.food
    };
    this.context.setPersonInfo(newData2);
    this.context.incrementActivity();
    if (this.context.dailyActivities === 0) {
      this.renderSleep();
    }
  };

  handleWashHands = () => {
    this.context.updateActivityTracker({ washHands: 1 });
    this.context.setWash(true);
    this.props.history.push("/washHands");
  };

  handleTakeout = () => {
    this.doActivityStuff("takeout", 10, -10);
    this.context.updateFeedback(true);
  };

  handleVideoGame = () => {
    this.doActivityStuff("videogame", 0, -10);
    this.context.turnTV(true);
    this.props.history.push("/playVideogame");
    this.context.updateFeedback(true);
  };

  handlePhone = () => {
    this.doActivityStuff("phone", 0, -10);
    this.context.updatePhone(true);
  };

  handleFriends = () => {
    this.doActivityStuff("friends", 10, -20);
    this.context.updateFeedback(true);
  };

  renderSleep = () => {
    this.setState({ disabled: true });
  };

  handleNextDay = () => {
    this.setState({
      disabled: false,
      previousAct: "",
      previousCount: 0
    });
    if (this.context.curveball === false) {
      this.context.updateRenderCurve(true);
    }
    this.context.incrementDay();
    this.context.updateCurve(false);
    let newData = {
      id: this.context.starter.id,
      health: this.context.starter.health,
      boredom: this.context.starter.boredom + 20,
      toiletpaper: this.context.starter.toiletpaper - 0.5,
      food: this.context.starter.food - 1
    };
    this.context.updateBuy(false);
    this.context.setPersonInfo(newData);
    this.context.setWash(false);
    this.context.setFeedTreat(false);
    this.context.turnTV(false);
    this.context.updateFeedback(false);
    this.context.clearActivites();
  };

  render() {
    const { disabled, viewActivities } = this.state;
    return (
      <div className="activityBar">
        <button
          className="interactiveButton"
          onClick={this.handleClickViewActivities}
        >
          <FontAwesomeIcon icon="icons" />
        </button>
        {viewActivities && (
          <div>
            <p className="header">
              Activities left: {this.context.dailyActivities + 1}
            </p>
            <button
              className="mybutton"
              disabled={this.context.TV || disabled}
              onClick={this.handleVideoGame}
            >
              <FontAwesomeIcon icon="gamepad" />
            </button>
            <button
              className="mybutton"
              disabled={disabled}
              onClick={this.handlePhone}
            >
              <FontAwesomeIcon icon="mobile-alt" />
            </button>
            <button
              className="mybutton"
              disabled={disabled}
              onClick={this.handleFriends}
            >
              <FontAwesomeIcon icon="users" />
            </button>
            <button
              className="mybutton"
              disabled={disabled}
              onClick={this.handleTakeout}
            >
              <FontAwesomeIcon icon="utensils" />
            </button>
            <button
              className="mybutton"
              disabled={this.context.washHands || disabled}
              onClick={this.handleWashHands}
            >
              <FontAwesomeIcon icon="soap" />
            </button>
            <button
              className="mybutton"
              disabled={!disabled}
              onClick={this.handleNextDay}
            >
              <FontAwesomeIcon icon="bed" />
            </button>
          </div>
        )}
      </div>
    );
  }
}
