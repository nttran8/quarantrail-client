import React, { Component } from "react";

const BooleanContext = React.createContext({
  error: null,
  leader: false,
  instructions: false,
  start: true,
  userPage: false,
  game: false,
  endgame: false,
  mute: false,
  updateMute: () => {},
  renderGame: () => {},
  renderEndGame: () => {},
  renderRestart: () => {},
  renderUser: () => {},
  toggleLeader: () => {},
  toggleInstruct: () => {},
  setError: () => {},
  clearError: () => {}
});

export default BooleanContext;

export class BooleanProvider extends Component {
  state = {
    error: null,
    leader: false,
    instructions: false,
    start: true,
    userPage: false,
    game: false,
    endgame: false,
    mute: false
  };

  updateMute = () => {
    this.setState({ mute: !this.state.mute });
  };

  renderGame = () => {
    this.setState({
      userPage: false,
      game: true
    });
  };

  renderEndGame = () => {
    this.setState({
      game: false,
      endgame: true
    });
  };

  renderUser = () => {
    this.setState({
      start: false,
      userPage: true
    });
  };

  renderRestart = () => {
    this.setState({
      start: true,
      userPage: false,
      game: false,
      endgame: false,
      renderCurve: false
    });
  };

  toggleLeader = () => {
    if (this.instructions === true) {
      this.toggleInstruct();
    }
    this.setState({ leader: !this.state.leader });
  };

  toggleInstruct = () => {
    if (this.leader === true) {
      this.toggleLeader();
    }
    this.setState({ instructions: !this.state.instructions });
  };

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const value = {
      error: this.state.error,
      leader: this.state.leader,
      instructions: this.state.instructions,
      start: this.state.start,
      userPage: this.state.userPage,
      game: this.state.game,
      mute: this.state.mute,
      updateMute: this.updateMute,
      renderGame: this.renderGame,
      renderEndGame: this.renderEndGame,
      renderRestart: this.renderRestart,
      renderUser: this.renderUser,
      toggleLeader: this.toggleLeader,
      toggleInstruct: this.toggleInstruct,
      setError: this.setError,
      clearError: this.clearError
    };

    return (
      <BooleanContext.Provider value={value}>
        {this.props.children}
      </BooleanContext.Provider>
    );
  }
}
