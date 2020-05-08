import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./StatusBar.css";

export default class StatusBar extends Component {
  static contextType = PersonContext;

  showBar = type => {
    // Show status bars if value is greater than zero
    if (this.context.starter[type] > 0) {
      return "showBar";
    } else return "hideBar";
  };

  render() {
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
              style={{ width: 100 - this.context.starter.health + "%" }}
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
              style={{ width: 100 - this.context.starter.boredom + "%" }}
            ></div>
          </div>
        </div>
      </section>
    );
  }
}
