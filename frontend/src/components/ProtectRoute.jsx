import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loggedUser = localStorage.getItem("loggedUserData");

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
