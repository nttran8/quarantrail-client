import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import "./Store.css";

export default class Store extends Component {
  static contextType = PersonContext;

  state = {
    food: 0,
    toiletpaper: 0
  };

  handleAddFood = () => {
    // Add food to cart if limit is not exceeded
    if (this.state.food + this.context.starter.food < 6) {
      this.setState({ food: this.state.food + 1 });
    }
  };

  handleSubFood = () => {
    // Remove food to cart if limit is not exceeded
    if (this.state.food !== 0) {
      this.setState({ food: this.state.food - 1 });
    }
  };

  handleAddTp = () => {
    // Add toiletpaper to cart if limit is not exceeded
    if (this.state.toiletpaper + this.context.starter.toiletpaper < 6) {
      this.setState({ toiletpaper: this.state.toiletpaper + 0.5 });
    }
  };

  handleSubTp = () => {
    // Remove toiletpaper to cart if limit is not exceeded
    if (this.state.toiletpaper !== 0) {
      this.setState({ toiletpaper: this.state.toiletpaper - 0.5 });
    }
  };

  handleCheckout = () => {
    // Check if limits have exceeded at checkout before allowing users to buy
    this.context.addToFoodandToilet(this.state.food, this.state.toiletpaper);
    this.props.shopping();
    this.context.updateBuy(true);
    this.context.updateFeedback(true);
  };

  render() {
    const { food, toiletpaper } = this.state;
    return (
      <div className="store">
        <p>
          Welcome to Trader Jone's! We are a bit bare right now but we'll get
          through this together.
        </p>
        <div className="store-food">
          <p>Food</p>
          {food}
          <button onClick={this.handleAddFood}>+</button>
          <button onClick={this.handleSubFood}>-</button>
        </div>
        <div className="store-toilet-paper">
          <p>Toilet Paper</p>
          {toiletpaper}
          <button onClick={this.handleAddTp}>+</button>
          <button onClick={this.handleSubTp}>-</button>
        </div>
        <button
          disabled={this.context.buyOnce}
          className="checkout-button"
          onClick={this.handleCheckout}
        >
          Buy
        </button>
      </div>
    );
  }
}
