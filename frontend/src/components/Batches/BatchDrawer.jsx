import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types';

const defaultBatch = {
    colorFamily: "",
    colorName: "",
    lotNo: "",
    totalWeight: "",
    fullBags: "",
    leftoverWeight: "",
    pricePerBag: "",
    availableBags: "",
};

function BatchDrawer({ isOpen, initialData, onClose, onSave }) {
    const [batchData, setBatchData] = useState(defaultBatch);

    // Update local state when the initial data changes (for edit mode)
    useEffect(() => {
        if (initialData) {
            setBatchData(initialData);
        } else {
            setBatchData(defaultBatch);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setBatchData({ ...batchData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (batchData._id) {
                // Edit mode: update existing batch
                await axios.put(`http://localhost:2001/batches/${batchData._id}`, batchData);
                toast.success("Batch updated successfully!");
            } else {
                // New batch: create batch
                await axios.post("http://localhost:2001/batches", batchData);
                toast.success("Batch created successfully!");
            }
            onSave(); // Refresh list
            onClose(); // Close drawer
        } catch (error) {
            console.error("Error saving batch:", error);
            toast.error("Failed to save batch.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 w-96 p-6 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">{batchData._id ? "Edit Batch" : "Add New Batch"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="colorFamily" className="block text-sm font-medium text-gray-700">
                            Color Family
                        </label>
                        <select
                            name="colorFamily"
                            id="colorFamily"
                            value={batchData.colorFamily}
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
                        <label htmlFor="colorName" className="block text-sm font-medium text-gray-700">
                            Color Name
                        </label>
                        <input
                            type="text"
                            name="colorName"
                            id="colorName"
                            value={batchData.colorName}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lotNo" className="block text-sm font-medium text-gray-700">
                            Lot Number
                        </label>
                        <input
                            type="text"
                            name="lotNo"
                            id="lotNo"
                            value={batchData.lotNo}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalWeight" className="block text-sm font-medium text-gray-700">
                            Total Weight (kgs)
                        </label>
                        <input
                            type="number"
                            name="totalWeight"
                            id="totalWeight"
                            value={batchData.totalWeight}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fullBags" className="block text-sm font-medium text-gray-700">
                            Full Bags
                        </label>
                        <input
                            type="number"
                            name="fullBags"
                            id="fullBags"
                            value={batchData.fullBags}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="leftoverWeight" className="block text-sm font-medium text-gray-700">
                            Leftover Weight (kgs)
                        </label>
                        <input
                            type="number"
                            name="leftoverWeight"
                            id="leftoverWeight"
                            value={batchData.leftoverWeight}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="pricePerBag" className="block text-sm font-medium text-gray-700">
                            Price per Bag
                        </label>
                        <input
                            type="number"
                            name="pricePerBag"
                            id="pricePerBag"
                            value={batchData.pricePerBag}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="availableBags" className="block text-sm font-medium text-gray-700">
                            Available Bags
                        </label>
                        <input
                            type="number"
                            name="availableBags"
                            id="availableBags"
                            value={batchData.availableBags}
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

BatchDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    initialData: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default BatchDrawer;