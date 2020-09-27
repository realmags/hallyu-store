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
      (item) => item.id === itemToFilter.id
    );

    removeItem
      ? shoppingBagItems.splice(indexOfItem, 1)
      : shoppingBagItems.splice(indexOfItem, 1, itemToFilter);
    // if (removeItem) {
    //   shoppingBagItems.splice(indexOfItem, 1);
    //   return shoppingBagItems;
    // }

    // shoppingBagItems.splice(indexOfItem, 1, itemToFilter);
    return shoppingBagItems;
  };

  const addToBag = (itemToAdd) => {
    //   check if item is already on the bog
    const isItemAdded = shoppingBagItems.some(
      (item) => item.id === itemToAdd.id
    );

    if (isItemAdded) {
      alert("Item has already been added to cart.");
      return;
    }

    updateShoppingBagItems((prev) => [...prev, itemToAdd]);
    // sessionStorage.setItem(
    //   "shopping-bag-items",
    //   JSON.stringify(shoppingBagItems)
    // );
  };

  const incrementItem = (itemToIncrement) => {
    itemToIncrement.count += 1;
    itemToIncrement.subtotal = itemToIncrement.price * itemToIncrement.count;

    const newShoppingBagItems = updateItems(itemToIncrement);
    // updateShoppingBagItems(() => [...newShoppingBagItems]);
    updateShoppingBagItems([...newShoppingBagItems]);
    console.log("item incremented");
  };

  const decrementItem = (itemToDecrement) => {
    if (itemToDecrement.count === 1) return;

    itemToDecrement.count -= 1;
    itemToDecrement.subtotal = itemToDecrement.price * itemToDecrement.count;
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
