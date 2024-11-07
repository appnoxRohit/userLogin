import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Register = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [succesMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(
        "http://192.168.68.117:8000/api/register",
        {
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          password: data.password,
          password_confirmation: data.password_confirmation,
        }
      );
      if (response.status === 200) {
        setSucessMessage("User registeredd sucessfully ! ");
        reset();
      }
    } catch (error) {
      console.error("Registration failed:", error);
      console.error("Registration failed:", error.response.data);

      setErrorMessage("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    let timer;
    if (succesMessage) {
      timer = setTimeout(() => {
        setSucessMessage("");
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [succesMessage]);

  return (
    <div className="flex flex-col items-center p-4 pt-[150px]">
      <h1 className="text-lg text-[#66FCF2] font-bold">Register Page</h1>

      {succesMessage && <p className="text-green-500 mb-4">{succesMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className=" text-[#66FCF2] w-80">
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

        {/* Password Field */}
        <div className="mb-4">
          <label>Password:</label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
            className="border-2 border-gray-400 rounded-lg w-full p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label>Confirm Password:</label>
          <input
            {...register("password_confirmation", {
              required: "Confirm Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
            className="border-2 border-gray-400 rounded-lg w-full p-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="outlined"
          className="w-full bg-[#F7B535] mt-4"
        >
          Register
        </Button>
        <div className="text-xs flex justify-center mt-3">
          Already have an account?
          <NavLink
            to="/Login"
            className={({ isActive }) =>
              ` pl-3 text-white font-bold hover:text-[#66FCF2] ${
                isActive ? "font-bold" : ""
              }`
            }
          >
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
