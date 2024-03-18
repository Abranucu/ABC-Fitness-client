import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ABC-fitness-logo-animado.gif";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Bienvenido a la página de inicio</h1>
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
