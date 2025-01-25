import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; // Updated import
import { Badge, Table } from "flowbite-react";
import axios from "axios";

import "jspdf-autotable";
import { EllipsisVertical } from "lucide-react";

function ProductionsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState(null);
  const [productionOrders, setProductionOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("filter");
  const navigate = useNavigate();
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [showUpdateStatusModal, setShowUpdateStatusModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const handleDropdownToggle = (event, index) => {
    const buttonElement = event.currentTarget;
    const rect = buttonElement.getBoundingClientRect();

    const spaceAbove = rect.top; // Distance from button to top of the viewport
    const spaceBelow = window.innerHeight - rect.bottom; // Distance from button to bottom of the viewport

    // Adjust dropdownDirection based on available space
    if (spaceBelow < 150 && spaceAbove > 150) {
      setDropdownDirection("up"); // Show dropdown upwards
    } else {
      setDropdownDirection("down"); // Show dropdown downwards
    }

    setDropdownVisible(index === dropdownVisible ? null : index);
  };

  // Function to fetch production orders
  const fetchProductionOrders = async () => {
    try {
      const response = await axios.get("http://localhost:2001/production"); // Adjust the URL based on your API endpoint
      setProductionOrders(response.data);
      setFilteredOrders(response.data); // Initially, filtered orders are the same as fetched orders
    } catch (error) {
      console.error("Error fetching production orders:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Session expired, Please login again.");
        navigate("/login");
      } else {
        toast.error("Failed to fetch production orders.");
      }
    }
  };

  useEffect(() => {
    fetchProductionOrders();
  }, []);

  // Separate search functions
  const searchByCustomerName = (productionOrders, searchTerm) => {
    return productionOrders.filter((booking) => {
      const customerName = booking.customer?.name?.toLowerCase() || "";
      return customerName.includes(searchTerm.toLowerCase());
    });
  };

  const searchByPhoneNumber = (productionOrders, searchTerm) => {
    return productionOrders.filter((booking) => {
      const phoneNumber = booking?.customer?.phone || "";
      return phoneNumber.includes(searchTerm);
    });
  };

  const searchbByBookingID = (productionOrders, searchTerm) => {
    return productionOrders.filter((booking) => {
      const bookingId = booking.bookingId || "";
      return bookingId.includes(searchTerm.toLowerCase());
    });
  };

  const searchByTrialDate = (productionOrders, searchTerm) => {
    return productionOrders.filter((booking) => {
      const trialDate = booking.orderSummary?.trialDate || "";
      return trialDate.includes(searchTerm.toLowerCase());
    });
  };

  const searchByDeliveryDate = (productionOrders, searchTerm) => {
    return productionOrders.filter((booking) => {
      const deliveryDate = booking.orderSummary?.deliveryDate || "";
      return deliveryDate.includes(searchTerm.toLowerCase());
    });
  };

  // Handle search based on selected criteria
  useEffect(() => {
    if (!searchTerm || !isSearchEnabled) {
      setFilteredOrders(productionOrders);
      return;
    }

    let filtered = [];
    switch (filterCriteria) {
      case "customerName":
        filtered = searchByCustomerName(productionOrders, searchTerm);
        break;
      case "phoneNumber":
        filtered = searchByPhoneNumber(productionOrders, searchTerm);
        break;
      case "bookingID":
        filtered = searchbByBookingID(productionOrders, searchTerm);
        break;
      case "trialDate":
        filtered = searchByTrialDate(productionOrders, searchTerm);
        break;
      case "deliveryDate":
        filtered = searchByDeliveryDate(productionOrders, searchTerm);
        break;
      default:
        filtered = productionOrders;
        break;
    }

    setFilteredBookings(filtered);
  }, [searchTerm, filterCriteria, productionOrders, isSearchEnabled]);

  // Function to calculate total quantity
  const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="overflow-x-auto mt-2 w-full h-full">
        <section className="w-full dark:bg-gray-900 h-full">
          <div className="h-full max-h-[calc(100vh-100px)] overflow-y-auto p-2 text-lg">
            {" "}
            {/* Adjust max height */}
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden h-full">
              <div className="mx-4">
                <div className="flex items-center justify-between space-x-4 pt-3">
                  <div className="flex-1 flex items-center space-x-3 pb-2">
                    <h5 className="dark:text-white font-semibold">
                      Production
                    </h5>
                  </div>
                </div>
                <div className="border-t dark:border-gray-700 flex flex-col-reverse md:flex-row items-center justify-between md:space-x-4 py-3">
                  <div className=" lg:w-1/4 flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center">
                    <h5 className="dark:text-white font-light pr-2">
                      Manage Ongoing Production
                    </h5>
                  </div>
                  <form className="lg: w-1/2 flex items-center">
                    <select
                      id="filter"
                      value={filterCriteria}
                      className="mr-2 p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="filter">Select Filter</option>
                      <option value="bookingID">Booking ID</option>
                      <option value="customerName">Customer Name</option>
                      <option value="phoneNumber">Customer Phone</option>
                    </select>
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        disabled={filterCriteria === "filter"} // Disable the search bar if no filter is selected
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder={`Search by ${filterCriteria}`}
                      />
                    </div>
                  </form>
                  <div className="w-full md:w-auto flex flex-col md:flex-row mb-3 md:mb-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <div className="flex items-center space-x-4"></div>
                    <Link
                      to="/newProduction"
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
                      Add New
                    </Link>
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
                      <Table.HeadCell scope="col" className="px-4 py-3">
                        Lot Number
                      </Table.HeadCell>
                      <Table.HeadCell scope="col" className="px-4 py-3">
                        color
                      </Table.HeadCell>
                      <Table.HeadCell scope="col" className="px-4 py-3">
                        count
                      </Table.HeadCell>
                      <Table.HeadCell scope="col" className="px-4 py-3">
                        Qty
                      </Table.HeadCell>

                      <Table.HeadCell scope="col" className="px-4 py-3">
                        yarn Yield
                      </Table.HeadCell>
                      <Table.HeadCell scope="col" className="px-4 py-3">
                        order Type
                      </Table.HeadCell>

                      <Table.HeadCell scope="col" className="px-4 py-3">
                        comments
                      </Table.HeadCell>
                      <Table.HeadCell scope="col" className="px-4 py-3">
                        content
                      </Table.HeadCell>

                      <Table.HeadCell scope="col" className="px-8 py-3">
                        <span className="sr-only">Actions</span>
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                      {filteredOrders?.map((booking, index) => {
                        return (
                          <Table.Row
                            key={index}
                            className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Table.Cell className="px-4 py-2 whitespace-nowrap font-bold text-gray-900 dark:text-white text-xs">
                              <Link to={`/editbooking/${booking._id}/1`}>
                                {booking.lotNumber}
                              </Link>
                            </Table.Cell>
                            <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                              <Link to={`/editbooking/${booking._id}/1`}>
                                {booking.color}
                              </Link>
                            </Table.Cell>
                            <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                              <Link to={`/editbooking/${booking._id}/1`}>
                                {booking.count}
                              </Link>
                            </Table.Cell>
                            <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                              <Link to={`/editbooking/${booking._id}/1`}>
                                {booking.quantity}
                              </Link>
                            </Table.Cell>

                            <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                              <Link to={`/editbooking/${booking._id}/1`}>
                                {booking.yarnYield}{" "}
                              </Link>
                            </Table.Cell>

                            <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                              <Link to={`/editbooking/${booking._id}/1`}>
                                {booking.orderType}
                              </Link>
                            </Table.Cell>
                            <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                              <Link to={`/editbooking/${booking._id}/1`}>
                                {booking.comments}{" "}
                              </Link>
                            </Table.Cell>
                            <Table.Cell className="px-4 py-2 whitespace-nowrap font-medium text-gray-900 dark:text-white text-xs">
                              <Link to={`/editbooking/${booking._id}/1`}>
                                {booking.content}{" "}
                              </Link>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                  {filteredOrders?.length === 0 && (
                    <div className="text-center py-4">
                      <p className="text-gray-500 dark:text-gray-400">
                        No productionOrders found.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProductionsTable;
