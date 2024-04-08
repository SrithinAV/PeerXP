import React from 'react';
import '../styles/ConfirmationDialogDelete.css';


const ConfirmationDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className='backdrop-delete'>
    <div className="dialog-delete">
      <p>Are you sure you want to delete this expense?</p>
      <button className="yes-delete" onClick={onConfirm}>Yes, delete</button>
      <button className="cancel-button-delete" onClick={onCancel}>No</button>
    </div>
    </div>
  );
};

export default ConfirmationDialog;
