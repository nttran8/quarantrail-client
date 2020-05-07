import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GameEngine } from "react-game-engine";
import Cat from "./Cat";
import Wall from "./Wall";
import { CatMove } from "./CatMove";
import { generatePipes } from "./Pipes";
import Matter from "matter-js";
import Constants from "./Constants";
import Music from "../../Components/Music/Music";
import Song from "../../Sound/morningmagic.mp3";
import "./VideoGame.css";

export default class VideoGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      done: false,
      instruction: true,
      height: 0,
      width: 0
    };
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  ready = () => {
    this.setState({ running: true, instruction: false });
  };

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.5;

    // Create dimensions of cat, floor, ceiling, and pipes
    let cat = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 4,
      Constants.MAX_HEIGHT / 2,
      50,
      50
    );
    let floor = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );
    let ceiling = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      25,
      Constants.MAX_WIDTH,
      50,
      { isStatic: true }
    );

    let [pipe1Height, pipe2Height] = generatePipes();

    let pipe1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH - Constants.PIPE_WIDTH / 2,
      pipe1Height / 2,
      Constants.PIPE_WIDTH,
      pipe1Height,
      { isStatic: true }
    );
    let pipe2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH - Constants.PIPE_WIDTH / 2,
      Constants.MAX_HEIGHT - pipe2Height / 2,
      Constants.PIPE_WIDTH,
      pipe2Height,
      { isStatic: true }
    );

    let [pipe3Height, pipe4Height] = generatePipes();

    let pipe3 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
      pipe3Height / 2,
      Constants.PIPE_WIDTH,
      pipe3Height,
      { isStatic: true }
    );
    let pipe4 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH / 2,
      Constants.MAX_HEIGHT - pipe4Height / 2,
      Constants.PIPE_WIDTH,
      pipe4Height,
      { isStatic: true }
    );

    let [pipe5Height, pipe6Height] = generatePipes();

    let npipe = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 3 - Constants.PIPE_WIDTH / 2,
      pipe5Height / 2,
      Constants.PIPE_WIDTH,
      pipe5Height,
      { isStatic: true }
    );
    let lpipe = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 3 - Constants.PIPE_WIDTH / 2,
      Constants.MAX_HEIGHT - pipe6Height / 2,
      Constants.PIPE_WIDTH,
      pipe6Height,
      { isStatic: true }
    );

    let [pipe7Height, pipe8Height] = generatePipes();

    let kpipe = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 4 - Constants.PIPE_WIDTH / 2,
      pipe7Height / 2,
      Constants.PIPE_WIDTH,
      pipe7Height,
      { isStatic: true }
    );
    let mpipe = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH * 4 - Constants.PIPE_WIDTH / 2,
      Constants.MAX_HEIGHT - pipe8Height / 2,
      Constants.PIPE_WIDTH,
      pipe8Height,
      { isStatic: true }
    );

    Matter.World.add(world, [
      cat,
      floor,
      ceiling,
      pipe1,
      pipe2,
      pipe3,
      pipe4,
      npipe,
      lpipe,
      kpipe,
      mpipe
    ]);

    // Mark as gameover when collision occurs
    Matter.Events.on(engine, "collisionStart", event => {
      this.gameEngine.dispatch({ type: "game-over" });
    });

    return {
      physics: { engine: engine, world: world },
      cat: { body: cat, size: [15, 20], color: "#998c94", renderer: Cat },
      floor: {
        body: floor,
        size: [Constants.MAX_WIDTH, 50],
        color: "#998c94",
        renderer: Wall
      },
      ceiling: {
        body: ceiling,
        size: [Constants.MAX_WIDTH, 50],
        color: "#998c94",
        renderer: Wall
      },
      pipe1: {
        body: pipe1,
        size: [Constants.PIPE_WIDTH, pipe1Height],
        color: "#998c94",
        renderer: Wall
      },
      pipe2: {
        body: pipe2,
        size: [Constants.PIPE_WIDTH, pipe2Height],
        color: "#998c94",
        renderer: Wall
      },
      pipe3: {
        body: pipe3,
        size: [Constants.PIPE_WIDTH, pipe3Height],
        color: "#998c94",
        renderer: Wall
      },
      pipe4: {
        body: pipe4,
        size: [Constants.PIPE_WIDTH, pipe4Height],
        color: "#998c94",
        renderer: Wall
      },
      npipe: {
        body: npipe,
        size: [Constants.PIPE_WIDTH, pipe5Height],
        color: "#998c94",
        renderer: Wall
      },
      lpipe: {
        body: lpipe,
        size: [Constants.PIPE_WIDTH, pipe6Height],
        color: "#998c94",
        renderer: Wall
      },
      kpipe: {
        body: kpipe,
        size: [Constants.PIPE_WIDTH, pipe7Height],
        color: "#998c94",
        renderer: Wall
      },
      mpipe: {
        body: mpipe,
        size: [Constants.PIPE_WIDTH, pipe8Height],
        color: "#998c94",
        renderer: Wall
      }
    };
  };

  onEvent = e => {
    // Stop game if gameover
    if (e.type === "game-over") {
      this.setState({
        running: false,
        done: true
      });
    }
  };

  renderInstruction = () => {
    return (
      <div className="popupScreen">
        <p>Click to jump and try to avoid the walls!</p>
        <button className="popupButton" onClick={this.ready}>
          Play
        </button>
      </div>
    );
  };

  render() {
    return (
      <section
        ref={inner => {
          this.inner = inner;
        }}
        className="videoGame"
      >
        {this.state.instruction && this.renderInstruction()}
        {this.state.running && (
          <GameEngine
            ref={ref => {
              this.gameEngine = ref;
            }}
            style={{
              width: Constants.MAX_WIDTH,
              height: Constants.MAX_HEIGHT
            }}
            className="game"
            systems={[CatMove]}
            onEvent={this.onEvent}
            running={this.state.running}
            entities={this.entities}
          ></GameEngine>
        )}
        {this.state.done && (
          <div className="popupScreen">
            <p>Game Over</p>
            <Link to="/">
              <button className="popupButton">Done</button>
            </Link>
          </div>
        )}
        <Music song={Song} />
      </section>
    );
  }
}
