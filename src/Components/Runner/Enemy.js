import React, { Component } from "react";
import Box from "./Box";

class Enemy extends Component {
  componentDidUpdate() {
    // Update enemy location and show enemy
    const {
      size,
      catPosition,
      info: { top, left }
    } = this.props;

    if (
      catPosition.left < left + size &&
      catPosition.top < top + size &&
      catPosition.left + size > left &&
      catPosition.top + size > top
    ) {
      this.props.onCollide();
    }
  }

  render() {
    const {
      size,
      info: { top, left }
    } = this.props;

    return <Box size={size} position={{ top, left }} color="#998c94" />;
  }
}

export default Enemy;
