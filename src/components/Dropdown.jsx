import React from "react";

function Dropdown(props) {
  function CloseButton() {
    return (
      <span
        className="dropdown__close"
        onClick={() => props.setBagIsShown(!props.bagIsShown)}
      >
        close
      </span>
    );
  }

  return (
    <div className="dropdown">
      {props.children}
      <CloseButton />
    </div>
  );
}

export default Dropdown;
