import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/config.services";
import Search from "../components/Search";

function EditRoutine() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);
  const [repetitions, setRepetitions] = useState([]);
  const [weight, setWeight] = useState([]);
  const [rest, setRest] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    const routineToEdit = async () => {
      try {
        const res = await service.get(`/routines/${routineId}`);
        const routineData = res.data.routine;
        const exercisesData = res.data.exercises;
        setName(routineData.name);
        setDescription(routineData.description);
        setExercises(
          exercisesData ? exercisesData.map((exerciseData) => exerciseData) : []
        );
        if (exercisesData && exercisesData.length > 0) {
          exercisesData.forEach((exerciseData, index) => {
            setSets((prevSets) => {
              const updatedSets = [...prevSets];
              updatedSets[index] = exerciseData.sets;
              return updatedSets;
            });
            setRepetitions((prevRepetitions) => {
              const updatedRepetitions = [...prevRepetitions];
              updatedRepetitions[index] = exerciseData.repetitions;
              return updatedRepetitions;
            });
            setWeight((prevWeight) => {
              const updatedWeight = [...prevWeight];
              updatedWeight[index] = exerciseData.weight;
              return updatedWeight;
            });
            setRest((prevRest) => {
              const updatedRest = [...prevRest];
              updatedRest[index] = exerciseData.rest;
              return updatedRest;
            });
          });
        }
      } catch (error) {
        console.error("Error al cargar los datos de la rutina:", error);
        setErrMessage(
          "Error al cargar los datos de la rutina. Por favor, inténtalo de nuevo."
        );
      }
    };
    routineToEdit();
  }, [routineId]);

  const handleExerciseSelect = (exerciseId) => {
    setSelectedExerciseId(exerciseId);
  };

  const handleAddMyExercise = () => {};

  const handleDeleteMyExercise = async (e) => {
    const myExerciseId = e;
    try {
      await service.delete(
        "/routines/:routineId/exercises/:exerciseId",
        myExerciseId
      );
    } catch (err) {
      console.log(err);
      let errCode = err.response.status;
      let errMessage = err.response.data.message;
      if (errCode === 400) {
        setErrMessage(errMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handleEditMyExercise = (myExerciseId, index) => async () => {
    const editedMyExercise = {
      sets: sets[index],
      repetitions: repetitions[index],
      weight: weight[index],
      rest: rest[index],
    };
    try {
      await service.patch(
        `/routines/${routineId}/exercises/${myExerciseId}`,
        editedMyExercise
      );
      setExercises((prevExercises) => {
        const updatedExercises = [...prevExercises];
        updatedExercises[index].sets = sets[index];
        updatedExercises[index].repetitions = repetitions[index];
        updatedExercises[index].weight = weight[index];
        updatedExercises[index].rest = rest[index];
        return updatedExercises;
      });
      console.log("Ejercicio actualizado exitosamente.");
    } catch (err) {
      console.log(err);
      let errCode = err.response.status;
      let errMessage = err.response.data.message;
      if (errCode === 400) {
        setErrMessage(errMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handleSetsChange = (e, index) => {
    const updatedSets = [...sets];
    updatedSets[index] = e.target.value;
    setSets(updatedSets);
  };

  const handleRepetitionsChange = (e, index) => {
    const updatedRepetitions = [...repetitions];
    updatedRepetitions[index] = e.target.value;
    setRepetitions(updatedRepetitions);
  };

  const handleRestChange = (e, index) => {
    const updatedRest = [...rest];
    updatedRest[index] = e.target.value;
    setRest(updatedRest);
  };

  const handleWeightChange = (e, index) => {
    const updatedWeight = [...weight];
    updatedWeight[index] = e.target.value;
    setWeight(updatedWeight);
  };

  const handleEditRoutine = async (e) => {
    e.preventDefault();

    const editedRoutine = {
      name,
      description,
      exercises,
    };

    try {
      await service.put(`/routines/${routineId}`, editedRoutine);
      navigate(`/routine-details/${routineId}`);
    } catch (err) {
      console.log(err);
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
      <h2>Editar rutina</h2>
      <form onSubmit={handleEditRoutine}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <h3>Ejercicios:</h3>
          <Search onExerciseSelect={handleExerciseSelect} />
          <button onClick={handleAddMyExercise}>Agregar</button>
          {exercises.length > 0 ? (
            <ul>
              {exercises.map((exercise, index) => (
                <li key={index}>
                  <div>
                    <strong>Nombre:</strong> {exercise.exercise.name}
                  </div>
                  <div>
                    <label htmlFor={`sets-${index}`}>Sets:</label>
                    <input
                      type="text"
                      id={`sets-${index}`}
                      value={sets[index] || ""}
                      onChange={(e) => handleSetsChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`repetitions-${index}`}>Repetitions:</label>
                    <input
                      type="text"
                      id={`repetitions-${index}`}
                      value={repetitions[index] || ""}
                      onChange={(e) => handleRepetitionsChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`rest-${index}`}>Rest:</label>
                    <input
                      type="text"
                      id={`rest-${index}`}
                      value={rest[index] || ""}
                      onChange={(e) => handleRestChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor={`weight-${index}`}>Weight:</label>
                    <input
                      type="text"
                      id={`weight-${index}`}
                      value={weight[index] || ""}
                      onChange={(e) => handleWeightChange(e, index)}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleEditMyExercise(exercise._id, index)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteMyExercise(exercise._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay ejercicios disponibles.</p>
          )}
        </div>
        {errMessage && <p>{errMessage}</p>}
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}

export default EditRoutine;
