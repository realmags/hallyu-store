import React, { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

const ShoppingBagContext = createContext();

export const useShoppingBagContext = () => {
  return useContext(ShoppingBagContext);
};

function ShoppingBagProvider(props) {
  const [shoppingBagItems, updateShoppingBagItems] = useState(
    sessionStorage.getItem("shopping-bag-items") || {
      orders: [],
      addons: [],
    }
  );

  const updateItems = (
    itemToFilter,
    removeItem = false,
    arrayToUpdate = shoppingBagItems.orders
  ) => {
    const indexOfItem = arrayToUpdate.findIndex(
      (item) => item.itemId === itemToFilter.itemId
    );

    // completely remove an item or remove then insert the updated version
    removeItem
      ? arrayToUpdate.splice(indexOfItem, 1)
      : arrayToUpdate.splice(indexOfItem, 1, itemToFilter);
    return shoppingBagItems;
  };

  const addOrderToBag = (itemToAdd) => {
    //   check if item is already on the bog
    const isItemAdded = shoppingBagItems.orders.some(
      (item) => item.itemId === itemToAdd.itemId
    );

    if (isItemAdded) {
      alert(
        "Item has been added to cart.\nOpen your shopping bag to view and edit items."
      );
      return;
    }

    updateShoppingBagItems((prev) => ({
      ...prev,
      orders: [...prev.orders, itemToAdd],
    }));
    // sessionStorage.setItem(
    //   "shopping-bag-items",
    //   JSON.stringify(shoppingBagItems)
    // );
  };

  const addAddonToBag = (addonToAdd = null) => {
    updateShoppingBagItems((prev) => ({
      ...prev,
      addons: [...prev.addons, addonToAdd],
    }));
  };

  const removeAddon = (addonToRemove) => {
    const newShoppingBagItems = updateItems(
      addonToRemove,
      true,
      shoppingBagItems.addons
    );
    updateShoppingBagItems({ ...newShoppingBagItems });
  };

  const incrementItem = (itemToIncrement, isAddon = false) => {
    itemToIncrement.itemCount += 1;
    itemToIncrement.itemSubtotal =
      itemToIncrement.itemPrice * itemToIncrement.itemCount;

    const newShoppingBagItems = isAddon
      ? updateItems(itemToIncrement, false, shoppingBagItems.addons)
      : updateItems(itemToIncrement);

    updateShoppingBagItems({ ...newShoppingBagItems });
    console.log("item incremented");
  };

  const decrementItem = (itemToDecrement, isAddon = false) => {
    if (itemToDecrement.itemCount === 1) return;

    itemToDecrement.itemCount -= 1;
    itemToDecrement.itemSubtotal =
      itemToDecrement.itemPrice * itemToDecrement.itemCount;

    const newShoppingBagItems = isAddon
      ? updateItems(itemToDecrement, false, shoppingBagItems.addons)
      : updateItems(itemToDecrement);

    updateShoppingBagItems({ ...newShoppingBagItems });
    // push to session storage
    console.log("item decremented");
  };

  const removeItem = (itemToRemove) => {
    const newShoppingBagItems = updateItems(
      itemToRemove,
      true,
      shoppingBag.orders
    );
    updateShoppingBagItems({ ...newShoppingBagItems });
  };

  const shoppingBag = {
    items: shoppingBagItems,
    add: addOrderToBag,
    increment: incrementItem,
    decrement: decrementItem,
    remove: removeItem,
    removeAddon,
    addAddon: addAddonToBag,
  };

  return (
    <ShoppingBagContext.Provider value={shoppingBag}>
      {props.children}
    </ShoppingBagContext.Provider>
  );
}

export default ShoppingBagProvider;
