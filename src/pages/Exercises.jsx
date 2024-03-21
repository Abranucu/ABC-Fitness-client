import { useContext, useState, useEffect } from "react";
import { Button, Card, Spinner } from "react-bootstrap"; // Importa los componentes necesarios de React Bootstrap
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

function Exercises() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      getAllExercises();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const getAllExercises = async () => {
    try {
      const allExercises = await service.get("/exercises");
      setExercises(allExercises.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mb-4">Todos los ejercicios</h1>
      <div className="d-flex flex-wrap justify-content-around">
        {exercises.map((eachExercise, index) => (
          <Card key={index} style={{ width: "18rem", margin: "2px" }}>
            <Card.Img
              variant="top"
              src={eachExercise.img}
              alt={eachExercise.name}
            />
            <Card.Body>
              <Card.Title>{eachExercise.name}</Card.Title>
              <Card.Text>{eachExercise.involvedMuscles}</Card.Text>
              <Button
                onClick={() =>
                  navigate(`/exercise-details/${eachExercise._id}`)
                }
                variant="primary"
              >
                Ver ejercicio
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Exercises;
