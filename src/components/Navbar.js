import "./Navbar.css";

import Logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="logo" />
          <span>ManageIt</span>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
