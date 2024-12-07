import React, { useState, useEffect } from 'react';

const UserFormModal = ({ user, open, onClose, onSave, roles }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    role: '',
    status: 'Active',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        id: null,
        name: '',
        email: '',
        role: roles[0]?.name || '',
        status: 'Active',
      });
    }
  }, [user, roles]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-200 mb-6">
          {user ? 'Edit User' : 'Add User'}
        </h2>

        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-gray-300 font-medium">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-gray-300 font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-gray-300 font-medium">Role</label>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            >
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-gray-300 font-medium">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full border border-gray-700 bg-gray-800 text-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-8 space-x-6">
          <button
            onClick={onClose}
            className="px-5 py-3 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>

  );
};

export default UserFormModal;
