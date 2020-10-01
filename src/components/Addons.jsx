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
    };

    return (
      <>
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
      </>
    );
  }

  return (
    <div className="card add-on">
      <h4>add-ons</h4>
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
    </div>
  );
}

export default Addons;
