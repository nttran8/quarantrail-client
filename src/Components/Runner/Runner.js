import React, { Component } from "react";
import { Link } from "react-router-dom";
import PersonContext from "../../Context/PersonContext";
import Music from "../../Components/Music/Music";
import Song from "../../Sound/game.mp3";
import Cat from "./Cat";
import Arrows from "../../Images/gameArrow.svg";
import Enemy from "./Enemy";
import "./Runner.css";
export default class Runner extends Component {
  static contextType = PersonContext;

  state = {
    direction: "right",
    size: {
      cat: 25,
      height: window.innerHeight,
      width: window.innerWidth
    },
    positions: {
      cat: {
        top: window.innerHeight / 2.2,
        left: window.innerWidth / 2
      },
      enemies: []
    },
    catScore: 0,
    timeElapsed: 0,
    enemySpeed: 5,
    enemyIndex: 0,
    activeEnemies: 2,
    baseScore: 10,
    gameover: false,
    instruction: true
  };

  componentDidMount() {
    // Setup size and speed of cat and enemy
    if (window.innerHeight < 720) {
      this.setState({
        size: { ...this.state.size, cat: 25 },
        enemySpeed: 5
      });
    } else {
      this.setState({
        size: { ...this.state.size, cat: 50 },
        enemySpeed: 10
      });
    }
  }

  placeEnemy = () => {
    // Select a direction to place enemy
    const { cat: catPos } = this.state.positions;
    const rand = Math.floor(Math.random() * 4) + 1;
    let side;
    switch (rand) {
      case 1:
        side = "UP";
        break;
      case 2:
        side = "DOWN";
        break;
      case 3:
        side = "LEFT";
        break;
      case 4:
        side = "RIGHT";
        break;

      default:
        break;
    }

    // Generate enemy object
    const newEnemy = this.generateNewEnemy(catPos, side);

    // Add new enemy
    this.setState({
      positions: {
        ...this.state.positions,
        enemies: [...this.state.positions.enemies].concat(newEnemy)
      }
    });
  };

  generateNewEnemy = (position, side) => {
    // Assemble enemy
    this.setState({
      enemyIndex: this.state.enemyIndex + 1
    });

    const newEnemy = { key: this.state.enemyIndex, dir: side };
    const { height, width } = this.state.size;

    switch (side) {
      case "UP":
        newEnemy.top = height - 50;
        newEnemy.left = position.left;
        break;
      case "DOWN":
        newEnemy.top = 0;
        newEnemy.left = position.left;
        break;
      case "LEFT":
        newEnemy.top = position.top;
        newEnemy.left = width - 50;
        break;
      case "RIGHT":
        newEnemy.top = position.top;
        newEnemy.left = 0;
        break;
      default:
        break;
    }
    return newEnemy;
  };

  fireEnemy = () => {
    // Start the game on arrow key down by firing enemy
    if (this.state.instruction === true) {
      this.enemyInterval = setInterval(this.updateEnemyPositions, 50);
      this.timeInterval = setInterval(this.updateGame, 1000);
      this.gameInterval = setInterval(this.updateEnemiesInPlay, 250);
    }
  };

  handlePlayerMovement = catPosition => {
    // Begin the game on key down
    this.fireEnemy();

    const { top, left } = this.state.positions.cat;
    const { cat, height, width } = this.state.size;

    // Update direction of cat
    switch (catPosition.dir) {
      case "UP":
        if (top <= 0) return;
        break;
      case "DOWN":
        if (top >= height - 150) return;
        break;
      case "LEFT":
        if (left <= 0) return;
        break;
      case "RIGHT":
        if (left >= width - 100) return;
        break;
      default:
        break;
    }

    this.setState({
      positions: {
        ...this.state.positions,
        cat: {
          top: top + cat * catPosition.top,
          left: left + cat * catPosition.left
        }
      },
      instruction: false
    });
  };

  handleCollision = () => {
    // Clear enemy when game ended
    clearInterval(this.gameInterval);
    clearInterval(this.enemyInterval);
    clearInterval(this.timeInterval);
    this.endGame();
  };

  renderGameover = () => {
    // Show feedback
    let phrase;
    const { catScore } = this.state;
    if (catScore >= 500) {
      phrase = "Perfect! Even better than Usain Bolt!";
    } else if (catScore >= 400) {
      phrase = "You're getting there!";
    } else if (catScore >= 300) {
      phrase = "Not bad, but try harder next time.";
    } else if (catScore >= 100 && catScore <= 299) {
      phrase = "Could do better next time!";
    } else if (catScore < 100) {
      phrase = "This is not enough exercise. Try harder tomorrow!";
    }

    return (
      <div className="popupScreen">
        <h2>Good Workout!</h2>
        <p>you got a score of {catScore}</p>
        <p>{phrase}</p>
        <Link
          to={{
            pathname: "/park"
          }}
        >
          <button className="popupButton" onClick={this.updateBoredom}>
            Done
          </button>
        </Link>
      </div>
    );
  };

  updateBoredom = () => {
    // Adjust score
    this.setState({
      catScore: 0,
      gameover: false
    });

    const { catScore } = this.state;
    let score = -1;
    if (catScore >= 500) {
      score = -20;
    } else if (catScore >= 400) {
      score = -15;
    } else if (catScore >= 300) {
      score = -10;
    } else if (catScore >= 100 && catScore <= 299) {
      score = -5;
    }
    this.context.addToHealth(5);
    this.context.addToBoredom(score);
    this.context.updateScore({ health: 5, boredom: score });
    this.context.updateFeedback(true);
  };

  endGame = () => {
    // Reset game
    this.setState({
      positions: {
        cat: {
          top: window.innerHeight / 2.2,
          left: window.innerWidth / 2
        },
        enemies: []
      },
      timeElapsed: 0,
      enemySpeed: 10,
      enemyIndex: 0,
      activeEnemies: 2,
      gameover: true
    });
  };

  updateGame = () => {
    // Update score every second and timelapse
    const { timeElapsed } = this.state;
    this.updateTimeAndScore();

    if (timeElapsed > 0) {
      // Add enemy speed
      if (timeElapsed % 3 === 0) {
        this.incrementEnemySpeed();
      }

      // Add max active enemies every 10 seconds
      if (timeElapsed % 10 === 0) {
        this.incrementActiveEnemies();
      }
    }
  };

  updateEnemyPositions = () => {
    // Constantly move enemy depending on speed and direction
    const {
      enemySpeed,
      positions: { enemies },
      size: { height, width }
    } = this.state;

    this.setState({
      positions: {
        ...this.state.positions,
        enemies: enemies
          .filter(enemy => !enemy.remove)
          .map(enemy => {
            if (
              enemy.top < 0 ||
              enemy.top > height - 50 ||
              enemy.left < 0 ||
              enemy.left > width - 50
            ) {
              enemy.remove = true;
              return enemy;
            }
            // Based on direction, increment the correct value (top / left)
            switch (enemy.dir) {
              case "UP":
                enemy.top -= enemySpeed;
                break;
              case "DOWN":
                enemy.top += enemySpeed;
                break;
              case "LEFT":
                enemy.left -= enemySpeed;
                break;
              case "RIGHT":
                enemy.left += enemySpeed;
                break;
              default:
                break;
            }
            return enemy;
          })
      }
    });
  };

  updateEnemiesInPlay = () => {
    // Add enemies if there are not at least x amount of active enemies
    const { activeEnemies } = this.state;
    const { enemies } = this.state.positions;

    if (enemies.length < activeEnemies) {
      this.placeEnemy();
    }
  };

  updateTimeAndScore = () => {
    // Adjust time lapse and score
    const { timeElapsed, catScore, baseScore } = this.state;

    this.setState({
      timeElapsed: timeElapsed + 1,
      catScore: catScore + baseScore
    });
  };

  incrementEnemySpeed = () => {
    // Speed up enemy
    const { enemySpeed } = this.state;
    this.setState({
      enemySpeed: parseFloat((enemySpeed + 0.25).toFixed(2))
    });
  };

  incrementActiveEnemies = () => {
    // Add more enemies
    this.setState({
      activeEnemies: this.state.activeEnemies + 1
    });
  };

  renderInstruction = () => {
    // Show instruction screen
    return (
      <div className="popupScreen">
        <p>Avoid the other runners</p>
        <p>To move: </p>
        <img className="arrowKeys" src={Arrows} alt="arrow keys" />
      </div>
    );
  };

  render() {
    const {
      size: { cat },
      positions: { cat: catPos },
      catScore,
      gameover,
      instruction
    } = this.state;

    return (
      <section className="runner">
        <div className="gameInfo">
          <h1>Score {catScore}</h1>
        </div>
        <Cat
          size={cat}
          position={catPos}
          handlePlayerMovement={this.handlePlayerMovement}
          hide={gameover && "hide"}
        />
        {this.state.positions.enemies.map(enemy => (
          <Enemy
            key={enemy.key}
            size={cat}
            info={enemy}
            catPosition={catPos}
            onCollide={this.handleCollision}
          />
        ))}
        {gameover && this.renderGameover()}
        {instruction && this.renderInstruction()}
        <Music song={Song} />
      </section>
    );
  }
}
