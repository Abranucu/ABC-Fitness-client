import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/config.services";
import { AuthContext } from "../../context/auth.context";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Inicio de Sesión</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="current-password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Iniciar Sesión
            </Button>
          </Form>
          {errMessage && (
            <Alert variant="danger" className="mt-3">
              {errMessage}
            </Alert>
          )}
          <Button
            onClick={() => navigate("/signup")}
            variant="secondary"
            className="mt-3 w-100"
          >
            Registrarse
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
