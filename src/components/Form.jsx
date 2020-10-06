import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as CaretLeftIcon } from "@fortawesome/fontawesome-free/svgs/solid/caret-left.svg";
import { useShoppingBagContext } from "./ShoppingBagContext";
import { useEffect } from "react";
import { appendRow } from "../controller/sheets";

function Form({ activeMenu, setActiveMenu }) {
  const formRef = useRef(null);
  const orderItems = useShoppingBagContext().items.orders;
  const addonItems = useShoppingBagContext().items.addons;
  const shoppingBag = useShoppingBagContext();
  const { updatePopupMessage, updatePopupIsShown } = useShoppingBagContext();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const reduceItems = (arr) => {
      return arr.reduce(
        (summary, currentItem) => {
          summary.pendingOrders = [
            ...summary.pendingOrders,
            `${currentItem.itemCount}pcs ${currentItem.itemId}`,
          ];
          summary.amountToPay += currentItem.itemSubtotal;
          return summary;
        },
        { pendingOrders: [], amountToPay: 0 }
      );
    };
    const orderSummary = reduceItems(orderItems);
    const addonSummary = reduceItems(addonItems);
    // console.log("orders", orderSummary);
    // console.log("addons", addonSummary);
    setFormData((prev) => {
      prev.pendingOrders = orderSummary.pendingOrders;
      prev.pendingAddons = addonSummary.pendingOrders;
      prev.amountToPay = orderSummary.amountToPay + addonSummary.amountToPay;
      return prev;
    });
  }, [shoppingBag.items]);

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
    // console.log("adding form data", formData);
    updatePopupMessage("Please wait while your order is being processed...");
    updatePopupIsShown(true);
    appendRow(formData)
      .then((result) => {
        if (result) {
          // alert(
          //   "Thank you for choosing Hallyu store.\nWe will notify you thru SMS regarding the status of your order."
          // );
          setTimeout(() => {
            updatePopupMessage("Sucess! Hallyu CDO will notify you thru SMS.");
            updatePopupIsShown(true);
          }, 3000);
          setTimeout(() => {
            window.location.href = "/hallyu-store";
          }, 6000);
        }
      })
      .catch((err) => {
        updatePopupMessage(
          "Oh no! Your order cannot be processed. Please try again later."
        );
        console.log(err);
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
            required
          />
          <input
            type="tel"
            name="contact"
            id="contact"
            placeholder="contact number"
            onInput={handleChange}
            required
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
            required
          />
          <select name="delivery" id="delivery" onInput={handleChange} required>
            <option value="">delivery option</option>
            <option value="meet-up">meet up</option>
            <option value="meet-up">delivery</option>
          </select>
          <p className="delivery__note">
            For delivery services, we use Grab. This may incur additional
            charges.
          </p>
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
