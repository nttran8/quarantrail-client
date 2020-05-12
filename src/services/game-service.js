import config from "../config";

const gameService = {
  // Get player initial health and scores
  getGameInfo() {
    return fetch(`${config.API_ENDPOINT}/game`).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  // Get a random curveball depending on currect location
  getCurveball(place) {
    return fetch(`${config.API_ENDPOINT}/game`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ location: place })
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  }
};

export default gameService;
