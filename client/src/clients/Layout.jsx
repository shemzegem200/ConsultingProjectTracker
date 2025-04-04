import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt, FaSearch, FaSyncAlt, FaProjectDiagram, FaClipboardList  } from "react-icons/fa";
import "./Layout.css";


const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="dashboard">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <FaBars />
        </button>
        <ul>
          <Link to="/client">
            <li>
              <FaHome className="icon" /> {isOpen && "Dashboard"}
            </li>
          </Link>
          <Link to="/client/add-project">
            <li>
            <FaClipboardList   className="icon" /> {isOpen && "Add New Project"}
            </li>
          </Link>
          <Link to="/client/search">
            <li>
            <FaSearch className="icon" /> {isOpen && "Search"}
            </li>
          </Link>
          <Link to="/client/profile">
            <li>
            <FaUser className="icon" /> {isOpen && "Profile"}
            </li>
          </Link>
          
          <li className="logout">
            <FaSignOutAlt className="icon" /> {isOpen && "Logout"}
          </li>
        </ul>
      </div>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
