import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Create from "./pages/create/Create";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import Project from "./pages/project/Project";
import Sidebar from "./components/Sidebar";
import Signup from "./pages/signup/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Routes>
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
              <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
