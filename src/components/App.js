import React, { Component, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      renderBall: false,
      elapsedTime: 0
    };
    this.timerId = null;
    this.beginGame = this.beginGame.bind(this);
    this.ticker = this.ticker.bind(this);
    this.changePos = this.changePos.bind(this);
  }

  ticker() {
    this.setState({elapsedTime: this.state.elapsedTime + 1});
  }

  changePos(event) {
    if (!this.state.renderBall) return;
    let x_new = this.state.x;
    let y_new = this.state.y;

    if (event.keyCode === 37) {
      x_new -= 5;
    } else if (event.keyCode === 38) {
      y_new -= 5;
    } else if (event.keyCode === 39) {
      x_new += 5;
    } else if (event.keyCode === 40) {
      y_new += 5;
    }

    this.setState({x: x_new, y: y_new}, () => {
      if (x_new === 250 && y_new === 250) {
        clearInterval(this.timerId);
        document.removeEventListener("keydown", this.changePos);
      }
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.changePos);
  }

  componentWillUnmount() {}

  beginGame() {
    this.setState({renderBall: true});
    this.timerId = setInterval(this.ticker, 1000);
  }

  render() {
    let style = {
      left: `${this.state.x}px`,
      top: `${this.state.y}px`
    };

    return (
      <>
        <div>
          <span className="heading-timer">{this.state.elapsedTime}</span>
          <button className="start" onClick={this.beginGame}>
            Start
          </button>
        </div>

        <div className="ball" style={style}></div>
        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
