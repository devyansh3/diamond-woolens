import React, { useContext } from "react";
import ProductionContext from "../context/ProductionContext";

function Production2({ goToPrevStep, submitProductionData }) {
  const { productionData, updateProductionData } =
    useContext(ProductionContext);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Production Step 2
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Quantity:
            <input
              type="number"
              value={productionData.quantity || ""}
              onChange={(e) => updateProductionData("quantity", e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </label>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Yarn Yield:
            <input
              type="text"
              value={productionData.yarnYield || ""}
              onChange={(e) =>
                updateProductionData("yarnYield", e.target.value)
              }
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </label>
        </div>

        {/* Conditionally display customer fields based on order type */}
        {productionData.orderType === "customer" && (
          <>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Customer Name:
                <input
                  type="text"
                  value={productionData.customerName || ""} // Use customerName
                  onChange={(e) =>
                    updateProductionData("customerName", e.target.value)
                  } // Use customerName
                  className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Customer Phone:
                <input
                  type="text"
                  value={productionData.customerPhone || ""} // Use customerPhone
                  onChange={(e) =>
                    updateProductionData("customerPhone", e.target.value)
                  } // Use customerPhone
                  className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </label>
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Content:
            <input
              type="text"
              value={productionData.content || ""}
              onChange={(e) => updateProductionData("content", e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
          </label>
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Comments:
            <textarea
              value={productionData.comments || ""}
              onChange={(e) => updateProductionData("comments", e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              rows="4"
            ></textarea>
          </label>
        </div>
      </form>

      <div className="mt-6 flex justify-between">
        <button
          onClick={goToPrevStep}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={submitProductionData}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Production2;
