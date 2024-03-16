import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [currentLevel, setCurrentLevel] = useState("");
  const [goal, setGoal] = useState("");
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
          <input
            type="text"
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          />
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
          <input
            type="text"
            id="currentLevel"
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="goal">Objetivo:</label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {errMessage && <p>{errMessage}</p>}
    </div>
  );
}

export default Signup;
