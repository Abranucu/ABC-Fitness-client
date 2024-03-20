import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";

function Navbar() {
  const { userRole, loggedUserId } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="nav-link" to="/" exact="true">
        Home
      </NavLink>
      <br />
      <NavLink className="nav-link" to="/exercises">
        Ejercicios
      </NavLink>
      <br />
      <NavLink className="nav-link" to="/routines">
        Rutinas
      </NavLink>
      <br />
      <NavLink className="nav-link" to="/profile">
        Perfil
      </NavLink>
      <br />
      <NavLink className="nav-link" to={`/routines/user/${loggedUserId}`}>
        Mis rutinas
      </NavLink>
      <br />
      <NavLink className="nav-link" to={"/create-routine"}>
        Crear rutina
      </NavLink>
      <br />
      {userRole === "admin" && (
        <>
          <NavLink className="nav-link" to="/create-exercise">
            Crear Ejercicio
          </NavLink>
          <br />
        </>
      )}
      <span className="nav-link" onClick={handleLogout}>
        Logout
      </span>
      <br />
    </nav>
  );
}

export default Navbar;
