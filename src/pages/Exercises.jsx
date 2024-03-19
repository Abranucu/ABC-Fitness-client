import service from "../services/config.services";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

function Exercises() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [exercises, setExercises] = useState(null);
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
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Todos los ejercicios</h1>
      {exercises.map((eachExercise, index) => (
        <div key={index}>
          <img src={eachExercise.img} alt={eachExercise.name} />
          <h2>{eachExercise.name}</h2>
          <p>{eachExercise.involvedMuscles}</p>
          <button
            onClick={() => navigate(`/exercise-details/${eachExercise._id}`)}
          >
            Ver ejercicio
          </button>
        </div>
      ))}
    </div>
  );
}

export default Exercises;
