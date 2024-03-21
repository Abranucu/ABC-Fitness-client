import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
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

function EditExercise() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [initialPosition, setInitialPosition] = useState("");
  const [execution, setExecution] = useState("");
  const [advice, setAdvice] = useState("");
  const [involvedMuscles, setInvolvedMuscles] = useState([]);
  const [involvedMusclesImg, setInvolvedMusclesImg] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    const exerciseToEdit = async () => {
      try {
        const res = await service.get(`/exercises/${exerciseId}`);
        const exerciseData = res.data;

        setName(exerciseData.name);
        setInitialPosition(exerciseData.initialPosition);
        setExecution(exerciseData.execution);
        setAdvice(exerciseData.advice);
        setInvolvedMuscles(exerciseData.involvedMuscles);
        setInvolvedMusclesImg(exerciseData.involvedMusclesImg);
        setImg(exerciseData.img);
        setVideo(exerciseData.video);
      } catch (error) {
        console.error("Error al cargar los datos del ejercicio:", error);
        setErrMessage(
          "Error al cargar los datos del ejercicio. Por favor, inténtalo de nuevo."
        );
      }
    };
    exerciseToEdit();
  }, [exerciseId]);

  const handleEditExercise = async (e) => {
    e.preventDefault();

    const editedExercise = {
      name,
      initialPosition,
      execution,
      advice,
      involvedMuscles,
      involvedMusclesImg,
      img,
      video,
    };

    try {
      await service.put(`/exercises/${exerciseId}`, editedExercise);
      navigate(`/exercise-details/${exerciseId}`);
    } catch (err) {
      console.log(err);
      // Manejar errores de la solicitud PUT
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
      <h2>Editar ejercicio</h2>
      <Form onSubmit={handleEditExercise}>
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
          <Form.Select
            value={involvedMuscles}
            onChange={(e) =>
              setInvolvedMuscles(
                Array.from(e.target.selectedOptions, (option) => option.value)
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
          </Form.Select>
          {/* Mostrar los músculos seleccionados */}
          <ul>
            {involvedMuscles.map((muscle, index) => (
              <li key={index}>{muscle}</li>
            ))}
          </ul>
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
        {errMessage && <p>{errMessage}</p>}
        <Button variant="primary" type="submit">
          Editar
        </Button>
      </Form>
    </div>
  );
}

export default EditExercise;
