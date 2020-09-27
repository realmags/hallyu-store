import React from "react";
import "./App.css";

// components
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import ShoppingBagProvider from "./components/ShoppingBagContext";

function App() {
  return (
    <div className="App">
      <ShoppingBagProvider>
        <div className="content">
          <Header />
          <p className="content__description">
            Welcome to your one-stop shop for Korean food!
          </p>
          <div className="product_slider">
            {products.map((product, key) => (
              <ProductCard product={product} key={`product-${key}`} />
            ))}
          </div>
        </div>
      </ShoppingBagProvider>
    </div>
  );
}

export default App;
