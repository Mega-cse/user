import React from 'react';
import { Link } from 'react-router-dom';
import UserActions from './UserActions'; // Assuming UserActions is a custom component for user actions

const UserList = ({ users, onDelete }) => {
  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(' ')[0]}</td>
              <td>{user.name.split(' ')[1]}</td>
              <td>{user.email}</td>
              <td>{user.department || 'General'}</td>
              <td>
                <UserActions user={user} onDelete={onDelete} />
                <Link to={`/users/edit/${user.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
