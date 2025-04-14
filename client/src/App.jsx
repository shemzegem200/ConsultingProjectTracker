import "./App.css";
import { createContext, useState, useEffect} from "react";
import Layout from "./clients/Layout.jsx";
import ProfilePage from "./clients/ProfilePage.jsx";
import SearchPage from "./clients/SearchPage.jsx";
import AddProjectPage from "./clients/AddProjectPage.jsx";
import FormDetails from "./components/FormDetails.jsx";
import Login from "./components/Login.jsx";
import { Routes, Route, Router } from "react-router-dom";
import DashboardPage from "./clients/DashboardPage.jsx";
import ViewProjectPage from "./clients/ViewProjectPage.jsx";
import MyProjectsPage from "./clients/MyProjectsPage.jsx";
import UpdateProjectPage from "./clients/UpdateProjectPage.jsx";
import DeleteProjectPage from "./clients/DeleteProjectPage.jsx";


export const UserContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = localStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : '';
  });
  const [projects, setProjects] = useState(() => {
    const projs = localStorage.getItem("projects");
    return projs ? JSON.parse(projs) : [];
  });

  //whenever userInfo changes, update the localStorage
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("userInfo");
    }
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) setProjects(JSON.parse(storedProjects));
  }, [userInfo]);

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


  return (
    <>
    <UserContext.Provider value={{userInfo, setUserInfo, projects, setProjects}}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/client" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="add-project" element={<AddProjectPage />} />
          <Route path="update-project" element={<UpdateProjectPage />} />
          <Route path="delete-project" element={<DeleteProjectPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="my-projects" element={<MyProjectsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="project-page/:id" element={<ViewProjectPage />} />
        </Route>

        <Route path="/admin" element={<FormDetails />} />
      </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
