import React, { Component } from "react";
import "./App.css";

class MemoryCard extends Component {
  state = {
    // An array of items to display in the memory game
    items: [
      "apple",
      "banana",
      "cherry",
      "grapes",
      "kiwi",
      "mango",
      "orange",
      "peach",
      "pear",
      "strawberry",
    ],
    // The currently selected item
    selectedItem: null,
    // The current score of the game
    currentScore: 0,
    // The highest score achieved in the game
    bestScore: 0,
    // An array of items that have already been shown
    shownNumbers: [],
  };

  // Function to randomize the order of the items
  randomizeItems = () => {
    this.setState((state) => {
      // Sort the items randomly
      const items = state.items.sort(() => Math.random() - 0.5);
      // Set the selected item to the first item in the randomized array
      const selectedItem = items[0];
      return { items, selectedItem };
    });
  };

  // Function to handle clicks on the Yes/No buttons
  handleClick = (choice) => {
    // If the user clicked "No" and there's a selected item
    if (choice === "no" && this.state.selectedItem) {
      // If the selected item has already been shown
      if (this.state.shownNumbers.includes(this.state.selectedItem)) {
        // Reset the game
        this.setState({
          selectedItem: null,
          currentScore: 0,
          shownNumbers: [],
        });
      } else {
        // Increase the current score by 1 and update the best score if necessary
        this.setState((state) => {
          const currentScore = state.currentScore + 1;
          const bestScore =
            currentScore > state.bestScore ? currentScore : state.bestScore;
          const shownNumbers = [...state.shownNumbers, state.selectedItem];
          return { currentScore, bestScore, shownNumbers };
        });
      }
    } else {
      // Reset the game
      this.setState({
        selectedItem: null,
        currentScore: 0,
        shownNumbers: [],
      });
    }
    // Randomize the items
    this.randomizeItems();
  };

  render() {
    return (
      <div className="container">
        <h1 className="h1">Memory Game</h1>
        <h2 className="h2">Current Score: {this.state.currentScore}</h2>
        <h2 className="h3">Best Score: {this.state.bestScore}</h2>
        {this.state.selectedItem ? (
          <div className="display-game">
            <div className="display-item">{this.state.selectedItem}</div>
            <button
              className="yesButton"
              onClick={() => this.handleClick("yes")}
            >
              Yes
            </button>
            <button className="noButton" onClick={() => this.handleClick("no")}>
              No
            </button>
          </div>
        ) : (
          <button className="startButton" onClick={this.randomizeItems}>
            Start
          </button>
        )}
      </div>
    );
  }
}
export default MemoryCard;
