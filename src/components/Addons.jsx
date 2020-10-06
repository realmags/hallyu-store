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
          <span className="option__img">
            <img src={option.itemImg} alt={option.itemName} />
          </span>
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

  function AddonCard(props) {
    return (
      <div className="card add-on">
        <h4>add-ons</h4>
        <p className="add-on__instruction">
          select add-ons by clicking each card
        </p>
        <div>{props.children}</div>
      </div>
    );
  }

  return (
    // <div className="card add-on">
    //   <h4>add-ons</h4>
    //   <p className="add-on__instruction">
    //     select add-ons by clicking each card
    //   </p>
    //   <div>
    //     {addons.map((addon) => (
    //       <Option option={addon} key={addon.itemId} />
    //     ))}
    //   </div>
    // </div>
    <>
      <AddonCard>
        <Option option={addons[0]} key={addons[0].itemId} />
        <Option option={addons[1]} key={addons[1].itemId} />
        <Option option={addons[2]} key={addons[2].itemId} />
      </AddonCard>
      <AddonCard>
        <Option option={addons[3]} key={addons[3].itemId} />
        <Option option={addons[4]} key={addons[4].itemId} />
        <Option option={addons[5]} key={addons[5].itemId} />
      </AddonCard>
    </>
  );
}

export default Addons;
