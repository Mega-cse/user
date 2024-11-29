import React from 'react';

const UserActions = ({ user, onEdit, onDelete }) => {
  return (
    <div>
      {/* <button onClick={() => onEdit(user.id)}>Edit</button> */}
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
};

export default UserActions;
