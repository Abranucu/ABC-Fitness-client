import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAdmin(props) {
  const { user, isLoggedIn } = useContext(AuthContext);
  if (isLoggedIn && user && user.role === "admin") {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default IsAdmin;
