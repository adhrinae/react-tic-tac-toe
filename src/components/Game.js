import React, { Component } from 'react';
import Board from './Board';
import MoveList from './MoveList';
import { calculateWinner, cloneNestedArray } from '../utils';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        checked: {
          x: 0,
          y: 0
        }
      }],
      highLights: [],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(x, y) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = cloneNestedArray(current.squares.slice());
    const highLights = this.state.highLights;

    if (highLights.length > 0 || squares[x][y]) {
      return;
    }

    squares[x][y] = this.state.xIsNext ? 'X' : 'O';
    const checked = { x: x + 1, y: y + 1 };

    const winner = calculateWinner(squares);

    if (winner) {
      this.updateHighLights(winner);
    }

    this.setState({
      history: history.concat([{
        squares,
        checked
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  updateHighLights(highLights) {
    this.setState({ highLights });
  }

  toggleOrder = () => {
    const history = this.state.history.slice().reverse();
    this.setState({ history });
  }

  updateHighLights = (highLights) => {
    this.setState({ highLights });
  }

  jumpTo = (step) => {
    const history = this.state.history.slice(0, step + 1);
    const current = history[history.length - 1];
    const highlights = calculateWinner(current.squares) || [];

    this.updateHighLights(highlights);
    this.setState({
      history,
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });

    const steps = document.querySelectorAll('li');
    const selected = [...steps].filter(step => step.classList.contains('selected'))[0];
    if (selected) {
      selected.classList.remove('selected');
    }
    steps[step].classList.add('selected');
  }

  render() {
    const { highLights, history, stepNumber, xIsNext } = this.state;
    const current = history[stepNumber];

    let status;
    if (highLights.length > 0) {
      const { x, y } = highLights[0];
      let winnerSymbol = current.squares[x][y];

      if (!winnerSymbol) {
        winnerSymbol = history[stepNumber - 1].squares[x][y];
      }

      status = `Winner: ${winnerSymbol}`;
    } else {
      status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            highLights={highLights}
            squares={current.squares}
            onClick={(x, y) => this.handleClick(x, y)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <MoveList
            history={history}
            jumpTo={this.jumpTo} />
          <button onClick={this.toggleOrder}>Reverse History Order</button>
        </div>
      </div>
    );
  }
}

export default Game;
