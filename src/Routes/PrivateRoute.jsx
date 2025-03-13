import { Navigate } from "react-router-dom";

const PrivateRoute = ({isAuthenticated, isLoading, children}) => {

  if(isLoading) return null;
  
  return isAuthenticated 
    ? <>{children}</> 
    : <Navigate to="/" />;
};

export default PrivateRoute;
