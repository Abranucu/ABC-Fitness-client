import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import logo from "../assets/ABC-fitness-logo-animado.gif";

function Home() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async (loggedUserId) => {
    try {
      const userData = await service.get("/profile", loggedUserId);
      console.log(userData.data);
      setUser(userData.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Bienvenido, {user.name}!</h1>
          <p>Aquí va el contenido específico para usuarios logueados.</p>
        </div>
      ) : (
        <div>
          <img
            src={logo}
            alt="Logo de la aplicación"
            onClick={() => {
              navigate("/login");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
