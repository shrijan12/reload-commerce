import { createContext, useState } from "react";

export const AuthContext = createContext(); //here we are creatinng a context for authentications

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUser")
      ? { email: localStorage.getItem("currentUser") }
      : null,
  ); //here we are creating a state for user and setting it to null initially

  //function for signup
  function signup(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((user) => user.email === email)) {
      console.log("User already exists");
      return {
        success: false,
        error: "Email already exists",
      };
    }
    const newUser = { email, password };
    console.log(newUser);
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);

    setUser({ email });
    return { success: true };
  }

  //function for login
  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user) => {
      return user.email === email && user.password === password;
    });
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }
    localStorage.setItem("currentUser", email);
    setUser({ email });
    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signup, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}
