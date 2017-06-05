import React, { Component } from 'react';

function Square(props) {
  return (
    <button className="square"
      onClick={props.onClick}
      style={props.isHighLight ?
             { backgroundColor: 'Yellow' } : {}} >
      {props.value}
    </button>
  );
}

class Row extends Component {
  render() {
    const { row, rowIdx, highLights, onClick } = this.props;
    return (
      <div className="board-row">
        {row.map((col, colIdx) => {
          const isHighLight = highLights.filter(highLight => {
            return highLight.x === rowIdx && highLight.y === colIdx;
          }).length > 0;

          return (
            <Square
              key={colIdx}
              isHighLight={isHighLight}
              value={row[colIdx]}
              onClick={() => onClick(rowIdx, colIdx)} />
          );
        })}
      </div>
    );
  }
}

export default Row;