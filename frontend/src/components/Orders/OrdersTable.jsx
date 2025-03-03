import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Table } from "flowbite-react";
import axios from "axios";
import OrderDrawer from "./OrdersDrawer";

function OrdersTable() {
    const [, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerData, setDrawerData] = useState(null); // null means new batch
    // Fetch orders from backend
    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:2001/orders");
            setOrders(response.data);
            setFilteredOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders.");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const openNewDrawer = () => {
        setDrawerData(null); // new batch
        setShowDrawer(true);
    };

    const openEditDrawer = (batch) => {
        setDrawerData(batch);
        setShowDrawer(true);
    };

    const handleDrawerClose = () => {
        setShowDrawer(false);
    };

    const handleSaveSuccess = () => {
        fetchOrders();
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="overflow-x-auto mt-2 w-full h-full">
                <section className="w-full dark:bg-gray-900 h-full">
                    <div className="h-full max-h-[calc(100vh-100px)] overflow-y-auto p-2 text-lg">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden h-full">
                            <div className="mx-4">
                                <div className="flex items-center justify-between space-x-4 py-2">
                                    <div className="flex-1 flex items-center space-x-3 ">
                                        <h5 className="dark:text-white font-semibold">Batches</h5>
                                    </div>
                                    <div className="w-full md:w-auto flex flex-col md:flex-row mb-3 md:mb-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                        <button
                                            onClick={openNewDrawer}
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
                                        <h5 className="dark:text-white font-light pr-2">Manage Batches</h5>
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
                                            <Table.HeadCell>Order ID</Table.HeadCell>
                                            <Table.HeadCell>Batch Lot No</Table.HeadCell>
                                            <Table.HeadCell>Bags Ordered</Table.HeadCell>
                                            <Table.HeadCell>Total Price</Table.HeadCell>
                                            <Table.HeadCell>Customer</Table.HeadCell>
                                            <Table.HeadCell>Sales Agent</Table.HeadCell>
                                            <Table.HeadCell>Status</Table.HeadCell>
                                            <Table.HeadCell>Created At</Table.HeadCell>
                                            <Table.HeadCell>
                                                <span className="sr-only">Actions</span>
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body>
                                            {filteredOrders?.map((order, index) => (
                                                <Table.Row
                                                    key={index}
                                                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs font-bold text-gray-900 dark:text-white">
                                                        <button onClick={() => openEditDrawer(order)}>  {order._id}</button>
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {order.batch?.lotNo || "N/A"}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {order.bagsOrdered}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {order.totalPrice}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {order.customer?.customerName || "N/A"}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {order.salesAgent?.agentName || "N/A"}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {order.status}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {new Date(order.createdAt).toLocaleString()}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {/* For future actions like view or edit */}
                                                        <button className="text-primary-700 hover:underline">
                                                            View
                                                        </button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                    {filteredOrders?.length === 0 && (
                                        <div className="text-center py-4">
                                            <p className="text-gray-500 dark:text-gray-400">
                                                No orders found.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <OrderDrawer
                isOpen={showDrawer}
                initialData={drawerData}
                onClose={handleDrawerClose}
                onSave={handleSaveSuccess}
            />
        </>
    );
}

export default OrdersTable;