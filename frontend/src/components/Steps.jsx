import React, { useContext, useState } from "react";
import axios from "axios"; // Import axios
import Production1 from "../pages/Production1";
import Production2 from "../pages/Production2";
import ProductionContext from "../context/ProductionContext";

function Steps({
  canEdit,
  isEditMode,
  EditProductionData,
  handleUpdate,
  currStep,
}) {
  const [currentStep, setCurrentStep] = useState(currStep || 1);
  const { productionData } = useContext(ProductionContext);
  const goToNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const goToPrevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const submitProductionData = async () => {
    try {
      console.log("production data", productionData);
      // Make API call to submit productionData
      const response = await axios.post(
        "http://localhost:2001/production",
        productionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Submission successful: ", response.data);
      // You can add additional logic here, like handling the response or redirecting
    } catch (error) {
      console.error("Error submitting production data: ", error);
      // Handle error accordingly
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Production1
            EditproductionData={productionData}
            handleUpdate={handleUpdate}
            goToNextStep={goToNextStep}
          />
        );
      case 2:
        return (
          <Production2
            productionData={productionData}
            handleUpdate={handleUpdate}
            goToPrevStep={goToPrevStep}
            submitProductionData={submitProductionData} // Pass the submit function
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <section className="bg-white p-4 rounded-lg dark:bg-gray-800 antialiased h-full flex flex-col">
        <div className="mx-auto w-full h-full flex flex-col">
          <div className="space-y-8 flex-grow overflow-auto">
            <ol className="grid grid-cols-2 gap-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              <li className={currentStep === 1 ? "text-green-600" : ""}>
                Step 1: Production Details
              </li>
              <li className={currentStep === 2 ? "text-green-600" : ""}>
                Step 2: Additional Info & Submit
              </li>
            </ol>

            {renderStepComponent()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Steps;
