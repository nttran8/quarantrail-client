import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import StatusBar from "../../Components/StatusBar/StatusBar";
import Day from "../../Components/Day/Day";
import Stock from "../../Components/Stock/Stock";
import Music from "../../Components/Music/Music";
import Store from "../../Components/Store/Store";
import Character from "../../Components/Character/Character";
import Curveball from "../../Components/Curveball/Curveball";
import Song from "../../Sound/feelsgood.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MarketPage.css";

export default class MarketPage extends Component {
  static contextType = PersonContext;

  constructor(props) {
    super(props);
    this.state = {
      shopping: false
    };
  }

  handleShop = () => {
    this.setState({ shopping: !this.state.shopping });
  };

  updateLocation = () => {
    this.context.updateLocation("home");
    this.props.history.push("/");
  };

  renderThankYou = () => {
    return (
      <div className="popupScreen">
        <h1>Thanks for visiting</h1>
        <p>
          Please come back tomorrow as we limit each customer from shopping once
          per day.
        </p>
      </div>
    );
  };

  render() {
    this.context.checkIfGameOver();
    let disabled;
    if (this.context.renderCurve) {
      disabled = true;
    } else {
      disabled = false;
    }
    const { shopping } = this.state;
    return (
      <section className="marketPage gameSetting">
        <div className="top">
          <StatusBar />
          <Day />
        </div>
        <Character selectCharacter={false} />
        <Stock />
        <button
          id="first"
          className="interactiveButton"
          disabled={disabled}
          onClick={this.updateLocation}
        >
          <FontAwesomeIcon icon="home" />
        </button>
        {this.context.renderCurve && <Curveball />}
        <div className="cart">
          <button
            className="interactiveButton"
            disabled={disabled || this.context.buyOnce}
            onClick={this.handleShop}
          >
            <FontAwesomeIcon icon="shopping-cart" />
          </button>
        </div>
        {shopping && <Store shopping={this.handleShop} />}
        {this.context.buyOnce && this.renderThankYou()}
        <Music song={Song} />
      </section>
    );
  }
}
