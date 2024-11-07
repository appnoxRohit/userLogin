// src/components/Dashboard.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
 
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

 
  if (!isAuthenticated || !user) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="flex flex-col items-center p-4 pt-[150px]">
      <h1 className="text-2xl font-bold">Welcome, {user.fname}!</h1>
      <p className="text-lg">Email: {user.email}</p>
      <button 
        onClick={() => dispatch(logout())}
        className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
