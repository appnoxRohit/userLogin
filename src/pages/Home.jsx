import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const {user , loginWithRedirect , isAuthenticated ,error , logout: authLogout } = useAuth0();
  return (
    <div className='pt-20   '>

      <div className='flex justify-end' >{isAuthenticated?<NavLink to="/login" onClick={() => authLogout({ logoutParams: { returnTo: window.location.origin } })}>Logout</NavLink>:''}
      </div>
      <div className='h-[600px] flex justify-center items-center' >
      <h1 className='text-2xl flex '>HOME PAGE</h1>
      </div>
      

     
 
 

    </div>
  )
}

export default Home