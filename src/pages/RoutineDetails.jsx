import { useState, useEffect } from "react";
import service from "../services/config.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function RoutineDetails() {
  const { routineId } = useParams();
  const [routine, setRoutine] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRoutineById();
    setLoading(false);
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

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{routine.name}</h1>
      <p>{routine.description}</p>
      {exercises.map((eachExercise, index) => (
        <div key={index}>
          <img
            src={eachExercise.exercise.img}
            alt={eachExercise.exercise.name}
          />
          <h2>{eachExercise.exercise.name}</h2>
          <p>Series: {eachExercise.sets}</p>
          <p>Repeticiones: {eachExercise.repetitions}</p>
          <p>Peso: {eachExercise.weight}Kg</p>
          <p>Descanso entre series: {eachExercise.rest}segundos</p>
          <button
            onClick={() =>
              navigate(`/exercise-details/${eachExercise.exercise._id}`)
            }
          >
            Ver ejercicio
          </button>
        </div>
      ))}
    </div>
  );
}

export default RoutineDetails;
