import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { menuItems } from "../constants/Keys";
import navImage from '../../assets/images/TMDB.svg'


const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  return (
    <nav className="text-white bg-[#19596d]">
      <div className="container mx-auto px-4 flex justify-between items-center relative">
        <Link to={'/'} className="text-3xl font-bold text-center text-[#9fdaec]">
          <img src={navImage} alt="MV" className="w-[200px] h-[30px]"/>
        </Link>
        <div className="flex space-x-6 justify-center items-center">
          {menuItems.map(({ title, links }) => (
            <div
              key={title}
              className="relative"
              onMouseEnter={() => setActiveDropdown(title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="font-semibold text-white cursor-pointer hover:text-gray-300">
                {title}
              </div>
              {activeDropdown === title && (
                <div className="absolute left-0 bg-white text-black shadow-lg rounded-lg w-36 py-2">
                  {links.map(({ name, path }) => (
                    <NavLink
                      key={name}
                      to={path}
                      className="text-sm block px-4 py-1 hover:bg-gray-200"
                    >
                      {name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="hover:text-gray-300">
            Login
          </NavLink>
          <NavLink to="/movie" className="hover:text-gray-300">
            Join VMDB
          </NavLink>
        </div> */}

      </div>
    </nav>
  );
};

export default Navbar;
