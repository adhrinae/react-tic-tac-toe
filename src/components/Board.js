import React, { Component } from 'react';
import { calculateWinner } from '../utils';

function Square(props) {
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  renderSquare(i) {
    return <Square
             value={this.props.squares[i]}
             onClick={() => this.props.onClick(i)}  />;
  }

  render() {
    const winner = calculateWinner(this.props.squares);
    let status;
    
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next Player: ${this.props.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;