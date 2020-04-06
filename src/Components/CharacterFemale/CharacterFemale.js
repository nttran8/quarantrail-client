import React, { Component } from "react";
import femaleChar from "../../Images/FemaleChar.svg";
import "./CharacterFemale.css";
// import styled, { keyframes } from 'styled-components';
// import { bounce } from 'react-animations';

// const bounceAnimation = keyframes`${bounce}`;

// const BouncyDiv = styled.div`
//   animation: 3s ${bounceAnimation};
// `;

export default class CharacterFemale extends Component {
  render(){
  let className = 'character';
  if (this.props.active) {
    className += ' character-active';
  }
  
  return (  
    <div className={className}>
      <img src={femaleChar} alt="character" />
    </div>
    )
  }
}

