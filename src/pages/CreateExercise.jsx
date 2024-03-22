import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

const musclesList = [
  "Músculos del cuello",
  "Trapecio",
  "Hombros",
  "Deltoides",
  "Deltoides anterior",
  "Deltoides lateral",
  "Deltoides posterior",
  "Manguito rotador",
  "Pectorales",
  "Pectorales mayores",
  "Pectorales menores",
  "Espalda",
  "Espalda alta",
  "Dorsal",
  "Dorsal ancho",
  "Romboides",
  "Espalda baja",
  "Lumbares",
  "Erectores espinales",
  "Abdominales",
  "Abdominales oblicuos",
  "Braquial",
  "Bíceps",
  "Tríceps",
  "Antebrazos",
  "Aductores",
  "Abductores",
  "Glúteos",
  "Cadera",
  "Cuádriceps",
  "Isquiotibiales",
  "Tibiales anteriores",
  "Pantorrillas",
  "Gemelos",
  "Flexores de la muñeca",
  "Extensores de la muñeca",
];

function CreateRExercise() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [initialPosition, setInitialPosition] = useState("");
  const [execution, setExecution] = useState("");
  const [advice, setAdvice] = useState("");
  const [involvedMuscles, setInvolvedMuscles] = useState("");
  const [involvedMusclesImg, setInvolvedMusclesImg] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  const handleCreateExercise = async (e) => {
    e.preventDefault();

    const newExercise = {
      name,
      initialPosition,
      execution,
      advice,
      involvedMuscles: [involvedMuscles],
      involvedMusclesImg,
      img,
      video,
    };

    try {
      await service.post("/exercises", newExercise, { new: true });
      navigate("/exercises");
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
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="mb-4 text-center">Crear ejercicio</h2>
          <Form onSubmit={handleCreateExercise}>
            <Form.Group controlId="name">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="initialPosition">
              <Form.Label>Posición inicial:</Form.Label>
              <Form.Control
                as="textarea"
                value={initialPosition}
                onChange={(e) => setInitialPosition(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="execution">
              <Form.Label>Ejecución:</Form.Label>
              <Form.Control
                as="textarea"
                value={execution}
                onChange={(e) => setExecution(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="advice">
              <Form.Label>Consejo:</Form.Label>
              <Form.Control
                as="textarea"
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="involvedMuscles">
              <Form.Label>Músculos involucrados:</Form.Label>
              <Form.Control
                as="select"
                value={involvedMuscles}
                onChange={(e) =>
                  setInvolvedMuscles(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                multiple
                required
              >
                {musclesList.map((muscle) => (
                  <option key={muscle} value={muscle}>
                    {muscle}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="involvedMusclesImg">
              <Form.Label>Imagen músculos involucrados:</Form.Label>
              <Form.Control
                type="text"
                value={involvedMusclesImg}
                onChange={(e) => setInvolvedMusclesImg(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="img">
              <Form.Label>Imagen ejercicio:</Form.Label>
              <Form.Control
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="video">
              <Form.Label>Video:</Form.Label>
              <Form.Control
                type="text"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                required
              />
            </Form.Group>
            {errMessage && <p className="text-danger">{errMessage}</p>}
            <div className="text-center">
              <Button variant="primary" type="submit">
                Crear
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateRExercise;
