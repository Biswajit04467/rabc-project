import React, { useState } from 'react';

const RoleTable = ({ roles, onEdit,onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterPermission, setFilterPermission] = useState('');

  // Sort roles based on the current sort configuration
  const sortedRoles = [...roles].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter roles based on search and permission filters
  const filteredRoles = sortedRoles.filter((role) => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPermission =
      filterPermission === '' || role.permissions.includes(filterPermission);
    return matchesSearch && matchesPermission;
  });

  // Handle sorting changes
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-xl">
    {/* Controls: Search and Filter */}
    <div className="flex justify-between items-center mb-6">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by role name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/3 px-4 py-3 bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
      />
  
      {/* Permission Filter */}
      <select
        value={filterPermission}
        onChange={(e) => setFilterPermission(e.target.value)}
        className="px-4 py-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
      >
        <option value="">All Permissions</option>
        {Array.from(new Set(roles.flatMap((role) => role.permissions))).map(
          (permission) => (
            <option key={permission} value={permission}>
              {permission}
            </option>
          )
        )}
      </select>
    </div>
  
    {/* Role Table */}
    <div className="overflow-hidden bg-gray-800/50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700">
      <table className="w-full text-left">
        <thead className="bg-gradient-to-r from-purple-700 to-purple-900">
          <tr>
            <th
              className="px-6 py-4 text-sm font-semibold text-gray-200 uppercase tracking-wide cursor-pointer hover:text-white transition"
              onClick={() => handleSort('name')}
            >
              Role Name{' '}
              {sortConfig.key === 'name'
                ? sortConfig.direction === 'asc'
                  ? '↑'
                  : '↓'
                : ''}
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-200 uppercase">
              Permissions
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-200 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role, index) => (
              <tr
                key={role.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-800/30'
                } hover:bg-gray-800 transition`}
              >
                <td className="px-6 py-4 text-gray-300">{role.name}</td>
                <td className="px-6 py-4 text-gray-300">
                  {role.permissions.join(', ')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEdit(role)}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(role.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="py-6 px-6 text-center text-gray-400 font-medium"
              >
                No roles found. Try adjusting the filters or adding new roles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default RoleTable;
