import React from "react";

function Button({ action, setActiveMenu, goto }) {
  return (
    <button
      type="button"
      className="button"
      onClick={() => setActiveMenu(goto)}
    >
      <p className="button__action">{action}</p>
    </button>
  );
}

export default Button;
