import React, { useState } from "react";

function PermissionManager({ roles, onSavePermissions }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [availablePermissions] = useState([
    "Read",
    "Write",
    "Edit",
    "Delete",
    "Manage Users",
    "Manage Roles",
  ]);

  const handleRoleChange = (event) => {
    const roleId = parseInt(event.target.value, 10);
    const role = roles.find((r) => r.id === roleId);
    setSelectedRole(role);
    setPermissions(role?.permissions || []);
  };

  const togglePermission = (permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSave = () => {
    if (selectedRole) {
      onSavePermissions({ ...selectedRole, permissions });
      setSelectedRole(null);
      setPermissions([]);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-200 mb-6 text-center">
        Manage Permissions
      </h2>
      <div className="mb-6">
        <label className="block text-gray-300 font-semibold mb-2">
          Select Role:
        </label>
        <select
          className="w-full px-4 py-3 bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
          value={selectedRole?.id || ""}
          onChange={handleRoleChange}
        >
          <option value="" className="text-gray-500">
            Choose a Role
          </option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>
      {selectedRole && (
        <div>
          <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">
            Permissions for <span className="underline">{selectedRole.name}</span>:
          </h3>
          <div className="grid grid-cols-2 gap-4 bg-gray-600/25  p-4 rounded-lg shadow-inner">
            {availablePermissions.map((permission) => (
              <label
                key={permission}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition"
              >
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                  className="h-4 w-4 text-purple-500 focus:ring-purple-500 rounded"
                />
                <span className="text-gray-300">{permission}</span>
              </label>
            ))}
          </div>
          <button
            onClick={handleSave}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition transform hover:-translate-y-1"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default PermissionManager;
