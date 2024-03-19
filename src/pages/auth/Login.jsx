import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";
import { AuthContext } from "../../context/auth.context";

function Login() {
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
      const res = await service.post("/auth/login", credentials);
      localStorage.setItem("authToken", res.data);
      await authenticateUser();
      navigate("/");
    } catch (err) {
      let errCode = err.response.status;
      let errMessage = err.response.data.message;
      if (errCode === 400) {
        setErrMessage(errMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {errMessage && <p>{errMessage}</p>}
    </div>
  );
}

export default Login;
