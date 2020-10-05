import React, { useState } from "react";
import { useShoppingBagContext } from "./ShoppingBagContext";
import addons from "../data/addons";

function Addons() {
  const shoppingBag = useShoppingBagContext();

  function Option({ option }) {
    const [isSelected, setIsSelected] = useState(
      shoppingBag.items.addons.some((addon) => addon.itemId === option.itemId)
    );
    const handleClick = (e, option) => {
      // if unchecked, remove from addonList
      const addons = shoppingBag.items.addons;
      if (addons.some((addon) => addon.itemId === option.itemId)) {
        shoppingBag.removeAddon(option);
        return;
      }

      // if checked, add to list default
      const addonItem = {
        itemId: option.itemId,
        itemName: option.itemName,
        itemSubtitle: option.itemSubtitle,
        itemCount: 1,
        itemSubtotal: option.itemPrice * 1,
        itemPrice: option.itemPrice,
      };
      shoppingBag.addAddon(addonItem);
    };

    return (
      <>
        <div
          className="add-on__option"
          style={
            isSelected
              ? { background: "var(--red-secondary)" }
              : { background: "none" }
          }
          onClick={(e) => handleClick(e, option)}
        >
          <div className="details">
            <div>
              <h4>{option.itemName}</h4>
              <p>{option.itemSubtitle}</p>
            </div>
            <span>
              <p>P{option.itemPrice}</p>
            </span>
          </div>
          <p className="promo">{option.itemPromo}</p>
        </div>
        {/* </label> */}
      </>
    );
  }

  return (
    <div className="card add-on">
      <h4>add-ons</h4>
      <p className="add-on__instruction">
        select add-ons by clicking each card
      </p>
      <div>
        {addons.map((addon) => (
          <Option option={addon} key={addon.itemId} />
        ))}
      </div>
    </div>
  );
}

export default Addons;
