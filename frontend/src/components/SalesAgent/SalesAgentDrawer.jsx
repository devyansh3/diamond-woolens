import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

const defaultSalesAgent = {
    agentName: "",
    agentPhone: "",
};

function SalesAgentDrawer({ isOpen, initialData, onClose, onSave }) {
    const [agentData, setAgentData] = useState(defaultSalesAgent);

    useEffect(() => {
        if (initialData) {
            setAgentData(initialData);
        } else {
            setAgentData(defaultSalesAgent);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setAgentData({ ...agentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (agentData._id) {
                // Edit mode: update existing sales agent
                await axios.put(`http://localhost:2001/salesagents/${agentData._id}`, agentData);
                toast.success("Sales agent updated successfully!");
            } else {
                // New sales agent: create new record
                await axios.post("http://localhost:2001/salesagents", agentData);
                toast.success("Sales agent created successfully!");
            }
            onSave();
            onClose();
        } catch (error) {
            console.error("Error saving sales agent:", error);
            toast.error("Failed to save sales agent.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 w-96 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {agentData._id ? "Edit Sales Agent" : "Add New Sales Agent"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="agentName" className="block text-sm font-medium text-gray-700">
                            Agent Name
                        </label>
                        <input
                            type="text"
                            name="agentName"
                            id="agentName"
                            value={agentData.agentName}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="agentPhone" className="block text-sm font-medium text-gray-700">
                            Agent Phone
                        </label>
                        <input
                            type="text"
                            name="agentPhone"
                            id="agentPhone"
                            value={agentData.agentPhone}
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

SalesAgentDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    initialData: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default SalesAgentDrawer;