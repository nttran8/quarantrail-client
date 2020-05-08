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
      return "Infection and boredom rates were not affected at the moment";
    }

    let feedback = `Updated: `;
    if (health !== 0 && this.context.increaseRate.health !== 0) {
      feedback += `infection rate by ${this.context.increaseRate.health}`;
    }
    if (boredom !== 0 && this.context.increaseRate.boredom !== 0) {
      feedback += `boredom rate by ${this.context.increaseRate.boredom}`;
    }
    return feedback;
  };

  render() {
    return (
      <section className="feedback">
        <button className="feedbackButt" onClick={this.close}>
          X
        </button>
        <p className="feedbackText">{this.showUpdatedHealth()}</p>
      </section>
    );
  }
}
