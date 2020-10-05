import React, { useState } from "react";
import { ReactComponent as ShoppingBagIcon } from "@fortawesome/fontawesome-free/svgs/solid/shopping-bag.svg";
import { ReactComponent as AsteriskIcon } from "@fortawesome/fontawesome-free/svgs/solid/asterisk.svg";
import Bag from "./Bag";
import Dropdown from "./Dropdown";
import Form from "./Form";
import { useEffect } from "react";
import { useShoppingBagContext } from "./ShoppingBagContext";
// import { useRef } from "react";

function Header() {
<<<<<<< HEAD
  const shoppingBag = useShoppingBagContext();
  const [notifIsShown, setNotifIsShown] = useState(false);
  const [bagIsShown, setBagIsShown] = useState(false);
  const [activeMenu, setActiveMenu] = useState("bag");

  useEffect(() => {
    setNotifIsShown(
      shoppingBag.items.orders.length > 0 || shoppingBag.items.addons.length
        ? true
        : false
    );
  }, [shoppingBag.items]);
=======
  // include state in redux
  const bagItems = useShoppingBagContext().items;
  const [notifIsShown, setNotifIsShown] = useState(false);
  const [bagIsShown, setBagIsShown] = useState(false);
  const [activeMenu, setActiveMenu] = useState("form");

  // console.log("header bagItems", bagItems);

  useEffect(() => {
    setNotifIsShown(bagItems.length > 0 ? true : false);
  }, [bagItems]);
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a

  return (
    <div className="header">
      <span className="header__logo">hallyu</span>
      <div className="header__icon" onClick={() => setBagIsShown(!bagIsShown)}>
        <ShoppingBagIcon />
        {notifIsShown && <NotifIcon />}
      </div>
      {bagIsShown && (
        <Dropdown setBagIsShown={setBagIsShown} bagIsShown={bagIsShown}>
          <Bag
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            bagIsShown={bagIsShown}
            setBagIsShown={setBagIsShown}
          />
          <Form activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </Dropdown>
      )}
    </div>
  );
}

function NotifIcon() {
  return (
    <span className="cart__indicator">
      <AsteriskIcon />
    </span>
  );
}

export default Header;
