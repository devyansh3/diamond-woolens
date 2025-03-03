import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

const defaultOrder = {
    batch: "",
    bagsOrdered: "",
    totalPrice: "",
    customer: "",
    salesAgent: "",
    status: "at factory",
};

function OrderDrawer({ isOpen, initialData, onClose, onSave }) {
    const [orderData, setOrderData] = useState(defaultOrder);

    // Update local state when the initial data changes (for edit mode)
    useEffect(() => {
        if (initialData) {
            setOrderData(initialData);
        } else {
            setOrderData(defaultOrder);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (orderData._id) {
                // Edit mode: update existing order
                await axios.put(`http://localhost:2001/orders/${orderData._id}`, orderData);
                toast.success("Order updated successfully!");
            } else {
                // New order: create order
                await axios.post("http://localhost:2001/orders", orderData);
                toast.success("Order created successfully!");
            }
            onSave(); // Refresh order list
            onClose(); // Close drawer
        } catch (error) {
            console.error("Error saving order:", error);
            toast.error("Failed to save order.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 w-96 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {orderData._id ? "Edit Order" : "Add New Order"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
                            Batch ID
                        </label>
                        <input
                            type="text"
                            name="batch"
                            id="batch"
                            value={orderData.batch}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            placeholder="Enter Batch ID"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bagsOrdered" className="block text-sm font-medium text-gray-700">
                            Bags Ordered
                        </label>
                        <input
                            type="number"
                            name="bagsOrdered"
                            id="bagsOrdered"
                            value={orderData.bagsOrdered}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            placeholder="Enter number of bags"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
                            Total Price
                        </label>
                        <input
                            type="number"
                            name="totalPrice"
                            id="totalPrice"
                            value={orderData.totalPrice}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            placeholder="Enter total price"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                            Customer ID
                        </label>
                        <input
                            type="text"
                            name="customer"
                            id="customer"
                            value={orderData.customer}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            placeholder="Enter Customer ID"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="salesAgent" className="block text-sm font-medium text-gray-700">
                            Sales Agent ID
                        </label>
                        <input
                            type="text"
                            name="salesAgent"
                            id="salesAgent"
                            value={orderData.salesAgent}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                            placeholder="Enter Sales Agent ID"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Order Status
                        </label>
                        <select
                            name="status"
                            id="status"
                            value={orderData.status}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        >
                            <option value="at factory">At Factory</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered to customer">Delivered to Customer</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary-700 text-white rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

OrderDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    initialData: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default OrderDrawer;