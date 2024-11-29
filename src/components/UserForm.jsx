import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests

const UserForm = ({ user = {}, onSave, onCancel }) => {
  const navigate = useNavigate();

  // Initialize form data (either new user or existing user data)
  const [formData, setFormData] = useState({
    id: user.id || null,
    name: user.name || '',  // First name field (Ensure this is mapped correctly)
    lastName: user.lastName || '',  // Last name field
    email: user.email || '',
    department: user.department || '',  // Default to "" if no department
  });

  // Use effect to handle when 'user' prop changes (e.g. for editing)
  useEffect(() => {
    if (user.id) {
      setFormData({
        id: user.id,
        name: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        department: user.department || '',
      });
    }
  }, [user]);  // This will run whenever the user prop changes (for example, on edit)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (both add and edit)
  const handleSubmit = (e) => {
    e.preventDefault();

    // If editing an existing user
    if (formData.id) {
      onSave(formData);  // Save the changes
      navigate('/users');  // Redirect to the users list
    } else {
      // If it's a new user, generate a new ID and save the new user
      const newUser = {
        ...formData,
        id: Date.now(),  // Generate a unique ID based on the current timestamp
      };

      // API request to save the new user
      axios
        .post('https://jsonplaceholder.typicode.com/users', newUser)
        .then((response) => {
          console.log('User added:', response.data);
          onSave(response.data);  // Call the onSave callback to update the user list
          navigate('/users');  // Redirect to the users list
        })
        .catch((error) => {
          console.error('Error adding user: ', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{formData.id ? 'Edit User' : 'Add User'}</h2>

      <div className="form-field">
        <label>First Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}  // Using formData for initial value
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}  // Using formData for initial value
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}  // Using formData for initial value
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={formData.department}  // Using formData for initial value
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" onClick={() => onCancel()}>Cancel</button>
      </div>
    </form>
  );
};

export default UserForm;
