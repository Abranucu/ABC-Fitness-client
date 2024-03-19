import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Error 404: Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <button onClick={() => navigate("/")}>Ir a la página de inicio</button>
    </div>
  );
}

export default NotFound;
