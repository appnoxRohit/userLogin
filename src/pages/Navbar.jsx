import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="flex fixed text-[#66FCF2] top-0 w-full bg-[#1e1e1e] z-50 h-20 border-2 border-black">
        <ul className="flex items-center w-full">
          <li className="text-lg  pl-3"><strong>Logo</strong></li>
          <div className="flex flex-row justify-end gap-5 ml-auto">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) =>
                  ` hover:text-blue-600 ${isActive ? "font-bold" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Login" 
                className={({ isActive }) =>
                  ` hover:text-blue-600 ${isActive ? "font-bold" : ""}`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Register" 
                className={({ isActive }) =>
                  ` hover:text-blue-600 ${isActive ? "font-bold" : ""}`
                }
              >
                Register
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
