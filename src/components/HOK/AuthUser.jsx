import { Navigate, Outlet } from "react-router-dom";

const AuthUser = ({ user }) => {
    if (user) {
      return <Navigate to="/" replace />;
    }
  
    return <Outlet />;
  };
  
  export default AuthUser;
  