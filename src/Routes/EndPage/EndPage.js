import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PersonContext from "../../Context/PersonContext";
import LeaderboardService from "../../services/leaderboard-service";
import Music from "../../Components/Music/Music";
import Song from "../../Sound/seeyouagain.mp3";
import "./EndPage.css";
export default class EndPage extends Component {
  static contextType = PersonContext;

  handleRestart = () => {
    this.context.resetDay();
    const post = {
      name: this.context.name,
      score: this.context.day
    };
    this.context.updateRenderCurve(false);
    LeaderboardService.postScore(post);
    this.props.renderRestart();
    return <Redirect to="/" />;
  };
  render() {
    let day;
    if (this.context.day === 1) {
      day = "day";
    } else day = "days";
    return (
      <section className="EndPage-section">
        <div className="display-container">
          <div className="display">
            <h1>{this.props.location.state.note}</h1>
            <h2>
              Score: {this.context.day} {day}
            </h2>
            <Link to="/">
              <button className="display-button" onClick={this.handleRestart}>
                Play again
              </button>
            </Link>
            <Music song={Song} />
          </div>
        </div>
        <Music song={Song} />
      </section>
    );
  }
}
