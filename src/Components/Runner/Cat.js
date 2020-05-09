import React, { Component } from "react";
import Rocky from "../../Images/gameCat.svg";

class Cat extends Component {
  state = {
    imgDir: ""
  };

  handleKeyDown = e => {
    // Change image of cat according to direction
    let newDirection;
    switch (e.keyCode) {
      case 37:
        newDirection = { top: 0, left: -1, dir: "LEFT" };
        this.setState({ imgDir: "left" });
        break;
      case 38:
        newDirection = { top: -1, left: 0, dir: "UP" };
        this.setState({ imgDir: "up" });
        break;
      case 39:
        newDirection = { top: 0, left: 1, dir: "RIGHT" };
        this.setState({ imgDir: "right" });
        break;
      case 40:
        newDirection = { top: 1, left: 0, dir: "DOWN" };
        this.setState({ imgDir: "down" });
        break;
      default:
        return;
    }

    this.props.handlePlayerMovement(newDirection);
  };

  render() {
    const {
      hide,
      size,
      position: { top, left }
    } = this.props;
    const { imgDir } = this.state;
    const styleBox = {
      width: size,
      height: size,
      position: "absolute",
      top: top + "px",
      left: left + "px",
      transition: "all 0.1s ease"
    };
    return (
      <img
        src={Rocky}
        alt="Rocky the cat"
        className={imgDir + " " + hide}
        ref={n => {
          this.player = n;
        }}
        style={styleBox}
      />
    );
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
  }
}

export default Cat;
