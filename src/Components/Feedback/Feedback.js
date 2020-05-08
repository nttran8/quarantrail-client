import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import "./Feedback.css";

export default class Feedback extends Component {
  static contextType = PersonContext;

  state = {
    render: true,
    health: this.context.increaseRate.health,
    boredom: this.context.increaseRate.boredom
  };

  close = () => {
    // Exit out of feedback
    this.setState({ render: false });
    this.context.updateFeedback(false);
  };

  render() {
    const { render, health, boredom } = this.state;
    return { render } ? (
      <section className="feedback">
        <button className="feedbackButt" onClick={this.close}>
          X
        </button>
        <p className="feedbackText">
          You have increased your infection rate by {health}%{" "}
        </p>
        <p>You have increased your boredom rate by {boredom}% </p>
      </section>
    ) : null;
  }
}
