import React from "react";
import "./Instruction.css";

function Instruction(props) {
  return (
    <section className="instruction-section" onClick={props.toggleInstruct}>
      <div className="instruction">
        <h2>Rules</h2>
        <p className="instruction-steps">
          1. Last as many days as possible.
          <br />
          <br />
          2. 3 activities are required per day.
          <br />
          <br />
          3. Sleep to end the day.
          <br />
          <br />
          4. Maintain low levels of boredom and chance of virus.
          <br />
          <br />
          5. Maintain supply of food and toilet paper.
          <br />
          <br />
          6. Leaving the house will increase chance of virus
        </p>
      </div>
    </section>
  );
}

export default Instruction;
