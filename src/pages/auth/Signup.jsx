import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("Masculino"); // Valor predeterminado
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [currentLevel, setCurrentLevel] = useState("Bajo"); // Valor predeterminado
  const [goal, setGoal] = useState("Perdida de grasa"); // Valor predeterminado
  const [errMessage, setErrMessage] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      lastName,
      email,
      password,
      age,
      sex,
      height,
      weight,
      currentLevel,
      goal,
    };

    try {
      await service.post("/auth/signup", newUser);
      navigate("/login");
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
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Edad:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sex">Género:</label>
          <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div>
          <label htmlFor="height">Altura:</label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weight">Peso:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="currentLevel">Nivel actual:</label>
          <select
            id="currentLevel"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
          >
            <option value="Bajo">Bajo</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Alto">Alto</option>
          </select>
        </div>
        <div>
          <label htmlFor="goal">Objetivo:</label>
          <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="Perdida de grasa">Perdida de grasa</option>
            <option value="Mantenimiento">Mantenimiento</option>
            <option value="Ganancia muscular">Ganancia muscular</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {errMessage && <p>{errMessage}</p>}
    </div>
  );
}

export default Signup;
