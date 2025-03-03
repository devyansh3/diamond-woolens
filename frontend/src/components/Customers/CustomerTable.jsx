import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Table } from "flowbite-react";
import axios from "axios";
import CustomerDrawer from "./CustomerDrawer";

function CustomerTable() {
    const [, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerData, setDrawerData] = useState(null);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:2001/customers");
            setCustomers(response.data);
            setFilteredCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
            toast.error("Failed to fetch customers.");
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const openNewDrawer = () => {
        setDrawerData(null);
        setShowDrawer(true);
    };

    const openEditDrawer = (customer) => {
        setDrawerData(customer);
        setShowDrawer(true);
    };

    const handleDrawerClose = () => {
        setShowDrawer(false);
    };

    const handleSaveSuccess = () => {
        fetchCustomers();
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="overflow-x-auto mt-2 w-full h-full">
                <section className="w-full dark:bg-gray-900 h-full">
                    <div className="h-full max-h-[calc(100vh-100px)] overflow-y-auto p-2 text-lg">
                        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden h-full">
                            <div className="mx-4 flex items-center justify-between py-2">
                                <h5 className="dark:text-white font-semibold">Customers</h5>
                                <button
                                    onClick={openNewDrawer}
                                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                >
                                    Add New Customer
                                </button>
                            </div>
                            <div className="overflow-x-auto h-full">
                                <div className="overflow-y-auto h-full pr-4">
                                    <Table striped className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <Table.Head className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <Table.HeadCell>Customer Name</Table.HeadCell>
                                            <Table.HeadCell>Customer Phone</Table.HeadCell>
                                            <Table.HeadCell>
                                                <span className="sr-only">Actions</span>
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body>
                                            {filteredCustomers?.map((customer, index) => (
                                                <Table.Row
                                                    key={index}
                                                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs font-bold text-gray-900 dark:text-white">
                                                        {customer.customerName}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        {customer.customerPhone}
                                                    </Table.Cell>
                                                    <Table.Cell className="px-4 py-2 whitespace-nowrap text-xs text-gray-900 dark:text-white">
                                                        <button
                                                            onClick={() => openEditDrawer(customer)}
                                                            className="text-primary-700 hover:underline"
                                                        >
                                                            Edit
                                                        </button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                    {filteredCustomers?.length === 0 && (
                                        <div className="text-center py-4">
                                            <p className="text-gray-500 dark:text-gray-400">No customers found.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <CustomerDrawer
                isOpen={showDrawer}
                initialData={drawerData}
                onClose={handleDrawerClose}
                onSave={handleSaveSuccess}
            />
        </>
    );
}

export default CustomerTable;