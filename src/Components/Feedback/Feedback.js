import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import "./Feedback.css";

export default class Feedback extends Component {
  static contextType = PersonContext;

  close = () => {
    // Exit out of feedback
    this.context.updateFeedback(false);
  };

  showUpdatedHealth = () => {
    // Show how health or boredom was effected
    const { health, boredom } = this.context.starter;
    if (health === 0 && boredom === 0) {
      return "Good job! Infection and boredom rates are already at the lowest!";
    }

    let feedback = [`Updated: `];
    if (health !== 0 && this.context.increaseRate.health !== 0) {
      feedback.push(`infection rate by ${this.context.increaseRate.health}`);
    }
    if (boredom !== 0 && this.context.increaseRate.boredom !== 0) {
      feedback.push(`boredom rate by ${this.context.increaseRate.boredom}`);
    }
    if (feedback.length === 1) {
      return "No effect at this time.";
    }
    return feedback.join("\n");
  };

  render() {
    return (
      <section className="popupScreen" onClick={this.close}>
        <p className="feedbackText">{this.showUpdatedHealth()}</p>
        <p>Click to close</p>
      </section>
    );
  }
}
