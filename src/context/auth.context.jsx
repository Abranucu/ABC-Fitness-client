import { createContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [issLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const res = await axios.get("http://localhost:5005/api/auth/verify", {
        headers: { authorization: `Bearer ${storedToken}` },
      });
      setIsLoggedIn(true);
      setLoggedUserId(res.data._id);
      setUserRole(res.data.role);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setUserRole(null);
    }
  };
  const passedContext = {
    issLoggedIn,
    loggedUserId,
    authenticateUser,
  };
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
