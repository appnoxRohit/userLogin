import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@mui/material";
import { editUser } from "../store/slice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const userId = useSelector((state) => state.auth.user.user_id);
  const token = useSelector((state) => state.auth.token);

  console.log(userId);
  console.log('token' , token);
  
  const onSubmit = async (data) => {
    if (data.dob) {
      data.dob = new Date(data.dob).toISOString().split("T")[0];
    }
    try {
      const response = await axios.put(
        `http://192.168.68.117:8000/api/user/profile/${userId}`,
        {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          dob: data.dob,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Dispatch both user and token to Redux
      dispatch(editUser(response));

      
      navigate("/dashboard");
      console.log(response.data.user);

    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

 
  return (
    <div>
      <div className="flex flex-col text-[#66FCF2] items-center p-4 pt-[150px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" text-[#66FCF2] w-80"
        >
          {/* First Name Field */}
          <div className="mb-4">
            <label>First Name:</label>
            <input
              {...register("fname", {
                required: "First name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              type="text"
              className="border-2 border-gray-400 rounded-lg w-full p-2"
            />
            {errors.fname && (
              <p className="text-red-500 text-sm">{errors.fname.message}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="mb-4">
            <label>Last Name:</label>
            <input
              {...register("lname", {
                required: "Last name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              type="text"
              className="border-2 border-gray-400 rounded-lg w-full p-2"
            />
            {errors.lname && (
              <p className="text-red-500 text-sm">{errors.lname.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label>Email:</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email",
                },
              })}
              className="border-2 border-gray-400 rounded-lg w-full p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label>Date of Birth:</label>
            <input
              type="date" // Ensures a date picker is shown
              {...register("dob", {
                required: "Date of birth is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  if (selectedDate >= today) {
                    return "Date of birth cannot be in the future";
                  }
                  return true;
                },
              })}
              className="border-2 border-gray-400 rounded-lg w-full p-2"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>
          <Button type="submit" variant="outlined" className="w-full mt-4">
            Edit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
