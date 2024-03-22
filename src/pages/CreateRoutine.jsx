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
      const { _id: routineId } = response.data;
      navigate(`/create-myexercise/${routineId}`);
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Crear rutina</h2>
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
            <div className="text-center m-2">
              <Button variant="primary" type="submit">
                Crear Rutina
              </Button>
            </div>
            {errMessage && <Alert variant="danger">{errMessage}</Alert>}
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateRoutine;
