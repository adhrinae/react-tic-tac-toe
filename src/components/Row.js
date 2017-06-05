import React, { Component } from 'react';

function Square(props) {
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Row extends Component {
  render() {
    const { row, rowIdx, onClick } = this.props;
    return (
      <div className="board-row">
        {row.map((col, colIdx) => (
          <Square
            key={colIdx}
            value={row[colIdx]}
            onClick={() => onClick(rowIdx, colIdx)} />
        ))}
      </div>
    );
  }
}

export default Row;