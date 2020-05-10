import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import "./StartPage.css";
import Music from "../../Components/Music/Music";
import Character from "../../Components/Character/Character";
import Song from "../../Sound/8bitmenu.mp3";
import keyboard from "../../Sound/keyboard.mp3";
import UIfx from "uifx";
const beep = new UIfx({ asset: keyboard });

export default class StartPage extends Component {
  static contextType = PersonContext;
  
  handleStartGame = event => {
    event.preventDefault();
    if (!this.context.character) {
      alert("Select your player");
    } else {
      this.props.context.renderGame();
    }
  };

  updateName = event => {
    beep.play();
    this.context.setName(event.currentTarget.value);
  };

  render() {
    return (
      <div className="startPage">
        <Character selectCharacter={true} />
        <form className="nameForm" onSubmit={e => this.handleStartGame(e)}>
          <div className="startPage-inputbox">
            <label htmlFor="name">Name </label>
            <input
              id="name"
              type="text"
              value={this.context.name}
              onChange={this.updateName}
              required
              minLength="3"
              maxLength="3"
            ></input>
          </div>
          <button className="introButton">Submit</button>
        </form>
        <Music song={Song} />
      </div>
    );
  }
}
