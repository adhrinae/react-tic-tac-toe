import React, { Component } from 'react';
import Row from './Row';

class Board extends Component {
  render() {
    const { squares, highLights, onClick } = this.props;
    return (
      <div>
        {squares.map((row, i) => (
          <Row 
            key={i}
            highLights={highLights}
            row={row}
            rowIdx={i}
            onClick={onClick} />
        ))}
      </div>
    );
  }
}

export default Board;
