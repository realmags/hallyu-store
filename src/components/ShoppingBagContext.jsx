import React, { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

const ShoppingBagContext = createContext();

export const useShoppingBagContext = () => {
  return useContext(ShoppingBagContext);
};

function ShoppingBagProvider(props) {
  const [shoppingBagItems, updateShoppingBagItems] = useState(
<<<<<<< HEAD
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
=======
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
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
    );

    if (isItemAdded) {
      alert(
        "Item has been added to cart.\nOpen your shopping bag to view and edit items."
      );
      return;
    }

<<<<<<< HEAD
    updateShoppingBagItems((prev) => ({
      ...prev,
      orders: [...prev.orders, itemToAdd],
    }));
=======
    updateShoppingBagItems((prev) => [...prev, itemToAdd]);
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
    // sessionStorage.setItem(
    //   "shopping-bag-items",
    //   JSON.stringify(shoppingBagItems)
    // );
  };

<<<<<<< HEAD
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
=======
  const incrementItem = (itemToIncrement) => {
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
    itemToIncrement.itemCount += 1;
    itemToIncrement.itemSubtotal =
      itemToIncrement.itemPrice * itemToIncrement.itemCount;

<<<<<<< HEAD
    const newShoppingBagItems = isAddon
      ? updateItems(itemToIncrement, false, shoppingBagItems.addons)
      : updateItems(itemToIncrement);

    updateShoppingBagItems({ ...newShoppingBagItems });
    console.log("item incremented");
  };

  const decrementItem = (itemToDecrement, isAddon = false) => {
=======
    const newShoppingBagItems = updateItems(itemToIncrement);
    // updateShoppingBagItems(() => [...newShoppingBagItems]);
    updateShoppingBagItems([...newShoppingBagItems]);
    console.log("item incremented");
  };

  const decrementItem = (itemToDecrement) => {
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
    if (itemToDecrement.itemCount === 1) return;

    itemToDecrement.itemCount -= 1;
    itemToDecrement.itemSubtotal =
      itemToDecrement.itemPrice * itemToDecrement.itemCount;
<<<<<<< HEAD

    const newShoppingBagItems = isAddon
      ? updateItems(itemToDecrement, false, shoppingBagItems.addons)
      : updateItems(itemToDecrement);

    updateShoppingBagItems({ ...newShoppingBagItems });
=======
    const newShoppingBagItems = updateItems(itemToDecrement);

    // updateShoppingBagItems(() => [...newShoppingBagItems]);
    updateShoppingBagItems([...newShoppingBagItems]);
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
    // push to session storage
    console.log("item decremented");
  };

  const removeItem = (itemToRemove) => {
<<<<<<< HEAD
    const newShoppingBagItems = updateItems(
      itemToRemove,
      true,
      shoppingBag.orders
    );
    updateShoppingBagItems({ ...newShoppingBagItems });
=======
    const newShoppingBagItems = updateItems(itemToRemove, true);
    updateShoppingBagItems([...newShoppingBagItems]);
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
  };

  const shoppingBag = {
    items: shoppingBagItems,
<<<<<<< HEAD
    add: addOrderToBag,
    increment: incrementItem,
    decrement: decrementItem,
    remove: removeItem,
    removeAddon,
    addAddon: addAddonToBag,
=======
    add: addToBag,
    increment: incrementItem,
    decrement: decrementItem,
    remove: removeItem,
>>>>>>> 74d70acfb3f08a5896e339750db2f3368a8fb19a
  };

  return (
    <ShoppingBagContext.Provider value={shoppingBag}>
      {props.children}
    </ShoppingBagContext.Provider>
  );
}

export default ShoppingBagProvider;
