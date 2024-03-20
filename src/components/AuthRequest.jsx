import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function AuthRequest(props) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isLoggedIn === true) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default AuthRequest;
