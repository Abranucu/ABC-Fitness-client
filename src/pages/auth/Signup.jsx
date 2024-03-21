import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";
import { Container, Form, Button, Alert } from "react-bootstrap";

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
    <Container>
      <div className="text-center">
        <h1 className="mb-4">Formulario de Registro</h1>
        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Apellido:</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="age">
            <Form.Label>Edad:</Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="sex">
            <Form.Label>Género:</Form.Label>
            <Form.Select value={sex} onChange={(e) => setSex(e.target.value)}>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="height">
            <Form.Label>Altura:</Form.Label>
            <Form.Control
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="weight">
            <Form.Label>Peso:</Form.Label>
            <Form.Control
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="currentLevel">
            <Form.Label>Nivel actual:</Form.Label>
            <Form.Select
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value)}
            >
              <option value="Bajo">Bajo</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Alto">Alto</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="goal">
            <Form.Label>Objetivo:</Form.Label>
            <Form.Select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="Perdida de grasa">Perdida de grasa</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Ganancia muscular">Ganancia muscular</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Registrarse
          </Button>
        </Form>
        {errMessage && <Alert variant="danger">{errMessage}</Alert>}
      </div>
    </Container>
  );
}

export default Signup;
