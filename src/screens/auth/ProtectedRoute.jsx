// src/components/auth/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";
import { selectIsAuthenticated } from "../../redux/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? children : <Navigate to="/sign_in" />;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // ✅ validate children
};

export default ProtectedRoute;
