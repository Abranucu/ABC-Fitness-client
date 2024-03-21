import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Spinner, Row, Col } from "react-bootstrap"; // Importa los componentes necesarios de React Bootstrap
import ReactPlayer from "react-player";
import service from "../services/config.services";

function ExerciseDetails() {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userRole } = useContext(AuthContext);
  const isAdmin = userRole === "admin";
  const navigate = useNavigate();

  useEffect(() => {
    const getExerciseById = async () => {
      try {
        const res = await service.get(`/exercises/${exerciseId}`);
        setExercise(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getExerciseById();
  }, [exerciseId]);

  const handleDelete = async () => {
    try {
      await service.delete(`/exercises/${exerciseId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-exercise/${exerciseId}`);
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
      <Row className="mb-3">
        <Col>
          <img src={exercise.img} alt={exercise.name} className="img-fluid" />
        </Col>
        <Col>
          <img
            src={exercise.involvedMusclesImg}
            alt={exercise.involvedMuscles}
            className="img-fluid"
          />
        </Col>
      </Row>
      <h1>{exercise.name}</h1>
      <p>
        <strong>Posición inicial:</strong> {exercise.initialPosition}
      </p>
      <p>
        <strong>Ejecución:</strong> {exercise.execution}
      </p>
      <p>
        <strong>Consejos:</strong> {exercise.advice}
      </p>
      <p>
        <strong>Músculos involucrados:</strong> {exercise.involvedMuscles}
      </p>
      <div className="text-center my-3">
        <ReactPlayer
          url={exercise.video}
          width="640px"
          height="360px"
          controls={true}
          style={{ margin: "0 auto" }} // Aplica estilos para centrar el video horizontalmente
        />
      </div>
      {isAdmin && (
        <div className="text-center">
          <Button onClick={handleEdit} variant="primary" className="me-2">
            Editar
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Borrar
          </Button>
        </div>
      )}
    </div>
  );
}

export default ExerciseDetails;
