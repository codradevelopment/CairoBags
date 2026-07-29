import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { LoadingPage } from "../components/ui/Spinner.jsx";

function getDefaultRedirect(user) {
  if (user?.role?.includes("Admin")) return "/admin";
  return "/account";
}

export function GuestRoute() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingPage label="Loading" />;
  }

  if (isAuthenticated) {
    return <Navigate to={getDefaultRedirect(user)} replace />;
  }

  return <Outlet />;
}
