import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./StatusBar.css";

export default class StatusBar extends Component {
  static contextType = PersonContext;

  showBar = type => {
    if (this.context.starter[type] === 0) {
      return;
    } else {
      return "showBar";
    }
  };

  render() {
    const remainingHealth = 100 - this.context.starter.health;
    const remainingBoredom = 100 - this.context.starter.boredom;
    return (
      <section className="StatusBar">
        <div className="barContainer virusContainer">
          <FontAwesomeIcon className="icon" icon="virus" />
          <div className="bar">
            <div
              id="corona"
              className={this.showBar("health")}
              style={{ width: this.context.starter.health + "%" }}
            >
              <p>{this.context.starter.health}%</p>
            </div>
            <div
              className="remaining"
              style={{ width: remainingHealth + "%" }}
            ></div>
          </div>
        </div>
        <div className="barContainer boredomContainer">
          <FontAwesomeIcon className="icon" icon="flushed" />
          <div className="bar">
            <div
              id="boredom"
              className={this.showBar("boredom")}
              style={{ width: this.context.starter.boredom + "%" }}
            >
              <p>{this.context.starter.boredom}%</p>
            </div>
            <div
              className="remaining"
              style={{ width: remainingBoredom + "%" }}
            ></div>
          </div>
        </div>
      </section>
    );
  }
}
