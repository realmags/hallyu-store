import React from "react";

function ButtonGroup(props) {
  return (
    <>
      <span className="count__button">
        <Increment />
        <p>{props.count}</p>
        <Decrement />
      </span>
      <button type="button" onClick={() => props.method}>
        {props.action}
      </button>
    </>
  );
}

function Increment(props) {
  return (
    <button type="button" onClick={() => props.method}>
      +
    </button>
  );
}

function Decrement(props) {
  return (
    <button type="button" onClick={() => props.method}>
      +
    </button>
  );
}

export default ButtonGroup;
