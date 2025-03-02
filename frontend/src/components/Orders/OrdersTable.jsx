import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Table } from "flowbite-react";
import axios from "axios";

function OrdersTable() {
    const [, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);

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

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="overflow-x-auto mt-2 w-full h-full">
                <section className="w-full dark:bg-gray-900 h-full">
                    <div className="h-full max-h-[calc(100vh-100px)] overflow-y-auto p-2 text-lg">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden h-full">
                            <div className="mx-4">
                                <div className="flex items-center justify-between py-2">
                                    <h5 className="dark:text-white font-semibold">Orders</h5>
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
                                                        {order._id}
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
        </>
    );
}

export default OrdersTable;