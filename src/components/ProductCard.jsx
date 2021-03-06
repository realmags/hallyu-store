import React, { useState } from "react";
import { useShoppingBagContext } from "./ShoppingBagContext";

function ProductCard({ product }) {
  const shoppingBag = useShoppingBagContext();
  const [count, setCount] = useState(1);
  const [flavor, setFlavor] = useState("strawberry");

  const addItemToOrderList = (product) => {
    const itemToAdd = {
      itemId: `${product.id}_${flavor}`,
      itemName: product.name,
      itemCount: count,
      itemSubtotal: product.price * count,
      itemSubtitle: `& ${flavor} binggrae`,
      itemPrice: product.price,
    };
    shoppingBag.add(itemToAdd);
    console.warn("store items in session storage in case user refeshes");
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const handleFlavorChange = (e) => {
    setFlavor(e.target.value);
  };

  return (
    <div className="card">
      <div className="card__image">
        <img src={product.image} alt="enter product name" />
      </div>
      <div className="card__product">
        <div className="product__details">
          <div className="product__name">
            <h1>{product.name}</h1>
            <p>{product.subtitle}</p>
          </div>
          <span className="product__price">P{product.price}</span>
        </div>
        <div className="product__description">
          <p>What's in it</p>
          <p>{product.description}</p>
        </div>
        <div className="product__options">
          <p className="option__title">Binggrae flavor</p>
          <section>
            <select
              name="binggrae-flavor"
              id="binggrae"
              onChange={(e) => handleFlavorChange(e)}
            >
              <option value="strawberry">Strawberry</option>
              <option value="melon">Melon</option>
              <option value="banana">Banana</option>
            </select>
          </section>
        </div>
        <div className="product__button">
          <span className="count__button">
            <button type="button" onClick={incrementCount}>
              +
            </button>
            <p>{count}</p>
            <button type="button" onClick={decrementCount}>
              -
            </button>
          </span>
          <span className="product__add">
            <button type="button" onClick={() => addItemToOrderList(product)}>
              Add to Bag
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
