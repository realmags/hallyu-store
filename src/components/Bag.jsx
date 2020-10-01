import React from "react";
import { CSSTransition } from "react-transition-group";
import Button from "./Button";
import { useRef } from "react";
import { useShoppingBagContext } from "./ShoppingBagContext";

function Bag({ activeMenu, setActiveMenu }) {
  const shoppingBag = useShoppingBagContext();
  const bagRef = useRef(null);
  // how to get all items from session storage
  // const bagItem

  // alert(orderItems);
  // useEffect(() => {
  //   setOrderItems(shoppingBag.items);
  //   console.log("this is useeffect");
  // }, []);

  // const updateOrderItems = (item) => {
  //   shoppingBag.increment(item);
  //   setOrderItems(shoppingBag.items);
  //   console.log("this is update order items");
  // };

  function Item({ item = {} }) {
    return (
      <div className="item">
        <div className="item__details">
          <h1>{item.itemName || "Delicious food"}</h1>
          <p>{item.itemSubtitle || "Choose from our catalogue"}</p>
        </div>
        <div className="item__buttons">
          <span className="item__count">
            <button
              type="button"
              onClick={() =>
                Object.keys(item).length > 0 && shoppingBag.increment(item)
              }
            >
              +
            </button>
            <p>{item.itemCount || "0"}</p>
            <button
              type="button"
              onClick={() =>
                Object.keys(item).length > 0 && shoppingBag.decrement(item)
              }
            >
              -
            </button>
          </span>
          <span className="item__remove">
            <button
              className="product__add"
              type="button"
              onClick={() =>
                Object.keys(item).length > 0 && shoppingBag.remove(item)
              }
            >
              X
            </button>
          </span>
        </div>
        <div className="item__subtotal">
          <p>P{item.itemSubtotal || "0"}</p>
        </div>
      </div>
    );
  }

  function Bill() {
    // const shoppingBagItems
    return (
      <div className="bill">
        <h1>
          Amount to pay: P
          {shoppingBag.items.length > 0
            ? shoppingBag.items
                .map((item) => item.itemSubtotal)
                .reduce((sum, current) => sum + current)
            : 0}
        </h1>
      </div>
    );
  }

  return (
    <CSSTransition
      in={activeMenu === "bag"}
      timeout={500}
      classNames="primary"
      unmountOnExit
      nodeRef={bagRef}
    >
      <div className="bag" ref={bagRef}>
        {shoppingBag.items.length === 0 ? (
          <Item />
        ) : (
          shoppingBag.items.map((item) => (
            <Item item={item} key={`bag-${item.id}`} />
          ))
        )}
        <Bill />
        <div className="bag__button">
          <Button
            action={"Checkout"}
            setActiveMenu={setActiveMenu}
            goto="form"
          />
        </div>
      </div>
    </CSSTransition>
  );
}

export default Bag;
