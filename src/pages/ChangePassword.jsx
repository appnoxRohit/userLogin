import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state)=>state.auth.user.token)

    const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        console.log('data sent' , data)
      try {
        const response = await axios.post(
          `http://192.168.68.117:8000/api/user/update-password`,
         data,
         {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
          
        );
        console.log("Response:", response);
        navigate("/dashboard");
      } catch (error) {
        console.error(
          "Login failed:",
          error.response ? error.response.data : error.message
        );
      }
    };

    return (
      <div>
        <div className="flex flex-col text-[#66FCF2] items-center p-4 pt-[150px]">
          <form onSubmit={handleSubmit(onSubmit)} className=" text-[#66FCF2] w-80">
            <div className="mb-4">
              <label>Old Password</label>
              <input
                {...register("password", {
                  required: "Old password is required",
                })}
                type="password"
                className="border-2 border-gray-400 rounded-lg w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label>New Password</label>
              <input
                {...register("new_password", {
                  required: "New password is required",
                })}
                type="password"
                className="border-2 border-gray-400 rounded-lg w-full p-2"
              />
            </div>

            <div className="mb-4">
              <label>Confirm New Password</label>
              <input
                {...register("new_password_confirmation", {
                  required: "Password confirmation is required",
                })}
                type="password"
                className="border-2 border-gray-400 rounded-lg w-full p-2"
              />
            </div>

            <Button type="submit" variant='outlined' className="w-full mt-4">
              Update
            </Button>
          </form>
        </div>
      </div>
    );
};

export default ChangePassword;
