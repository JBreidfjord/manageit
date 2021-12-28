import "./Navbar.css";

import Logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="logo" />
          <NavLink to="/">
            <span>ManageIt</span>
          </NavLink>
        </li>
        {user ? (
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
