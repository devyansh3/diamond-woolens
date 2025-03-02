import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { Table } from "flowbite-react";
import axios from "axios";

function BatchesTable() {
  const [batches, setBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [newBatch, setNewBatch] = useState({
    colorFamily: "",
    colorName: "",
    lotNo: "",
    totalWeight: "",
    fullBags: "",
    leftoverWeight: "",
    pricePerBag: "",
    availableBags: "",
  });
  const navigate = useNavigate();

  // Function to fetch batches
  const fetchBatches = async () => {
    try {
      const response = await axios.get("http://localhost:2001/batches");
      setBatches(response.data);
      setFilteredBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Session expired, Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to fetch batches.");
      }
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Handlers for the new batch form
  const handleChange = (e) => {
    setNewBatch({ ...newBatch, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setShowDrawer(false);
    setNewBatch({
      colorFamily: "",
      colorName: "",
      lotNo: "",
      totalWeight: "",
      fullBags: "",
      leftoverWeight: "",
      pricePerBag: "",
      availableBags: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2001/batches", newBatch);
      toast.success("Batch created successfully!");
      fetchBatches();
      setShowDrawer(false);
      setNewBatch({
        colorFamily: "",
        colorName: "",
        lotNo: "",
        totalWeight: "",
        fullBags: "",
        leftoverWeight: "",
        pricePerBag: "",
        availableBags: "",
      });
    } catch (error) {
      console.error("Error creating batch:", error);
      toast.error("Failed to create batch.");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="overflow-x-auto mt-2 w-full h-full">
        <section className="w-full dark:bg-gray-900 h-full">
          <div className="h-full max-h-[calc(100vh-100px)] overflow-y-auto p-2 text-lg">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden h-full">
              <div className="mx-4">
                <div className="flex items-center justify-between space-x-4 pt-3">
                  <div className="flex-1 flex items-center space-x-3 pb-2">
                    <h5 className="dark:text-white font-semibold">Batches</h5>
                  </div>
                  <div className="w-full md:w-auto flex flex-col md:flex-row mb-3 md:mb-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <button
                      onClick={() => setShowDrawer(true)}
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-2 -ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      Add New Batch
                    </button>
                  </div>
                </div>
                <div className="border-t dark:border-gray-700 flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3">
                  <div className="lg:w-1/4 flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center">
                    <h5 className="dark:text-white font-light pr-2">
                      Manage Batches
                    </h5>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto h-full">
                <div className="overflow-y-auto h-full pr-4">
                  <Table
                    striped
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                  >
                    <Table.Head className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <Table.HeadCell className="px-4 py-3">
                        Lot Number
                      </Table.HeadCell>
                      <Table.HeadCell className="px-4 py-3">
                        Color Family
                      </Table.HeadCell>
                      <Table.HeadCell className="px-4 py-3">
                        Color Name
                      </Table.HeadCell>
                      <Table.HeadCell className="px-4 py-3">
                        Total Weight (kgs)
                      </Table.HeadCell>
                      <Table.HeadCell className="px-4 py-3">
                        Full Bags
                      </Table.HeadCell>
                      <Table.HeadCell className="px-4 py-3">
                        Leftover Weight (kgs)
                      </Table.HeadCell>
                      <Table.HeadCell className="px-4 py-3">
                        Price per Bag
                      </Table.HeadCell>
                      <Table.HeadCell className="px-4 py-3">
                        Available Bags
                      </Table.HeadCell>
                      <Table.HeadCell className="px-8 py-3">
                        <span className="sr-only">Actions</span>
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {filteredBatches?.map((batch, index) => (
                        <Table.Row
                          key={index}
                          className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Table.Cell className="px-4 py-2 whitespace-nowrap font-bold text-gray-900 dark:text-white text-xs">
                            <Link to={`/editbatch/${batch._id}`}>
                              {batch.lotNo}
                            </Link>
                          </Table.Cell>
                          <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                            {batch.colorFamily}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                            {batch.colorName}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                            {batch.totalWeight}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                            {batch.fullBags}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                            {batch.leftoverWeight}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                            {batch.pricePerBag}
                          </Table.Cell>
                          <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                            {batch.availableBags}
                          </Table.Cell>
                          <Table.Cell className="px-8 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                            <Link to={`/editbatch/${batch._id}`}>Edit</Link>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                  {filteredBatches?.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-gray-500 dark:text-gray-400">
                        No batches found.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Overlay Drawer for Creating a New Batch */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 w-96 p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Batch</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="colorFamily"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color Family
                </label>
                <select
                  name="colorFamily"
                  id="colorFamily"
                  value={newBatch.colorFamily}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                >
                  <option value="">Select a Family</option>
                  <option value="navy">Navy</option>
                  <option value="maroon">Maroon</option>
                  <option value="black">Black</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="colorName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Color Name
                </label>
                <input
                  type="text"
                  name="colorName"
                  id="colorName"
                  value={newBatch.colorName}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lotNo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lot Number
                </label>
                <input
                  type="text"
                  name="lotNo"
                  id="lotNo"
                  value={newBatch.lotNo}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="totalWeight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Weight (kgs)
                </label>
                <input
                  type="number"
                  name="totalWeight"
                  id="totalWeight"
                  value={newBatch.totalWeight}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fullBags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Bags
                </label>
                <input
                  type="number"
                  name="fullBags"
                  id="fullBags"
                  value={newBatch.fullBags}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="leftoverWeight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leftover Weight (kgs)
                </label>
                <input
                  type="number"
                  name="leftoverWeight"
                  id="leftoverWeight"
                  value={newBatch.leftoverWeight}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pricePerBag"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price per Bag
                </label>
                <input
                  type="number"
                  name="pricePerBag"
                  id="pricePerBag"
                  value={newBatch.pricePerBag}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="availableBags"
                  className="block text-sm font-medium text-gray-700"
                >
                  Available Bags
                </label>
                <input
                  type="number"
                  name="availableBags"
                  id="availableBags"
                  value={newBatch.availableBags}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-700 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BatchesTable;