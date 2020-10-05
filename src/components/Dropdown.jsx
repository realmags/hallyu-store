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
<<<<<<< HEAD
    <div className="dropdown">
=======
    <div
      className="dropdown"
      // onClick={() => console.log("dropdown is clicked/focus")}
      // onBlur={() => props.setBagIsShown(!props.BagIsShown)}
    >
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
      {props.children}
      <CloseButton />
    </div>
  );
}

export default Dropdown;
