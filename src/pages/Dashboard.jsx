// src/components/Dashboard.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleNav =()=>{

    navigate("/ChangePassword");
  }
  const handleEdit = () =>{
    navigate("/editUser")
  }

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated || !user) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <div className="flex font-dm-serif pl-9 flex-col text-white  justify-center p-4 pt-[150px]">
      <div className=" flex flex-col">
        <h1 className="text-2xl text-[#66FCF2] font-dm-serif  font-bold">
          Welcome , {user.fname}!
        </h1>
        <br />

        <p className="text-xl font-inter pt-1">First Name: {user.fname}</p>
        <p className="text-xl font-inter pt-1">Last Name: {user.lname}</p>
        <p className="text-xl font-inter pt-1">Email: {user.email}</p>
        <div className=" flex mt-4 gap-3 ">
          <Button variant="contained" onClick={handleEdit}> Edit User </Button>
          <Button variant="contained" onClick={handleNav}>
            {" "}
            change Password
          </Button>
        </div>
      </div>

      {/* <button 
        onClick={() => dispatch(logout())}
        className="mt-[40px] p-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Logout
      </button> */}
    </div>
  );
};

export default Dashboard;
