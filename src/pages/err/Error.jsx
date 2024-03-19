import { useNavigate } from "react-router-dom";

function Error500() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Error 500: Error interno del servidor</h2>
      <p>Lo sentimos, se produjo un error interno en el servidor.</p>
      <button onClick={() => navigate("/")}>Ir a la página de inicio</button>
    </div>
  );
}

export default Error500;
