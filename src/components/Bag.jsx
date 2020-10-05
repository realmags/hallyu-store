<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
import { CSSTransition } from "react-transition-group";
import Button from "./Button";
import { useRef } from "react";
import { useShoppingBagContext } from "./ShoppingBagContext";

function Bag({ activeMenu, setActiveMenu }) {
  const shoppingBag = useShoppingBagContext();
  const bagRef = useRef(null);
<<<<<<< HEAD

  function Item({ item = {}, isAddon = false }) {
    const changeItemCount = (itemToChange, isAddonFlag, functionToCall) => {
      if (!Object.keys(itemToChange).length > 0) return;
      if (isAddonFlag) {
        functionToCall(itemToChange, isAddonFlag);
        return;
      }
      functionToCall(itemToChange);
    };

=======
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
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
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
<<<<<<< HEAD
                changeItemCount(item, isAddon, shoppingBag.increment)
=======
                Object.keys(item).length > 0 && shoppingBag.increment(item)
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
              }
            >
              +
            </button>
            <p>{item.itemCount || "0"}</p>
            <button
              type="button"
              onClick={() =>
<<<<<<< HEAD
                changeItemCount(item, isAddon, shoppingBag.decrement)
=======
                Object.keys(item).length > 0 && shoppingBag.decrement(item)
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
              }
            >
              -
            </button>
          </span>
          <span className="item__remove">
            <button
              className="product__add"
              type="button"
<<<<<<< HEAD
              onClick={() => {
                if (!Object.keys(item).length > 0) return;
                isAddon
                  ? shoppingBag.removeAddon(item)
                  : shoppingBag.remove(item);
              }}
=======
              onClick={() =>
                Object.keys(item).length > 0 && shoppingBag.remove(item)
              }
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
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
<<<<<<< HEAD
    const itemPromoId = "kimchi";
    const [deliveryFee, setDeliveryFee] = useState(() => {
      if (
        shoppingBag.items.addons.some((addon) => addon.itemId === itemPromoId)
      ) {
        return 0;
      }
      return 25;
    });
    return (
      <div className="bill">
        {shoppingBag.items.orders.length > 0 ||
        shoppingBag.items.addons.length > 0 ? (
          <p className="delivery__fee">Delivery fee: P{deliveryFee}</p>
        ) : null}
        <h1>
          Amount to pay: P
          {shoppingBag.items.orders.length > 0
            ? shoppingBag.items.addons.length > 0
              ? shoppingBag.items.orders
                  .map((item) => item.itemSubtotal)
                  .reduce((sum, current) => sum + current) +
                shoppingBag.items.addons
                  .map((item) => item.itemSubtotal)
                  .reduce((sum, current) => sum + current) +
                deliveryFee
              : shoppingBag.items.orders
                  .map((item) => item.itemSubtotal)
                  .reduce((sum, current) => sum + current) + deliveryFee
            : shoppingBag.items.addons.length > 0
            ? shoppingBag.items.addons
                .map((item) => item.itemSubtotal)
                .reduce((sum, current) => sum + current) + deliveryFee
=======
    return (
      <div className="bill">
        <h1>
          Amount to pay: P
          {shoppingBag.items.length > 0
            ? shoppingBag.items
                .map((item) => item.itemSubtotal)
                .reduce((sum, current) => sum + current)
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
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
<<<<<<< HEAD
        {shoppingBag.items.orders.length === 0 &&
        shoppingBag.items.addons.length === 0 ? (
          <Item />
        ) : (
          shoppingBag.items.orders.map((item) => (
            <Item item={item} key={`bag-${item.id}`} />
          ))
        )}
        {/* show addons */}
        {shoppingBag.items.addons.length > 0 &&
          shoppingBag.items.addons.map((item) => (
            <Item item={item} key={`addon-${item.id}`} isAddon={true} />
          ))}
=======
        {shoppingBag.items.length === 0 ? (
          <Item />
        ) : (
          shoppingBag.items.map((item) => (
            <Item item={item} key={`bag-${item.id}`} />
          ))
        )}
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
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
