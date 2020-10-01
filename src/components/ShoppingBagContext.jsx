import React, { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

const ShoppingBagContext = createContext();

export const useShoppingBagContext = () => {
  return useContext(ShoppingBagContext);
};

function ShoppingBagProvider(props) {
  const [shoppingBagItems, updateShoppingBagItems] = useState(
    sessionStorage.getItem("shopping-bag-items") || []
  );

  const updateItems = (itemToFilter, removeItem = false) => {
    const indexOfItem = shoppingBagItems.findIndex(
      (item) => item.ItemId === itemToFilter.ItemId
    );

    removeItem
      ? shoppingBagItems.splice(indexOfItem, 1)
      : shoppingBagItems.splice(indexOfItem, 1, itemToFilter);
    return shoppingBagItems;
  };

  const addToBag = (itemToAdd) => {
    //   check if item is already on the bog
    const isItemAdded = shoppingBagItems.some(
      (item) => item.ItemId === itemToAdd.ItemId
    );

    if (isItemAdded) {
      alert(
        "Item has been added to cart.\nOpen your shopping bag to view and edit items."
      );
      return;
    }

    updateShoppingBagItems((prev) => [...prev, itemToAdd]);
    // sessionStorage.setItem(
    //   "shopping-bag-items",
    //   JSON.stringify(shoppingBagItems)
    // );
  };

  const incrementItem = (itemToIncrement) => {
    itemToIncrement.itemCount += 1;
    itemToIncrement.itemSubtotal =
      itemToIncrement.itemPrice * itemToIncrement.itemCount;

    const newShoppingBagItems = updateItems(itemToIncrement);
    // updateShoppingBagItems(() => [...newShoppingBagItems]);
    updateShoppingBagItems([...newShoppingBagItems]);
    console.log("item incremented");
  };

  const decrementItem = (itemToDecrement) => {
    if (itemToDecrement.itemCount === 1) return;

    itemToDecrement.itemCount -= 1;
    itemToDecrement.itemSubtotal =
      itemToDecrement.itemPrice * itemToDecrement.itemCount;
    const newShoppingBagItems = updateItems(itemToDecrement);

    // updateShoppingBagItems(() => [...newShoppingBagItems]);
    updateShoppingBagItems([...newShoppingBagItems]);
    // push to session storage
    console.log("item decremented");
  };

  const removeItem = (itemToRemove) => {
    const newShoppingBagItems = updateItems(itemToRemove, true);
    updateShoppingBagItems([...newShoppingBagItems]);
  };

  const shoppingBag = {
    items: shoppingBagItems,
    add: addToBag,
    increment: incrementItem,
    decrement: decrementItem,
    remove: removeItem,
  };

  return (
    <ShoppingBagContext.Provider value={shoppingBag}>
      {props.children}
    </ShoppingBagContext.Provider>
  );
}

export default ShoppingBagProvider;
