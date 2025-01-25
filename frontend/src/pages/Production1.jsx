import React, { useContext, useState } from "react";
import ProductionContext from "../context/ProductionContext";

function Production1({ goToNextStep }) {
  const { productionData, updateProductionData } =
    useContext(ProductionContext);
  const [orderType, setOrderType] = useState(productionData.orderType || ""); // Initialize orderType state

  // Function to handle orderType selection
  const handleOrderTypeChange = (e) => {
    const selectedOrderType = e.target.value;
    setOrderType(selectedOrderType);
    updateProductionData("orderType", selectedOrderType); // Update context
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Production Step 1
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Lot Number:
            <input
              type="text"
              value={productionData.lotNumber || ""}
              onChange={(e) =>
                updateProductionData("lotNumber", e.target.value)
              }
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Color:
            <input
              type="text"
              value={productionData.color || ""}
              onChange={(e) => updateProductionData("color", e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Quality:
            <input
              type="text"
              value={productionData.quality || ""}
              onChange={(e) => updateProductionData("quality", e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Count:
            <input
              type="text"
              value={productionData.count || ""}
              onChange={(e) => updateProductionData("count", e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </label>
        </div>

        {/* Order Type Dropdown */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Order Type:
            <select
              value={orderType}
              onChange={handleOrderTypeChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            >
              <option value="">Select Order Type</option>
              <option value="bulk">Bulk</option>
              <option value="customer">Customer</option>
            </select>
          </label>
        </div>
      </form>

      <button
        onClick={goToNextStep}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
}

export default Production1;
