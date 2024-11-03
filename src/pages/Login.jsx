import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Button } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const { register, reset, formState: { errors }, handleSubmit } = useForm();
  const [succesMessage, setSucessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      
      const response = await axios.get('https://672779ae270bd0b975529666.mockapi.io/users'); 
      
      console.log('all users',response.data);
      
      const user = response.data.find(user => user.email === data.email && user.password === data.password);

      if (user) {
       
        setSucessMessage('Login successful');
        reset();
      } else {
        
        setErrorMessage("Login failed. Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login failed:", error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSucessMessage("");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [succesMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [errorMessage]);

  return (
    <div className='flex flex-col items-center p-4 pt-[150px]'>
      <h1 className="text-lg font-bold">Login Page</h1>
      {succesMessage && (<p className='text-green-500 mb-4'>{succesMessage}</p>)}
      {errorMessage && (<p className='text-red-500 mb-4'>{errorMessage}</p>)}
      <form onSubmit={handleSubmit(onSubmit)} className='w-80'>
        <div className="mb-4">
          <label>Email:</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email"
              }
            })}
            className='border-2 border-gray-400 rounded-lg w-full p-2'
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label>Password:</label>
          <input
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
            type="password"
            className='border-2 border-gray-400 rounded-lg w-full p-2'
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <Button type="submit" variant='outlined' className="w-full mt-4">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
