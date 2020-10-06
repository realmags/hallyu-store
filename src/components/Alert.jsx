import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useShoppingBagContext } from "./ShoppingBagContext";

function Alert() {
  const alertRef = useRef(null);
  const { popup } = useShoppingBagContext();

  return (
    <CSSTransition
      in={popup.isShown}
      timeout={4000}
      classNames="alert-anim"
      unmountOnExit
      nodeRef={alertRef}
    >
      <div className="alert" ref={alertRef}>
        <p>{popup.message}</p>
      </div>
    </CSSTransition>
  );
}

export default Alert;
