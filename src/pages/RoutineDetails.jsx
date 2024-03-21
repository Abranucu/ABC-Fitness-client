import { useState, useEffect, useContext } from "react";
import service from "../services/config.services";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function RoutineDetails() {
  const { routineId } = useParams();
  const [routine, setRoutine] = useState("");
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
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{routine.name}</h1>
      <p>{routine.description}</p>
      {exercises.map((eachExercise, index) => (
        <div key={index}>
          <img src={eachExercise.exercise.img} alt={eachExercise.name} />
          <h2>{eachExercise.exercise.name}</h2>
          <p>Series: {eachExercise.sets}</p>
          <p>Repeticiones: {eachExercise.repetitions}</p>
          <p>Peso: {eachExercise.weight}Kg</p>
          <p>Descanso entre series: {eachExercise.rest} segundos</p>
          <button
            onClick={() => navigate(`/exercise-details/${eachExercise._id}`)}
          >
            Ver ejercicio
          </button>
        </div>
      ))}
      <div>
        {loggedUserId === routine.user && (
          <div>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Borrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoutineDetails;
