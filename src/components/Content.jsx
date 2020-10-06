import React from "react";
import Header from "./Header";
import ProductCard from "./ProductCard";
import products from "../data/products";
import Addons from "./Addons";
import Alert from "./Alert";
import { useShoppingBagContext } from "./ShoppingBagContext";

function Content() {
  const { popup } = useShoppingBagContext();
  return (
    <div className="content">
      <Header />
      <div className="content__description">
        <p>What are we offering?</p>
        <p>
          Each gorgeous Rabboki set comes with ramyun noodles, tteokboki,
          kimchi, rapokki, and a flavored binggrae of your own choosing. Enjoy!
        </p>
      </div>
      {/* <h1 className="menu">menu</h1> */}
      <div
        className={
          popup.isShown ? "product_slider blur-active" : "product_slider"
        }
      >
        {products.map((product, key) => (
          <ProductCard product={product} key={`product-${key}`} />
        ))}
        <Addons />
      </div>
      {/* <h1 className="add-ons">add ons</h1> */}
      {/* {showAlert && <Alert />} */}
      <Alert />
    </div>
  );
}

export default Content;
