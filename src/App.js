import { useEffect, useState } from 'react';
import UserTable from './components/UserTable';
import UserFormModal from './components/UserFormModal';
import RoleTable from './components/RoleTable';
import RoleFormModal from './components/RoleFormModal';
import PermissionManager from './components/PermissionManager';
import { mockUsers, mockRoles } from './data';
import './App.css'

function App() {
  const [users, setUsers] = useState(mockUsers);
  const [roles, setRoles] = useState(mockRoles);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);

  // Track current active section (Dashboard navigation)
  const [activeSection, setActiveSection] = useState('Users');

  function handleDelete(id) {
    setUsers(users.filter((user) => user.id !== id));
  }
  function handleRoleDelete(id) {
    setRoles(roles.filter((role) => role.id !== id));
  }

  function handleAddRole() {
    setCurrentRole(null);
    setOpenRoleModal(true);
  }

  function handleAddUser() {
    setCurrentUser(null);
    setOpenModal(true);
  }

  function handleEdit(user) {
    setCurrentUser(user);
    setOpenModal(true);
  }

  function handleSavePermissions(updatedRole) {
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)));
  }

  function handleRoleEdit(role) {
    setCurrentRole(role);
    setOpenRoleModal(true);
  }

  function handleRoleSave(role) {
    if (role.id) {
      setRoles(roles.map((r) => (role.id === r.id ? role : r)));
    } else {
      setRoles([...roles, { ...role, id: roles.length + 1 }]);
    }
  }

  function handleSave(user) {
    if (user.id) {
      setUsers(users.map((u) => (user.id === u.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
  }

  useEffect(() => {
    console.log(users);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Sidebar */}
      <div className="w-1/5 p-6 text-white glass bg-opacity-10">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary text-gradient bg-clip-text">
          Dashboard
        </h1>
        <nav>
          <ul>
            <li
              className={`p-4 mb-4 cursor-pointer rounded-lg hover:bg-opacity-30 hover:shadow-lg ${
                activeSection === 'Users' ? ' bg-gray-600/75 bg-opacity-20 shadow-inner' : ''
              }`}
              onClick={() => setActiveSection('Users')}
            >
              Users
            </li>
            <li
              className={`p-4 mb-4 cursor-pointer rounded-lg hover:bg-opacity-30 hover:shadow-lg ${
                activeSection === 'Roles' ? 'bg-gray-600/75 bg-opacity-20 shadow-inner' : ''
              }`}
              onClick={() => setActiveSection('Roles')}
            >
              Roles
            </li>
            <li
              className={`p-4 mb-4 cursor-pointer rounded-lg hover:bg-opacity-30 hover:shadow-lg ${
                activeSection === 'Permissions' ? 'bg-gray-600/75 bg-opacity-20 shadow-inner' : ''
              }`}
              onClick={() => setActiveSection('Permissions')}
            >
              Permissions
            </li>
          </ul>
        </nav>
      </div>
  
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="glass p-8 rounded-xl shadow-lg">
          {activeSection === 'Users' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gradient">
                  User Management
                </h2>
                <button
                  onClick={handleAddUser}
                  className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md"
                >
                  Add User
                </button>
              </div>
              <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <UserFormModal
                user={currentUser}
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSave={handleSave}
                roles={roles}
              />
            </>
          )}
  
          {activeSection === 'Roles' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gradient">
                  Role Management
                </h2>
                <button
                  onClick={handleAddRole}
                  className="px-6 py-2 rounded-lg text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-md"
                >
                  Add Role
                </button>
              </div>
              <RoleTable roles={roles} onEdit={handleRoleEdit} onDelete={handleRoleDelete} />
              <RoleFormModal
                open={openRoleModal}
                onClose={() => setOpenRoleModal(false)}
                role={currentRole}
                onSave={handleRoleSave}
                
              />
            </>
          )}
  
          {activeSection === 'Permissions' && (
            <>
              <h2 className="text-2xl font-semibold text-gradient mb-4">
                Permission Management
              </h2>
              <PermissionManager
                roles={roles}
                onSavePermissions={handleSavePermissions}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default App;
