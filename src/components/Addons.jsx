<<<<<<< HEAD
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
        console.log("option is unchecked", option.itemId);
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
      console.log("option is checked", option.itemId);
      shoppingBag.addAddon(addonItem);
=======
import React, { useRef, useState } from "react";
import addons from "../data/addons";

function Addons() {
  const [addonList, setAddonList] = useState({
    freeDelivery: false,
    options: [],
  });

  function Option({ option }) {
    const handleAddonCheck = (e, option) => {
      // if checked, add to list
      if (e.currentTarget.checked) {
        const item = {
          name: option.name,
          unit: option.unit,
          price: option.price,
        };
        if (option.id === "kimchi") {
          console.log("addon is kimchi");
          setAddonList((prev) => ({ ...prev, freeDelivery: true }));
        }
        console.log(item);
        setAddonList((prev) => ({ ...prev, options: [...prev.options, item] }));
        return;
      }
      // default is delete
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
    };

    return (
      <>
<<<<<<< HEAD
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
=======
        <input
          type="checkbox"
          name={`${option.id}-addon`}
          id={option.id}
          onChange={(e) => handleAddonCheck(e, option)}
        />
        <label htmlFor={option.id}>
          <div className="add-on__option">
            <div className="details">
              <div>
                <h4>{option.name}</h4>
                <p>{option.unit}</p>
              </div>
              <span>
                <p>P{option.price}</p>
              </span>
            </div>
            <p className="promo">{option.promo}</p>
          </div>
        </label>
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
      </>
    );
  }

  return (
    <div className="card add-on">
      <h4>add-ons</h4>
<<<<<<< HEAD
      <p className="add-on__instruction">
        select add-ons by clicking each card
      </p>
      <div>
        {addons.map((addon) => (
          <Option option={addon} key={addon.itemId} />
        ))}
      </div>
=======
      <form action="#">
        {/* <input
          type="checkbox"
          name="kimich-addon"
          id="kimchi"
          onChange={(e) => console.log(e.currentTarget.value, e.target.checked)}
        />
        <label htmlFor="kimchi"> */}
        <Option option={addons[0]} />
        {/* </label> */}
      </form>
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
    </div>
  );
}

export default Addons;
