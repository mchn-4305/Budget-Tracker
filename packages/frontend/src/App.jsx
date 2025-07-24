import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Budgets from "./pages/Budgets"

const App = () => {
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<PrivateRoute element={<Home />} />} />

        <Route path="/budgets" element={<PrivateRoute element={<Budgets />} />} />

        <Route path="/about" element={<PrivateRoute element={<About />} />} />


      </Routes>
    </Router>
  );
};

export default App;
