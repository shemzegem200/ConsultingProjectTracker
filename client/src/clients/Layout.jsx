import React, { useState, useContext, useEffect } from "react";
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import {FaBriefcase , FaTasks, FaBars, FaHome, FaUser, FaCog, FaSignOutAlt, FaSearch, FaSyncAlt, FaEdit, FaTrash, FaProjectDiagram, FaClipboardList  } from "react-icons/fa";
import "./Layout.css";
import { UserContext } from "../App.jsx";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const {userInfo, setUserInfo, projects, setProjects} = useContext(UserContext);

  useEffect(() => {
    const fetchAndUpdateProjects = async () => {
      try {
        const response = await fetch("http://localhost:4000/prefetch-project-info");
        const data = await response.json();
        setProjects(data);
        localStorage.setItem("projects", JSON.stringify(data));
      } catch (err) {
        console.error("Background refresh failed:", err);
      }
    };

    const interval = setInterval(fetchAndUpdateProjects, 1000 * 60 * 5); // every 5 minutes
    fetchAndUpdateProjects(); // Initial load too

    return () => clearInterval(interval);
  }, [setProjects]);
  
  useEffect(()=>{
    if (!userInfo || !userInfo.username || !userInfo.role) {
      navigate('/', { replace: true });
    }
  }, [userInfo, navigate]);

  useEffect(()=>{
    console.log('userInfo is', userInfo);
    if (
      userInfo &&
      userInfo.username &&
      userInfo.role &&
      (
        (userInfo.role === 'user' &&
          (!userInfo.name || !userInfo.github || !userInfo.linkedin || !userInfo.projects)) ||
        (userInfo.role === 'supervisor' &&
          (!userInfo.name || !userInfo.projects))
      )
    ) {
      //fetch details from the server
      fetch("http://localhost:4000/get-user-info", {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({username: userInfo.username, role: userInfo.role})
      }).then(response=>{
        if (!response.ok) throw new Error("Network Error when attempting to fetch resource");
        else return response.json();
      }).then(res=>{
        setUserInfo(res.user);
        localStorage.setItem("userInfo", JSON.stringify(res.user));
      }).catch(err=>{
        console.log(err.message);
      });
    }
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:4000/get-user-info", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: userInfo.username, role: userInfo.role })
        });
  
        if (!response.ok) throw new Error("Network error while fetching user info");
  
        const res = await response.json();
        setUserInfo(res.user);
        localStorage.setItem("userInfo", JSON.stringify(res.user));
      } catch (err) {
        console.error("Fetch user info failed:", err.message);
      }
    };
  
    // Fetch immediately on mount
    fetchUserDetails();
  
    // Set interval to fetch every 5 mins
    const intervalId = setInterval(fetchUserDetails, 1000 * 60 * 5);
  
    // Cleanup
    return () => clearInterval(intervalId);
  }, [userInfo.username, userInfo.role]);
  


  if (!userInfo || !userInfo.username || !userInfo.role) {
    return <Navigate to="/" replace />;
  }

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
          {/* create new project */}
          {userInfo && userInfo.role==='user' && <Link to="/client/add-project">
            <li>
            <FaClipboardList   className="icon" /> {isOpen && "Add New Project"}
            </li>
          </Link>}
          {/* update existing project */}
          {userInfo && userInfo.role==='user' && <Link to="/client/update-project">
            <li>
            <FaEdit className="icon" /> {isOpen && "Update Project"}
            </li>
          </Link>}
          {/* delete a project */}
          {userInfo && userInfo.role==='user' && <Link to="/client/delete-project">
            <li>
            <FaTrash className="icon" /> {isOpen && "Delete Project"}
            </li>
          </Link>}
          <Link to="/client/search">
            <li>
            <FaSearch className="icon" /> {isOpen && "Search"}
            </li>
          </Link>
          <Link to="/client/my-projects">
            <li>
            <FaBriefcase className="icon" /> {isOpen && "My Projects"}
            </li>
          </Link>
          <Link to="/client/profile">
            <li>
            <FaUser className="icon" /> {isOpen && "Profile"}
            </li>
          </Link>
          
          <li className="logout" onClick={() => {
            setUserInfo('');
            localStorage.removeItem("userInfo");
            navigate('/');
          }}>
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
