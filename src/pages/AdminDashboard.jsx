import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [view, setView] = useState("viewUser");
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrashClick = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get('http://192.168.68.117:8000/api/dashboard/trashlist');
      setDeletedUsers(response.data);
      setView("trashUser");
    } catch (error) {
      console.error("Error fetching deleted users:", error);
      setError("Failed to load deleted users. Showing default data.");
      setDeletedUsers([
        { id: 1, name: "John Doe (Deleted)", email: "john@example.com" },
        { id: 2, name: "Jane Doe (Deleted)", email: "jane@example.com" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserClick = () => {
    setView("addUser");
  };

  const handleViewUserClick = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get('http://192.168.68.117:8000/api/dashboard/existinguser');
      setUsers(response.data);
      setView("viewUser");
    } catch (error) {
      console.error("Error fetching current users:", error);
      setError("Failed to load current users. Showing default data.");
      setUsers([
        { id: 1, name: "Alice Smith", email: "alice@example.com" },
        { id: 2, name: "Bob Brown", email: "bob@example.com" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center p-4 pt-[110px]'>
      <p>Admin Dashboard</p>
      <div className='flex gap-4 text-white mb-6'>
        <Button variant='contained' onClick={handleTrashClick}>Trash User</Button>
        <Button variant='contained' onClick={handleAddUserClick}>Add User</Button>
        <Button variant='contained' onClick={handleViewUserClick}>View Users</Button>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <div className='mt-8'>
          {error && <p className="text-red-500">{error}</p>}
          {view === "trashUser" && (
            <div>
              <h3>Deleted Users</h3>
              <ul>
                {deletedUsers.length > 0 ? (
                  deletedUsers.map(user => (
                    <li key={user.id}>
                      {user.name} - {user.email}
                      <button className="ml-4 text-blue-500" onClick={() => handleRestoreUser(user.id)}>Restore</button>
                      <button className="ml-2 text-red-500" onClick={() => handleDeletePermanently(user.id)}>Delete Permanently</button>
                    </li>
                  ))
                ) : (
                  <p>No deleted users to display.</p>
                )}
              </ul>
            </div>
          )}
          {view === "addUser" && (
            <div>
              <h3>Add User</h3>
              {/* Add User Form Component or Form Fields */}
            </div>
          )}
          {view === "viewUser" && (
            <div>
              <h3>Current Users</h3>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map(user => (
                      <tr key={user.id}>
                        <td className="py-2 px-4 border">{user.name}</td>
                        <td className="py-2 px-4 border">{user.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-2 px-4 border" colSpan="2">No current users to display.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
