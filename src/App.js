import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import Project from "./pages/project/Project";
import Sidebar from "./components/Sidebar";
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
