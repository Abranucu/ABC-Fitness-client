import { useState, useEffect } from "react";
import service from "../services/config.services";
import { useParams } from "react-router-dom";

function RoutineDetails() {
  const { routineId } = useParams(); // Obtener el parámetro de la URL que contiene el ID de la rutina
  const [routine, setRoutine] = useState("");
  const [exercises, setExercises] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getRoutineById();
    setLoading(false);
  }, [routineId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{routine.name}</h1>
      <p>{routine.description}</p>
      {/* Aquí puedes agregar más detalles de la rutina, según tu modelo de datos */}
      {/*exercises.map((eachExercise, index) => (
        <div key={index}>
          <h2>{eachExercise.name}</h2>
          <p>{eachExercise.description}</p>
          <button
            onClick={() => navigate(`/exercise-details/${eachExercise._id}`)}
          >
            Ver rutina
          </button>
        </div>
      ))*/}
    </div>
  );
}

export default RoutineDetails;
