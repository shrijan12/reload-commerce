import React from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext"; // Importing the useAuth hook from AuthContext

const Navbar = () => {
  const { user, logout } = useAuth(); // Accessing the user and logout function from AuthContext
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
              <div className="navbar-user">
                <span className="navbar-greeting">Hello {user.email}</span>
                <button className="btn btn-secondary" onClick={() => logout()}>
                  Logout
                </button>
              </div>
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
