import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Reload
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>
        </div>
        <div className="navbar-auth">
          <div className="navbar-auth-links">
            {user ? (
              <>
                <p>Welcome {user.email}</p>
                <button className="btn btn-secondary" onClick={() => logout()}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/auth" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
