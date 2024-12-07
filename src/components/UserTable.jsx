import React, { useState } from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('');

  // Sort users based on the current sortConfig
  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filter users based on the search term and status
  const filteredUsers = sortedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus ? user.status === filterStatus : true;
    return matchesSearch && matchesStatus;
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
    <div className="mb-8 flex justify-between items-center">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/3 px-4 py-3 bg-gray-800 text-gray-300 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
      />
  
      {/* Status Filter */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-4 py-3 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
      >
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  
    <div className="overflow-hidden bg-gray-800/50 backdrop-blur-md shadow-lg rounded-xl border border-gray-700">
      <table className="w-full text-left">
        <thead className="bg-gradient-to-r from-purple-700 to-purple-900">
          <tr>
            {['Name', 'Email', 'Role', 'Status'].map((key) => (
              <th
                key={key.toLowerCase()}
                className="py-4 px-6 text-sm font-semibold text-gray-200 uppercase tracking-wide cursor-pointer hover:text-white transition"
                onClick={() => handleSort(key.toLowerCase())}
              >
                {key}{' '}
                {sortConfig.key === key.toLowerCase()
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : ''}
              </th>
            ))}
            <th className="py-4 px-6 text-sm font-semibold text-gray-200 uppercase text-center">
              Actions
            </th>
          </tr>
        </thead>
  
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-800/50' : 'bg-gray-800/30'
                } hover:bg-gray-800 transition`}
              >
                <td className="py-4 px-6 text-gray-300">{user.name}</td>
                <td className="py-4 px-6 text-gray-300">{user.email}</td>
                <td className="py-4 px-6 text-gray-300">{user.role}</td>
                <td className="py-4 px-6 text-gray-300">{user.status}</td>
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => onEdit(user)}
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
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
                colSpan="5"
                className="py-6 px-6 text-center text-gray-400 font-medium"
              >
                No users found. Try adjusting the filters or adding new users.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  


  );
};

export default UserTable;
