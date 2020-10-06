import React from "react";
import { useShoppingBagContext } from "./ShoppingBagContext";

function Dropdown(props) {
  const { popup } = useShoppingBagContext();

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
    <div className={popup.isShown ? "dropdown blur-active" : "dropdown"}>
      {props.children}
      <CloseButton />
    </div>
  );
}

export default Dropdown;
