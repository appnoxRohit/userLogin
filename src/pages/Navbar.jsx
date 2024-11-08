import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button  } from "@mui/material";
import { logout } from "../store/slice";
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear token and user data
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev); // Toggle profile dropdown visibility
  };
  const handleHome =()=>{
    navigate('/')
  }


  return (
    <nav>
      <div className="flex fixed text-[#274888] top-0 w-full bg-[#e2e4e6] z-50 h-20 border-2 border-black">
        <ul className="flex items-center w-full">
          <li onClick={handleHome}  className="text-lg cursor-pointer pl-3">
            <strong>Logo</strong>
          </li>
          <div className="flex flex-row justify-end gap-5 ml-auto">
            {!token ? (
              <div className="flex gap-4">
                <li>
                  <NavLink
                    to="/Login"
                    className={({ isActive }) =>
                      `hover:text-blue-600 ${isActive ? "font-bold" : ""}`
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Register"
                    className={({ isActive }) =>
                      `hover:text-blue-600 ${isActive ? "font-bold" : ""}`
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </div>
            ) : (
              <>
                <Button
                  className="font-bold text-black"
                  onClick={toggleProfileDropdown}
                  
                >
                 <AccountCircleIcon className="text-white cursor-pointer" fontSize="large" />
                </Button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-12 bg-white shadow-md rounded-lg w-48 text-black">
                    <ul className="p-2">
                      <li className="py-2 px-4 hover:bg-gray-200 rounded-full cursor-pointer">
                        <NavLink to="/editUser">Edit User</NavLink>
                      </li>
                      <li className="py-2 px-4 hover:bg-gray-200 rounded-full cursor-pointer">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                      </li>
                      <li className="hover:bg-red-300 rounded-full cursor-pointer py-2 px-4 ">
                        <NavLink to="/" onClick ={()=>{handleLogout(); setShowProfileDropdown(false);}} >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
