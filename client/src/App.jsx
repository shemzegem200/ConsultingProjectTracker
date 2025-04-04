import "./App.css";
import Layout from "./clients/Layout.jsx";
import ProfilePage from "./clients/ProfilePage.jsx";
import SearchPage from "./clients/SearchPage.jsx";
import AddProjectPage from "./clients/AddProjectPage.jsx";
import FormDetails from "./components/FormDetails.jsx";
import Login from "./components/Login.jsx";
import { Routes, Route, Router } from "react-router-dom";
import DashboardPage from "./clients/DashboardPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/client" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="add-project" element={<AddProjectPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="/admin" element={<FormDetails />} />
      </Routes>
    </>
  );
}

export default App;
