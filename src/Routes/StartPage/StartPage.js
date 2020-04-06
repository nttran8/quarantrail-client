import React, { Component } from "react";
import PersonContext from "../../Context/PersonContext";
import "./StartPage.css";
import Music from "../../Components/Music/Music";
import CharacterMale from "../../Components/CharacterMale/CharacterMale";
import CharacterFemale from "../../Components/CharacterFemale/CharacterFemale";
import Song from "../../Sound/8bitmenu.mp3";
import keyboard from "../../Sound/keyboard.mp3";
import UIfx from "uifx";

const beep = new UIfx({ asset: keyboard });
export default class StartPage extends Component {
  static contextType = PersonContext;
  componentDidMount=()=>{
    console.log(this.context);
  }
  handleStartGame = event => {
    event.preventDefault();
    if (!this.context.character) {
      alert("Please select a player");
    } else {
      this.props.context.renderGame();
    }
  };

  updateName = event => {
    beep.play()
    this.context.setName(event.currentTarget.value);
  };

  toggleFemaleChar = () => {
    this.context.updateChar('female')
  }

  toggleMaleChar = () => {
    this.context.updateChar('male')
  }

  render() {
    return (
      <div className="startPage">
<<<<<<< HEAD
        <Character selectCharacter={true} />
=======
        <div className='characters'>
          <div onClick={this.toggleMaleChar}><CharacterMale /></div>
          <div onClick={this.toggleFemaleChar}><CharacterFemale /></div>
        </div>
>>>>>>> jaye/features
        <form className="nameForm" onSubmit={e => this.handleStartGame(e)}>
          <div className="startPage-inputbox">
            <label htmlFor="name">Name </label>
            <input
              id="name"
              type="text"
              value={this.context.name}
              onChange={this.updateName}
              required
            ></input>
          </div>
          <button className="introButton">Submit</button>
        </form>
        <Music song={Song} />
      </div>
    );
  }
}
