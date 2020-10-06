import React from "react";
import "./App.css";

// components
import ShoppingBagProvider from "./components/ShoppingBagContext";
import Content from "./components/Content";

function App() {
  // const showAlert = ;
  return (
    <div className="App">
      <ShoppingBagProvider>
        <Content />
      </ShoppingBagProvider>
    </div>
  );
}

export default App;
