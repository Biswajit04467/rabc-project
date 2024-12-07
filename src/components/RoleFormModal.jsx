import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const RoleFormModal = ({ open, onClose, role, onSave }) => {
  const { register, handleSubmit } = useForm();
  const [selectedItems, setSelectedItems] = useState([]);
  const initialState = { name: '', permissions: [] };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedItems(options);
    setFormData({ ...formData, permissions: options });
  };

  useEffect(() => {
    if (open) {
      if (role) {
        setFormData(role);
        setSelectedItems(role.permissions || []);
      } else {
        setFormData(initialState);
        setSelectedItems([]);
      }
    }
  }, [open, role]);

  const onSubmit = (data) => {
    onSave(formData);
    setFormData(initialState);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="bg-black/50 flex items-center justify-center fixed inset-0 z-50">
      <div className="relative bg-gray-900 rounded-xl shadow-2xl w-[50vw] p-10 max-w-2xl border border-gray-700">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-red-700 text-white py-2 px-4 rounded-full hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          onClick={onClose}
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Role Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-200 font-semibold mb-2"
            >
              Role Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              {...register('name', { required: true })}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full py-3 px-4 bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter role name"
            />
          </div>

          {/* Permissions Select */}
          <div>
            <label
              htmlFor="permissions"
              className="block text-gray-200 font-semibold mb-2"
            >
              Select Permissions
            </label>
            <select
              id="permissions"
              name="permissions"
              multiple
              value={selectedItems}
              onChange={handleSelectChange}
              className="w-full py-3 px-4 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="Read">Read</option>
              <option value="Write">Write</option>
              <option value="Edit">Edit</option>
              <option value="Delete">Delete</option>
            </select>

            <div className="text-sm text-gray-400 mt-2">
              Selected: <span className="font-medium">{selectedItems.join(', ')}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Hold down the <span className="font-medium">Ctrl</span> (Windows) or{' '}
              <span className="font-medium">Cmd</span> (Mac) key to select multiple
              options.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Save Role
          </button>
        </form>
      </div>
    </div>



  );
};

export default RoleFormModal;
