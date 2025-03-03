import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

const defaultCustomer = {
    customerName: "",
    customerPhone: "",
};

function CustomerDrawer({ isOpen, initialData, onClose, onSave }) {
    const [customerData, setCustomerData] = useState(defaultCustomer);

    useEffect(() => {
        if (initialData) {
            setCustomerData(initialData);
        } else {
            setCustomerData(defaultCustomer);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (customerData._id) {
                // Edit mode
                await axios.put(`http://localhost:2001/customers/${customerData._id}`, customerData);
                toast.success("Customer updated successfully!");
            } else {
                // New customer
                await axios.post("http://localhost:2001/customers", customerData);
                toast.success("Customer created successfully!");
            }
            onSave(); // refresh list
            onClose(); // close drawer
        } catch (error) {
            console.error("Error saving customer:", error);
            toast.error("Failed to save customer.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 w-96 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {customerData._id ? "Edit Customer" : "Add New Customer"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            name="customerName"
                            id="customerName"
                            value={customerData.customerName}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">
                            Customer Phone
                        </label>
                        <input
                            type="text"
                            name="customerPhone"
                            id="customerPhone"
                            value={customerData.customerPhone}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
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

CustomerDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    initialData: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default CustomerDrawer;