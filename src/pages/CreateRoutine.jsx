import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import service from "../services/config.services";

function CreateRoutine() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRoutine = {
      name,
      description,
    };

    try {
      const response = await service.post("/routines", newRoutine);
      console.log(response);
      const { _id: routineId } = response.data;
      navigate(`/create-myexercise/${routineId}`);
    } catch (err) {
      console.log(err);
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
      <h2>Crear rutina</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="m-2">
          Crear Rutina
        </Button>
        {errMessage && <Alert variant="danger">{errMessage}</Alert>}
      </Form>
    </div>
  );
}

export default CreateRoutine;
