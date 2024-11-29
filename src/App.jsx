import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import EditUserForm from './components/EditUserForm'; 

function App() {
  const [users, setUsers] = useState([]);

  // Fetch users on load
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch(() => alert('Error fetching users.'));
  }, []);

  // Handle deleting a user
  const handleDeleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      })
      .catch(() => alert('Error deleting user.'));
  };

  // Handle saving a user (whether adding or editing)
  const handleSaveUser = (user) => {
    setUsers((prev) => {
      const existingUserIndex = prev.findIndex((u) => u.id === user.id);
      if (existingUserIndex >= 0) {
        return prev.map((u) => (u.id === user.id ? user : u));
      } else {
        return [...prev, user];
      }
    });
  };

  return (
    <Router>
      <div className="container">
        <header>
          <h1>User Management</h1>
          <nav>
            <Link to="/users">View Users</Link>
            <Link to="/users/add">Add User</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/users"
              element={<UserList users={users} onDelete={handleDeleteUser} />}
            />
            <Route
              path="/users/add"
              element={<UserForm onSave={handleSaveUser} />}
            />
            <Route
              path="/users/edit/:id"
              element={<EditUserForm users={users} onSave={handleSaveUser} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
