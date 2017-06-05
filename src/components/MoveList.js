import React, { Component } from 'react';

function Move(props) {
  const { x, y } = props.step.checked;
  const desc = props.index ?
    `Move (${x}, ${y})` :
    'Game start';

  return (
    <li>
      <div onClick={() => props.jumpTo(props.index)}>{desc}</div>
    </li>
  );
}

class MoveList extends Component {
  render() {
    const { history, jumpTo } = this.props;
    return (
      <ol>
        {history.map((step, index) => (
          <Move
            key={index}
            step={step}
            index={index}
            jumpTo={jumpTo} />
        ))}
      </ol>
    );
  }
}

export default MoveList;