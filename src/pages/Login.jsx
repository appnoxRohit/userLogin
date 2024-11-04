  import React, { useState, useEffect } from 'react';
  import { useForm } from "react-hook-form";
  import { Button } from '@mui/material';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch } from 'react-redux';
  import { logout, setUser } from '../store/slice';
  import { useAuth0 } from '@auth0/auth0-react';
  import GoogleIcon from '@mui/icons-material/Google';
  import { NavLink } from 'react-router-dom';

  const Login = () => {
    
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [succesMessage, setSucessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const {user , loginWithRedirect , isAuthenticated ,error , logout: authLogout } = useAuth0();
 
 
    console.log('auth',isAuthenticated)

    
    
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
    const handleLogout = () =>{

    };
    const togglePasswordVisibility = () => {
      setShowPassword(prevShowPassword => !prevShowPassword);
    };

   
    // const handleReset = () =>{
    //   navigate('/ResetPassword')
    // }
    


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

      {isAuthenticated ? (
        <Button  onClick={() => authLogout({ logoutParams: { returnTo: window.location.origin } })}>Logout</Button>
      ) : (
        <Button className='font-bold text-black' onClick={() => loginWithRedirect()}>Google</Button>
      )}

        <h1 className="text-mg font-bold">or </h1>

        <h1 className="text-mg font-bold">Login </h1>
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
              onClick={togglewhen PasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton> */}
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
           <div className='text-xs flex justify-center pb-5 cursor-pointer' ><NavLink 
                to="/ResetPassword" 
                className={({ isActive }) =>
                  `text-black pl-3 font hover:text-blue-600 ${isActive ? "font-bold" : ""}`
                }
              >
                Forgot password
              </NavLink></div>
          <Button type="submit" variant='outlined' className="w-full mt-4">
            Login
          </Button>
          <div className='text-xs flex justify-center mt-2'>Don't have an account? <NavLink 
                to="/Register" 
                className={({ isActive }) =>
                  `text-black pl-3 font-bold hover:text-blue-600 ${isActive ? "font-bold" : ""}`
                }
              >
                Register
              </NavLink></div>
        </form>
      </div>
    );
  }

  export default Login;
