import React, { Component } from "react";

export default class Wall extends Component {
  // Generate ceiling, floor, and pipe walls
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
          height: height,
          backgroundColor: this.props.color
        }}
      />
    );
  }
}
