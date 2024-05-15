import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { setAuthToken } from "./features/authSlice";
import SignUp from "./components/Signup";
import Winners from "./components/Winners";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const token = window.localStorage.getItem("YAMS:authToken");

    if (token) {
      dispatch(setAuthToken(token));
    }
  }, []);

  const handleLogin = (token: string) => {
    dispatch(setAuthToken(token));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
             <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          // element={<Dashboard />}
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
        <Route path="/results" element={<Winners />} />
      </Routes>
    </Router>
  );
};

export default App;
