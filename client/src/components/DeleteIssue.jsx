import React, { use } from 'react';
import axios from 'axios';
import '../styles/deleteIssue.css';
import { useParams } from 'react-router-dom';

function DeleteIssue({ onDelete }) {
    const id = useParams().id;
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/issue/${id}`,{
        withCredentials:true
      });
      onDelete(id);
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  return (
    <button className="delete-issue-btn" onClick={handleDelete}>
      <i className="fi fi-rr-trash"></i>
    </button>
  );
}

export default DeleteIssue;