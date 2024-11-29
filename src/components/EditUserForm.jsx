import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from './UserForm'; // Re-use UserForm for editing

function EditUserForm({ users, onSave }) {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate();

  // Find the user by id
  const user = users.find((user) => user.id === parseInt(id));

  // If user not found, show a message
  if (!user) {
    return <p>User not found</p>;
  }

  // Pass the found user to the UserForm for editing
  return (
    <UserForm
      user={user} // Pass the user data to the form for editing
      onSave={onSave}
      onCancel={() => navigate('/users')} // Cancel and navigate back to the user list
    />
  );
}

export default EditUserForm;
