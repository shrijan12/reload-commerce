import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const { user, signup } = useContext(AuthContext);
  const [mode, setMode] = useState("signup");

  //setting up the react hook form here
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    signup(data.email, data.password);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {user && <p>User logged in is {user.email}</p>}
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Log In"}
          </h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should be least 6 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Log In"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account ?{" "}
                <span className="auth-link" onClick={() => setMode("login")}>
                  {" "}
                  Log In
                </span>{" "}
              </p>
            ) : (
              <p>
                Dont have an account yet ?{" "}
                <span className="auth-link" onClick={() => setMode("signup")}>
                  {" "}
                  Sign Up
                </span>{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
