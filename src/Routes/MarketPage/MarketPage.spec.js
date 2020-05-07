import React from "react";
import Market from "./MarketPage";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import PersonContext from "../../Context/PersonContext";

describe(`Market Route`, () => {
  it("renders by default", () => {
    const testStarter = {
      health: 0,
      boredom: 0,
      food: 3,
      toiletpaper: 3,
      id: 1
    };
    const ctxval = {
      starter: testStarter,
      error: null,
      name: "testName",
      character: "female",
      day: 1,
      dailyActivities: 0,
      activityTracker: {},
      location: "market",
      curveball: false,
      renderCurve: false,
      washHands: false,
      buyOnce: false,
      renderPhone: false,
      TV: false,
      renderFeedback: false,
      increaseRate: {},
      setIncrease: () => {},
      updateFeedback: () => {},
      updatePhone: () => {},
      updateBuy: () => {},
      updateCurve: () => {},
      updateRenderCurve: () => {},
      setName: () => {},
      setCharacter: () => {},
      setPersonInfo: () => {},
      setError: () => {},
      clearError: () => {},
      addToHealth: () => {},
      addToFood: () => {},
      addToToilet: () => {},
      incrementDay: () => {},
      addToFoodandToilet: () => {},
      addToBoredom: () => {},
      updateLocation: () => {},
      resetDay: () => {},
      setWash: () => {},
      clearActivites: () => {},
      updateActivityTracker: () => {},
      checkIfGameOver: () => {}
    };
    mount(
      <MemoryRouter>
        <PersonContext.Provider value={ctxval}>
          <Market />
        </PersonContext.Provider>
      </MemoryRouter>
    );
  });
});
