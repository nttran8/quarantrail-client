import Matter from "matter-js";
import Constants from './Constants'
 const MoveBox = (entities, { input,time }) => {
  let engine = entities.physics.engine;
  let box = entities.box.body;
  const { payload } = input.find(x => x.name === "onMouseDown") || {};
  if (payload) {
    Matter.Body.applyForce( box, box.position, {x:0.00, y: -0.10});
  }
  for(let i=1; i<=4; i++){
    if (entities["pipe" + i].body.position.x <= -1 * (Constants.PIPE_WIDTH / 2)){
        Matter.Body.setPosition( entities["pipe" + i].body, {x: Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2), y: entities["pipe" + i].body.position.y});
    } else {
        Matter.Body.translate( entities["pipe" + i].body, {x: -1, y: 0});
    }
}
  Matter.Engine.update(engine, time.delta);
  return entities;
  };
 
  export { MoveBox };