import { createContext, useState } from "react";
import { useEffect } from "react";
import service from "../services/config.services";

const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authenticateUser = async () => {
    try {
      const res = await service.get("/auth/verify");
      setIsLoggedIn(true);
      setLoggedUserId(res.data._id);
      setUserRole(res.data.role);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setUserRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    userRole,
    authenticateUser,
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={passedContext}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
