import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

const App = () => {
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem("authToken");
    return isAuthenticated ? element : <Navigate to="/login" replace />;
  };
  return (
    <Router>
      <Routes>
        {/* login route */}
        <Route path="/login" element={<LogIn />} />

        {/* signup route */}
        <Route path="/signup" element={<SignUp />} />

        {/* default route */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
};

export default App;
