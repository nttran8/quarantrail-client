import React, { Component } from "react";
import LeaderboardService from "../../services/leaderboard-service";
import Crown from "../../Images/crown.svg";
import Loader from "../Loader/Loader";
import "./LeaderBoard.css";

export default class LeaderBoard extends Component {
  state = {
    leaderboard: [],
    loaded: false,
    error: null
  };

  componentDidMount() {
    // Get scores from database
    LeaderboardService.getScores().then(res => {
      this.setState({ leaderboard: res });
      this.setState({ loaded: true });
    });
  }

  renderTop3() {
    // Show top 3
    const { leaderboard } = this.state;
    return (
      <>
        <div className="leaderboard-first">
          <img src={Crown} alt="crown" />
          <br />
          <span className="leaderboard-name">#1 {leaderboard[0].name} </span>
          <span className="leaderboard-score top-score">
            {leaderboard[0].score} days
          </span>
        </div>
        <div className="leaderboard-second-third">
          <div>
            <span className="leaderboard-name">#2 {leaderboard[1].name} </span>
            <span className="leaderboard-score top-score">
              {leaderboard[1].score} days
            </span>
          </div>
          <div>
            <span className="leaderboard-name">#3 {leaderboard[2].name} </span>
            <span className="leaderboard-score top-score">
              {leaderboard[2].score} days
            </span>
          </div>
        </div>
      </>
    );
  }

  renderTop10() {
    // Show top 10
    const { leaderboard } = this.state;
    return leaderboard.map((rank, i) => {
      if (i > 2) {
        return (
          <li key={i + rank} className="leaderboard-list-item">
            <span className="leaderboard-name">
              #{i + 1} {rank.name}{" "}
            </span>
            <span className="leaderboard-score">{rank.score} days</span>
          </li>
        );
      } else return null;
    });
  }

  render() {
    const { loaded } = this.state;
    return (
      <section
        className="leaderboard-section"
        onClick={this.props.toggleLeaderBoard}
      >
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          {!loaded && <Loader />}
          {loaded && (
            <>
              <div className="leaderboard-top-three">{this.renderTop3()}</div>
              <ol className="leaderboard-list">{this.renderTop10()}</ol>
            </>
          )}
        </div>
      </section>
    );
  }
}
