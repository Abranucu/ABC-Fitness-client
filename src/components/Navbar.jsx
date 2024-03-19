import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="nav-link" onClick={() => handleNavigate("/routines")}>
        Rutinas
      </span>
      <br />
      <span className="nav-link" onClick={() => handleNavigate("/exercises")}>
        Ejercicios
      </span>
      <br />
      <span className="nav-link" onClick={() => handleNavigate("/profile")}>
        Perfil
      </span>
      <br />
      <span className="nav-link" onClick={() => handleNavigate("/")}>
        Home
      </span>
    </nav>
  );
}

export default Navbar;
