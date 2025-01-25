import React, { createContext, useState } from "react";

// Create the ProductionContext
const ProductionContext = createContext();

// Define an initial state for production data
// context/ProductionContext.js
const initialProductionObj = {
  lotNumber: "",
  color: "",
  quality: "",
  count: "",
  quantity: 0,
  yarnYield: "",
  orderType: "",
  comments: "",
  content: "",
  customerName: "", // New field for customer name
  customerPhone: "", // New field for customer phone
};

export const ProductionProvider = ({ children }) => {
  const [productionData, setProductionData] = useState(initialProductionObj);

  // Function to refresh the production state to initial values
  const refreshProductionState = () => {
    setProductionData({
      ...initialProductionObj,
      createdAt: new Date(), // Reset createdAt each time
    });
  };

  // Function to update the production data by key-value pairs
  const updateProductionData = (key, value) => {
    setProductionData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    console.log("data", productionData);
  };

  // You can add more functions as needed, such as submitting the data or handling other specific fields.

  return (
    <ProductionContext.Provider
      value={{
        productionData,
        updateProductionData,
        refreshProductionState,
      }}
    >
      {children}
    </ProductionContext.Provider>
  );
};

export default ProductionContext;
