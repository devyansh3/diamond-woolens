import React, { useContext, useEffect } from "react";
import CollapsableSidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Steps from "../components/Steps";

function AddNewProduction() {
  //   useEffect(() => {
  //     return () => {
  //       refreshBookingState();
  //     };
  //   }, []);

  return (
    <div className="bg-gray-200 dark:bg-gray-900 antialiased min-h-full">
      <Navbar />
      <div className="flex h-screen">
        <CollapsableSidebar className="h-full" />

        <main className="bg-gray-200 dark:bg-gray-900  p-2 h-full w-full flex flex-col">
          <div className="flex-grow  mt-16 overflow-hidden">
            <Steps
              isEditMode={false}
              canEdit={true}
              currStep={1}
              className="h-full"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddNewProduction;
