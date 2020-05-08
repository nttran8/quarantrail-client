import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import "./Store.css";

export default class Store extends Component {
  static contextType = PersonContext;

  state = {
    food: 0,
    toiletPaper: 0,
    exceededLimit: false,
    disabled: this.context.buyOnce
  };

  handlePlusFood = () => {
    if (this.state.food + this.context.starter.food >= 6) {
      return;
    }
    this.setState({ food: this.state.food + 1 });
  };

  handleMinusFood = () => {
    if (this.state.food === 0) {
      return;
    }
    this.setState({ food: this.state.food - 1 });
  };

  handlePlusTp = () => {
    if (this.state.toiletPaper + this.context.starter.toiletpaper >= 6) {
      return;
    }
    this.setState({ toiletPaper: this.state.toiletPaper + 0.5 });
  };

  handleMinusTp = () => {
    if (this.state.toiletPaper === 0) {
      return;
    }
    this.setState({ toiletPaper: this.state.toiletPaper - 0.5 });
  };

  checkTooMuch = () => {
    const { food, toiletpaper } = this.context.starter;
    if (
      food + this.state.food >= 6 ||
      this.state.toiletPaper + toiletpaper >= 6
    ) {
      this.setState({ exceededLimit: true });
      return;
    }
  };

  handleCheckout = () => {
    const { food, toiletpaper } = this.context.starter;

    this.checkTooMuch();
    this.context.addToFoodandToilet(this.state.food, this.state.toiletPaper);
    this.setState({
      food: 0,
      toiletPaper: 0,
      disabled: true
    });
    if (
      this.state.food + food >= 6 ||
      this.state.toiletPaper + toiletpaper >= 6
    ) {
    } else {
      this.props.shopping();
      this.context.updateBuy(true);
    }
  };

  renderCannotBuy = () => {
    return (
      <div className="popupScreen">
        <h1>You have too much</h1>
        <p>
          You have too much and the other shoppers decided to take out of your
          cart so bye-bye good luck
        </p>
        <button
          className="popupButton"
          onClick={e => this.handleSubmitforTooMuch(e)}
        >
          wow
        </button>
      </div>
    );
  };

  handleSubmitforTooMuch = e => {
    e.preventDefault();
    this.context.addToFoodandToilet(-2, -2);
    this.setState({ exceededLimit: false });
    this.props.shopping();
    this.context.updateBuy(true);
  };

  renderMarket = () => {
    const { food, toiletPaper, disabled } = this.state;
    return (
      <div className="store">
        <p>
          Welcome to Trader Jone's! We are a bit bare right now but we'll get
          through this together.
        </p>
        <div className="store-food">
          <p>Food</p>
          {food}
          <button onClick={this.handlePlusFood}>+</button>
          <button onClick={this.handleMinusFood}>-</button>
        </div>
        <div className="store-toilet-paper">
          <p>Toilet Paper</p>
          {toiletPaper}
          <button onClick={this.handlePlusTp}>+</button>
          <button onClick={this.handleMinusTp}>-</button>
        </div>
        <button
          disabled={disabled}
          className="checkout-button"
          onClick={this.handleCheckout}
        >
          Buy
        </button>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.state.exceededLimit
          ? this.renderCannotBuy()
          : this.renderMarket()}
      </>
    );
  }
}
