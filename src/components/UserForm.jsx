import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests

const UserForm = ({ user = {}, onSave, users }) => {
  const navigate = useNavigate();

  // Initialize form data (either new user or existing user data)
  const [formData, setFormData] = useState({
    id: user.id || null,
    name: user.name || '',  // First name field (Ensure this is mapped correctly)
    // lastName: user.lastName || '',  // Last name field
    email: user.email || '',
    department: user.department || '',  // Default to "" if no department
  });

  // Use effect to handle when 'user' prop changes (e.g. for editing)
  useEffect(() => {
    if (user.id) {
      setFormData({
        id: user.id,
        name: user.name || '',
        //lastName: user.lastName || '',
        email: user.email || '',
        department: user.department || 'General',
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
  
    // Prepare the user data for the new user (no need for id generation)
    const newUser = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      department: formData.department,
    };

    // If editing an existing user, save the changes directly
    if (formData.id) {
      onSave(formData);  // Save the changes
      navigate('/users');  // Redirect to the users list
    } else {
      // If it's a new user, generate a new ID based on the existing users list
      const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

      const newUserWithId = { ...newUser, id: newId };

      // Simulate adding the new user with the generated ID
      onSave(newUserWithId);  // Call onSave callback to update the user list
      navigate('/users');  // Redirect to the users list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>{formData.id ? 'Edit User' : 'Add User'}</h2>

      <div className="form-field">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}  // Using formData for initial value
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
      </div>
    </form>
  );
};

export default UserForm;
