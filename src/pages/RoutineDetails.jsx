import { useState, useEffect, useContext } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import service from "../services/config.services";

function RoutineDetails() {
  const { routineId } = useParams();
  const [routine, setRoutine] = useState({});
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { loggedUserId } = useContext(AuthContext);

  useEffect(() => {
    getRoutineById();
  }, [routineId]);

  const getRoutineById = async () => {
    try {
      const res = await service.get(`/routines/${routineId}`);
      setRoutine(res.data.routine);
      setExercises(res.data.exercises);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-routine/${routineId}`);
  };

  const handleDelete = async () => {
    try {
      await service.delete(`/routines/${routineId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1>{routine.name}</h1>
      <p>{routine.description}</p>
      <div className="d-flex flex-wrap justify-content-around">
        {exercises.map((eachExercise, index) => (
          <Card key={index} style={{ width: "18rem", margin: "2px" }}>
            <Card.Body className="text-center">
              <div style={{ maxWidth: "200px", margin: "0 auto" }}>
                <Card.Img
                  src={eachExercise.exercise.img}
                  alt={eachExercise.name}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <Card.Title>{eachExercise.exercise.name}</Card.Title>
              <Card.Text>Series: {eachExercise.sets}</Card.Text>
              <Card.Text>Repeticiones: {eachExercise.repetitions}</Card.Text>
              <Card.Text>Peso: {eachExercise.weight} Kg</Card.Text>
              <Card.Text>
                Descanso entre series: {eachExercise.rest} segundos
              </Card.Text>
              <Button
                variant="primary"
                onClick={() =>
                  navigate(`/exercise-details/${eachExercise._id}`)
                }
              >
                Ver ejercicio
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      {loggedUserId === routine.user && (
        <div className="text-center">
          <Button onClick={handleEdit} className="m-2">
            Editar
          </Button>
          <Button variant="danger" onClick={handleDelete} className="m-2">
            Borrar
          </Button>
        </div>
      )}
    </div>
  );
}

export default RoutineDetails;
