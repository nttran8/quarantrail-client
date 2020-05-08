import React, { Component } from "react";
import BooleanContext from "../../Context/BooleanContext";
import "./LandingPage.css";
import Logo from "../../Images/logo.svg";

export default class LandingPage extends Component {
  static contextType = BooleanContext;

  render() {
    return (
      <div className="landingPage">
        <img src={Logo} alt="quaran trail - stay home" />
        <div className="intro">
          <h1>The year was 2020...</h1>
          <p>
            ...a global pandemic swept across the planet and kept everyone in
            quarantine. Adjusting to the new lifestyle is not easy as you
            journey through supply shortages and health risks.
          </p>
        </div>
        <button className="introButton" onClick={this.context.renderUser}>
          Start
        </button>
      </div>
    );
  }
}
