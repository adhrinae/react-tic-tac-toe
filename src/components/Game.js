import React, { Component } from 'react';
import Board from './Board';
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
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(x, y) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = cloneNestedArray(current.squares.slice());
    if (calculateWinner(squares) || squares[x][y]) {
      return;
    }
    squares[x][y] = this.state.xIsNext ? 'X' : 'O';
    const checked = { x: x + 1, y: y + 1 };
    
    this.setState({
      history: history.concat([{
        squares,
        checked
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    const history = this.state.history.slice(0, step + 1);
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
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const { x, y } = step.checked;
      const desc = move ?
        `Move (${x}, ${y})` :
        'Game start';
      
      return (
        <li key={move}>
          <div onClick={() => this.jumpTo(move)}>{desc}</div>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(x, y) => this.handleClick(x, y)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;