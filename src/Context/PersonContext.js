import React, { Component } from "react";
import { Redirect } from "react-router-dom";

const PersonContext = React.createContext({
  starter: {},
  error: null,
  name: "",
  character: null,
  day: 0,
  dailyActivities: 2,
  activityTracker: {},
  location: "home",
  curveball: false,
  renderCurve: false,
  feedTreat: false,
  washHands: false,
  buyOnce: false,
  renderPhone: false,
  TV: false,
  renderFeedback: false,
  increaseRate: {},
  setIncrease: () => {},
  updateFeedback: () => {},
  updatePhone: () => {},
  updateBuy: () => {},
  updateCurve: () => {},
  updateRenderCurve: () => {},
  setName: () => {},
  setCharacter: () => {},
  setPersonInfo: () => {},
  setError: () => {},
  clearError: () => {},
  addToHealth: () => {},
  addToFood: () => {},
  addToToilet: () => {},
  incrementDay: () => {},
  addToFoodandToilet: () => {},
  addToBoredom: () => {},
  updateLocation: () => {},
  resetDay: () => {},
  setFeedTreat: () => {},
  setWash: () => {},
  clearActivites: () => {},
  updateActivityTracker: () => {},
  checkIfGameOver: () => {}
});

export default PersonContext;

export class PersonProvider extends Component {
  state = {
    starter: {},
    error: null,
    name: "",
    character: null,
    day: 0,
    dailyActivities: 2,
    activityTracker: {},
    location: "home",
    curveball: false,
    renderCurve: false,
    feedTreat: false,
    washHands: false,
    buyOnce: false,
    renderPhone: false,
    TV: false,
    renderFeedback: false,
    increaseRate: {}
  };

  setIncrease = rate => {
    this.setState({ increaseRate: rate });
  };

  updateFeedback = bool => {
    this.setState({ renderFeedback: bool });
  };

  updatePhone = bool => {
    this.setState({ renderPhone: bool });
  };

  updateBuy = bool => {
    this.setState({ buyOnce: bool });
  };

  setName = user => {
    this.setState({ name: user });
  };

  setCharacter = character => {
    this.setState({ character });
  };

  setPersonInfo = info => {
    if (info.health < 0) {
      info = { ...info, health: 0 };
    }
    if (info.boredom < 0) {
      info = { ...info, boredom: 0 };
    }
    this.setState({ starter: info });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setWash = bool => {
    this.setState({
      washHands: bool
    });
  };

  setFeedTreat = bool => {
    this.setState({
      feedTreat: bool
    });
  };

  addToHealth = health => {
    let newHealth = this.state.starter.health;
    if (health > 0 && newHealth === 100) {
      return;
    }
    if (health < 0 && newHealth === 0) {
      return;
    }
    newHealth += health;
    if (newHealth < 0) {
      newHealth = 0;
    }
    this.setState({
      starter: {
        ...this.state.starter,
        health: newHealth
      }
    });
  };

  addToBoredom = value => {
    let newBoredom = this.state.starter.boredom;
    if (value > 0 && newBoredom === 100) {
      return;
    }
    if (value < 0 && newBoredom === 0) {
      return;
    }
    newBoredom += value;
    if (newBoredom < 0) {
      newBoredom = 0;
    }
    this.setState({
      starter: {
        ...this.state.starter,
        boredom: newBoredom
      }
    });
  };

  addToFood = foods => {
    let newerFood = this.state.starter.food;

    newerFood += foods;

    this.setState({
      starter: {
        ...this.state.starter,
        food: newerFood
      }
    });
  };

  addToToilet = toilet => {
    let newToilet = this.state.starter.toiletpaper;
    newToilet += toilet;
    this.setState({
      starter: {
        ...this.state.starter,
        toiletpaper: newToilet
      }
    });
  };

  addToFoodandToilet = (f, t) => {
    let F = parseInt(f);
    let T = parseInt(t);
    let nT = this.state.starter.toiletpaper;
    let nF = this.state.starter.food;
    nT += T;
    nF += F;
    this.setState({
      starter: {
        ...this.state.starter,
        toiletpaper: nT,
        food: nF
      }
    });
  };
  turnTV = bool => {
    this.setState({
      TV: bool
    });
  };

  incrementDay = () => {
    let newday = this.state.day;
    newday += 1;
    this.setState({
      day: newday
    });
  };

  resetDay = () => {
    let restartday = 0;
    let newstarter = {};
    this.setState({
      day: restartday,
      starter: newstarter,
      dailyActivities: 2,
      renderFeedback: false
    });
  };

  incrementActivity = () => {
    let newCount = this.state.dailyActivities;
    newCount -= 1;
    this.setState({
      dailyActivities: newCount
    });
  };

  clearActivites = () => {
    this.setState({
      dailyActivities: 2
    });
  };

  updateActivityTracker = obj => {
    this.setState({
      activityTracker: { ...this.state.activityTracker, ...obj }
    });
  };

  updateLocation = place => {
    this.setState({
      location: place
    });
  };

  updateCurve = bool => {
    this.setState({
      curveball: bool
    });
  };

  updateRenderCurve = bool => {
    this.setState({
      renderCurve: bool
    });
  };

  checkIfGameOver = () => {
    const percent = Math.floor(Math.random() * 100) + 1;
    if (this.state.day > 5 && percent < this.state.starter.health) {
      return (
        <Redirect
          to={{
            pathname: "/end",
            state: { note: "Oh no! Your chance of virus unexpectedly peaked!" }
          }}
        />
      );
    }
    if (this.state.starter.health >= 100) {
      return (
        <Redirect
          to={{
            pathname: "/end",
            state: {
              note:
                "Too much human exposure. Try practicing social distancing more!"
            }
          }}
        />
      );
    } else if (this.state.starter.boredom >= 100) {
      return (
        <Redirect
          to={{
            pathname: "/end",
            state: {
              note:
                "Oh no! Boredom peaked! Try sneaking in some fun at-home activites."
            }
          }}
        />
      );
    } else if (this.state.starter.food <= 0) {
      return (
        <Redirect
          to={{
            pathname: "/end",
            state: {
              note:
                "Food supply is all gone. Try replenishing with a quick market run next time!"
            }
          }}
        />
      );
    } else if (this.state.starter.toiletpaper <= 0) {
      return (
        <Redirect
          to={{
            pathname: "/end",
            state: {
              note:
                "Toilet paper supply is empty. Try maintaining an adequate amount of toilet paper next time!"
            }
          }}
        />
      );
    }
  };

  render() {
    const value = {
      starter: this.state.starter,
      error: this.state.error,
      name: this.state.name,
      character: this.state.character,
      dailyActivities: this.state.dailyActivities,
      activityTracker: this.state.activityTracker,
      location: this.state.location,
      day: this.state.day,
      curveball: this.state.curveball,
      renderCurve: this.state.renderCurve,
      feedTreat: this.state.feedTreat,
      washHands: this.state.washHands,
      buyOnce: this.state.buyOnce,
      renderPhone: this.state.renderPhone,
      TV: this.state.TV,
      renderFeedback: this.state.renderFeedback,
      increaseRate: this.state.increaseRate,
      setIncrease: this.setIncrease,
      updateFeedback: this.updateFeedback,
      updatePhone: this.updatePhone,
      updateBuy: this.updateBuy,
      updateCurve: this.updateCurve,
      updateRenderCurve: this.updateRenderCurve,
      incrementActivity: this.incrementActivity,
      setName: this.setName,
      setCharacter: this.setCharacter,
      setPersonInfo: this.setPersonInfo,
      setError: this.setError,
      clearError: this.clearError,
      addToFoodandToilet: this.addToFoodandToilet,
      addToHealth: this.addToHealth,
      addToFood: this.addToFood,
      addToToilet: this.addToToilet,
      incrementDay: this.incrementDay,
      addToBoredom: this.addToBoredom,
      updateLocation: this.updateLocation,
      resetDay: this.resetDay,
      setWash: this.setWash,
      setFeedTreat: this.setFeedTreat,
      clearActivites: this.clearActivites,
      updateActivityTracker: this.updateActivityTracker,
      turnTV: this.turnTV,
      checkIfGameOver: this.checkIfGameOver
    };

    return (
      <PersonContext.Provider value={value}>
        {this.props.children}
      </PersonContext.Provider>
    );
  }
}
