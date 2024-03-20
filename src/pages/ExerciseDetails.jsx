import { useState, useEffect, useContext } from "react";
import service from "../services/config.services";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ExerciseDetails() {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState("");
  const [loading, setLoading] = useState(true);
  const { userRole } = useContext(AuthContext);
  const isAdmin = userRole === "admin";
  const navigate = useNavigate();

  const getExerciseById = async () => {
    try {
      const res = await service.get(`/exercises/${exerciseId}`);
      setExercise(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getExerciseById();
    setLoading(false);
  }, [exerciseId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <img src={exercise.img} alt={exercise.name} style={{ width: "560px" }} />
      <h1>{exercise.name}</h1>
      <p>
        <span>Posición inicial:</span> {exercise.initialPosition}
      </p>
      <p>
        <span>Ejecución:</span> {exercise.execution}
      </p>
      <p>
        <span>Consejos:</span> {exercise.advice}
      </p>
      <p>
        <span>Músculos involucrados:</span> {exercise.involvedMuscles}
      </p>
      <img
        src={exercise.involvedMusclesImg}
        alt={exercise.involvedMuscles}
        style={{ width: "560px" }}
      />
      <iframe
        width="560"
        height="315"
        src={exercise.video}
        title={exercise.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
        meter con REACT PLAYER
      </iframe>
      {isAdmin && (
        <div>
          <button onClick={handleEdit}>Editar</button>
          <button onClick={handleDelete}>Borrar</button>
        </div>
      )}
    </div>
  );
}

export default ExerciseDetails;
