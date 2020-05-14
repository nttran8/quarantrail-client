import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Activities.css";

export default class Activities extends Component {
  static contextType = PersonContext;

  state = {
    disabled: false,
    viewActivities: false,
    disableSleep: true
  };

  componentDidMount = () => {
    // Allow player to end the day after 3 unique activities
    if (this.context.dailyActivities < 0) {
      this.renderSleep();
    }
  };

  componentDidUpdate = () => {
    // Move on to next day if curveball is answered
    if (
      !this.context.renderCurve &&
      this.state.disabled &&
      this.state.disableSleep
    ) {
      this.handleNextDay();
    }
  };

  toggleActivities = () => {
    // Show and hide activities
    this.setState({ viewActivities: !this.state.viewActivities });
  };

  updateScore = (health, boredom) => {
    // Adjust health and boredom scores
    this.context.updateScore({ health, boredom });
    if (this.context.dailyActivities === 0) {
      this.renderSleep();
    }
  };

  handleNextDay = () => {
    // Reset activity limits and increment day
    this.context.incrementDay();
    let updatedBoredom = {
      id: this.context.starter.id,
      health: this.context.starter.health,
      boredom: this.context.starter.boredom + 20,
      toiletpaper: this.context.starter.toiletpaper - 0.5,
      food: this.context.starter.food - 1
    };
    this.context.updateBuy(false);
    this.context.setPersonInfo(updatedBoredom);
    this.context.clearActivites();
    this.setState({ disabled: false });
  };

  throwCurveball = () => {
    // Render curveball and close feedback (if any)
    this.context.updateRenderCurve(true);
    this.context.updateFeedback(false);
    this.setState({
      disableSleep: true
    });
  };

  handlePlayGame = () => {
    this.updateScore(0, -10);
    this.props.history.push("/playVideogame");
    this.context.updateFeedback(true);
    this.context.setPlayVideogame(true);
  };

  handleUsePhone = () => {
    this.context.setUsePhone(true);
    this.updateScore(0, -10);
    this.context.updateFeedback(true);
  };

  handleGatherWithFriends = () => {
    this.context.setGatherFriends(true);
    this.updateScore(10, -20);
    this.context.updateFeedback(true);
  };

  handleEat = () => {
    this.context.setEat(true);
    this.updateScore(10, -10);
    this.context.updateFeedback(true);
  };

  handleWashHands = () => {
    this.context.setWashHands(true);
    this.props.history.push("/washHands");
  };

  renderSleep = () => {
    this.setState({ disabled: true, disableSleep: false });
  };

  render() {
    const { disabled, viewActivities, disableSleep } = this.state;
    return (
      <div className="activityBar">
        <button className="interactiveButton" onClick={this.toggleActivities}>
          <FontAwesomeIcon icon="icons" />
        </button>
        {viewActivities && (
          <div>
            <p className="header">
              Activities left: {this.context.dailyActivities + 1}
            </p>
            <button
              className="mybutton"
              disabled={this.context.playVideogame || disabled}
              onClick={this.handlePlayGame}
            >
              <FontAwesomeIcon icon="gamepad" />
            </button>
            <button
              className="mybutton"
              disabled={this.context.usePhone || disabled}
              onClick={this.handleUsePhone}
            >
              <FontAwesomeIcon icon="mobile-alt" />
            </button>
            <button
              className="mybutton"
              disabled={this.context.gatherFriends || disabled}
              onClick={this.handleGatherWithFriends}
            >
              <FontAwesomeIcon icon="users" />
            </button>
            <button
              className="mybutton"
              disabled={this.context.eat || disabled}
              onClick={this.handleEat}
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
              disabled={disableSleep}
              onClick={this.throwCurveball}
            >
              <FontAwesomeIcon icon="bed" />
            </button>
          </div>
        )}
      </div>
    );
  }
}
