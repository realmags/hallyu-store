import React from "react";
import { CSSTransition } from "react-transition-group";
import Button from "./Button";
import { useRef } from "react";
import { useShoppingBagContext } from "./ShoppingBagContext";

function Bag({ activeMenu, setActiveMenu }) {
  const shoppingBag = useShoppingBagContext();
  const bagRef = useRef(null);

  function Item({ item = {}, isAddon = false }) {
    const changeItemCount = (itemToChange, isAddonFlag, functionToCall) => {
      if (!Object.keys(itemToChange).length > 0) return;
      if (isAddonFlag) {
        functionToCall(itemToChange, isAddonFlag);
        return;
      }
      functionToCall(itemToChange);
    };

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
                changeItemCount(item, isAddon, shoppingBag.increment)
              }
            >
              +
            </button>
            <p>{item.itemCount || "0"}</p>
            <button
              type="button"
              onClick={() =>
                changeItemCount(item, isAddon, shoppingBag.decrement)
              }
            >
              -
            </button>
          </span>
          <span className="item__remove">
            <button
              className="product__add"
              type="button"
              onClick={() => {
                if (!Object.keys(item).length > 0) return;
                isAddon
                  ? shoppingBag.removeAddon(item)
                  : shoppingBag.remove(item);
              }}
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
    // const itemPromoId = "kimchi";
    // const [deliveryFee, setDeliveryFee] = useState(() => {
    //   if (
    //     shoppingBag.items.addons.some((addon) => addon.itemId === itemPromoId)
    //   ) {
    //     return 0;
    //   }
    //   return 25;
    // });
    return (
      <div className="bill">
        {/* {shoppingBag.items.orders.length > 0 ||
        shoppingBag.items.addons.length > 0 ? (
        ) : null} */}
        <p className="delivery__fee">
          Additional charges may apply for delivery services
        </p>
        <h1>
          Amount to pay: P
          {shoppingBag.items.orders.length > 0
            ? shoppingBag.items.addons.length > 0
              ? shoppingBag.items.orders
                  .map((item) => item.itemSubtotal)
                  .reduce((sum, current) => sum + current) +
                shoppingBag.items.addons
                  .map((item) => item.itemSubtotal)
                  .reduce((sum, current) => sum + current)
              : shoppingBag.items.orders
                  .map((item) => item.itemSubtotal)
                  .reduce((sum, current) => sum + current)
            : shoppingBag.items.addons.length > 0
            ? shoppingBag.items.addons
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
        {shoppingBag.items.orders.length === 0 &&
        shoppingBag.items.addons.length === 0 ? (
          <Item />
        ) : (
          shoppingBag.items.orders.map((item) => (
            <Item item={item} key={`bag-${item.itemId}`} />
          ))
        )}
        {/* show addons */}
        {shoppingBag.items.addons.length > 0 &&
          shoppingBag.items.addons.map((item) => (
            <Item item={item} key={`addon-${item.itemId}`} isAddon={true} />
          ))}
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
