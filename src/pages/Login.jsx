  import React, { useState, useEffect } from 'react';
  import { useForm } from "react-hook-form";
  import { Button } from '@mui/material';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { setUser } from '../store/slice';
  import {IconButton} from '@mui/material';
  import { Visibility, VisibilityOff } from '@mui/icons-material';


  const Login = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [succesMessage, setSucessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword , setShowPassword] =useState('false');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
      try {
        
        const response = await axios.post('http://192.168.68.117:8000/api/login',{
          email:data.email,
          password:data.password
        }); 
        
        console.log('all users',response.data);
        
        if (response.data && response.data.user) {
          const user = response.data.user;
    
        
          setSucessMessage('Login successful');

        
          dispatch(setUser(user));

          reset();
          navigate('/dashboard')
        } else {
          
          setErrorMessage("Login failed. Invalid email or password.");
        }
      } catch (error) {
        setErrorMessage("An error occurred. Please try again.");
        console.error("Login failed:", error.response ? error.response.data : error.message);
      }
    }
    const togglePasswordVisibility = () => {
      setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleReset = () =>{
      navigate('/ResetPassword')
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
        <h1 className="text-lg font-bold">Login </h1>
        {succesMessage && (<p className='text-green-00 mb-4'>{succesMessage}</p>)}
        {errorMessage && (<p className='text-red-500 mb-4'>{errorMessage}</p>)}
        <form onSubmit={handleSubmit(onSubmit)} className='w-80'>
          <div className="mb-4 mt-6 ">
            {/* <label>Email:</label> */}
            <input placeholder='User Email'
              {...register("email", {
                required: "Email is required",
                
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email",
                }
              })}
              className='border-2 border-gray-400 rounded-lg w-full p-2'
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4 pt-2">
            {/* <label>Password:</label> */}
            <input placeholder='Password'
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
              type="password"
              className='border-2 border-gray-400 rounded-lg w-full p-2'
            />
            {/* <IconButton
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton> */}
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
           <div className='text-xs flex justify-center pb-5 cursor-pointer' onClick={handleReset}>Forgot Password</div>
          <Button type="submit" variant='outlined' className="w-full mt-4">
            Login
          </Button>
          <div className='text-xs flex justify-center mt-2'>Don't have an account?  <button className='text-xs pl-3' onClick={(navigate('/register'))}><strong>Register</strong></button></div>
        </form>
      </div>
    );
  }

  export default Login;
