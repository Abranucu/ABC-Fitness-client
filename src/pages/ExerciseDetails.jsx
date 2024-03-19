import { useState, useEffect } from "react";
import service from "../services/config.services";
import { useParams } from "react-router-dom";

function ExerciseDetails() {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState("");
  const [loading, setLoading] = useState(true);

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
        meter con reactplayer
      </iframe>
    </div>
  );
}

export default ExerciseDetails;
