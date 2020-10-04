import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CaretLeftIcon } from "@fortawesome/fontawesome-free/svgs/solid/caret-left.svg";
import { useShoppingBagContext } from "./ShoppingBagContext";
import { useEffect } from "react";
import { appendRow } from "../controller/sheets";

function Form({ activeMenu, setActiveMenu }) {
  const formRef = useRef(null);
  const orderItems = useShoppingBagContext().items.orders;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const orderSummary = orderItems.reduce(
      (summary, currentItem) => {
        summary.pendingOrders = [
          ...summary.pendingOrders,
          `${currentItem.count}pcs ${currentItem.id}`,
        ];
        summary.amountToPay += currentItem.subtotal;
        return summary;
      },
      { pendingOrders: [], amountToPay: 0 }
    );
    setFormData((prev) => {
      prev.pendingOrders = orderSummary.pendingOrders;
      prev.amountToPay = orderSummary.amountToPay;
      return prev;
    });
  }, [orderItems]);

  const handleChange = (e) => {
    const inputField = e.target.id,
      inputValue = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [inputField]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();
    // TODO make input fields required
    console.log("adding form data", formData);
    appendRow(formData).then((result) => {
      if (result)
        alert(
          "Thank you for choosing Hallyu store.\nWe will notify you thru SMS regarding the status of your order."
        );
    });
  };

  return (
    <CSSTransition
      in={activeMenu === "form"}
      timeout={500}
      classNames="secondary"
      unmountOnExit
      nodeRef={formRef}
    >
      <div className="form" ref={formRef}>
        <form action="#" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onInput={handleChange}
          />
          <input
            type="tel"
            name="contact"
            id="contact"
            placeholder="contact number"
            onInput={handleChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onInput={handleChange}
          />
          <input
            type="text"
            name="address"
            id="address"
            placeholder="address"
            onInput={handleChange}
          />
          <select name="delivery" id="delivery" onInput={handleChange}>
            <option value="">delivery option</option>
            <option value="meet-up">meet up</option>
            <option value="meet-up">delivery</option>
          </select>
          <div className="form__button">
            <button className="form__submit">Confirm Order</button>
          </div>
        </form>
        <span className="form__back" onClick={() => setActiveMenu("bag")}>
          <span>
            <CaretLeftIcon />
          </span>
          <p>back</p>
        </span>
      </div>
    </CSSTransition>
  );
}

export default Form;
