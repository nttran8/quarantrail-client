import React, { Component } from "react";
import Rocky from "../../Images/gameCat.svg";

export default class Cat extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: width,
          height: height
        }}
      >
        <img className="catVideogame" src={Rocky} alt="cat"></img>
      </div>
    );
  }
}
