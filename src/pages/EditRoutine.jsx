import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../services/config.services";
import { Form, Button, Col, Row } from "react-bootstrap";

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

  const handleAddMyExercise = () => {
    navigate(`/create-myexercise/${routineId}`);
  };

  const handleDeleteMyExercise = async (e) => {
    const myExerciseId = e;
    try {
      await service.delete(
        `/routines/${routineId}/exercises/${myExerciseId}`,
        myExerciseId
      );
      setExercises((prevExercises) =>
        prevExercises.filter((exercise) => exercise._id !== myExerciseId)
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
      <Form onSubmit={handleEditRoutine}>
        <Form.Group as={Row} controlId="formName" className="m-2">
          <Form.Label column sm="2">
            Nombre:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDescription" className="m-2">
          <Form.Label column sm="2">
            Descripción:
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formExercises" className="m-2">
          <Col sm="10">
            <Button onClick={handleAddMyExercise} className="m-2">
              Agregar Ejercicio
            </Button>
          </Col>
          <Form.Label column sm="2">
            <h3>Ejercicios:</h3>
          </Form.Label>
          <Col sm="10">
            {exercises.length > 0 ? (
              <ul className="list-unstyled">
                {exercises.map((exercise, index) => (
                  <li key={index} className="m-2">
                    <Form.Group as={Row} controlId={`exercise-${index}`}>
                      <Form.Label column sm="2">
                        Nombre:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={exercise.exercise.name}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      controlId={`sets-${index}`}
                      className="my-1"
                    >
                      <Form.Label column sm="2">
                        Sets:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          value={sets[index] || ""}
                          onChange={(e) => handleSetsChange(e, index)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      controlId={`repetitions-${index}`}
                      className="my-1"
                    >
                      <Form.Label column sm="2">
                        Repetitions:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          value={repetitions[index] || ""}
                          onChange={(e) => handleRepetitionsChange(e, index)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      controlId={`rest-${index}`}
                      className="my-1"
                    >
                      <Form.Label column sm="2">
                        Rest:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          value={rest[index] || ""}
                          onChange={(e) => handleRestChange(e, index)}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      controlId={`weight-${index}`}
                      className="my-1"
                    >
                      <Form.Label column sm="2">
                        Weight:
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          value={weight[index] || ""}
                          onChange={(e) => handleWeightChange(e, index)}
                        />
                      </Col>
                    </Form.Group>

                    <Button
                      variant="primary"
                      className="m-2" // Añadir margen por los cuatro lados
                      onClick={handleEditMyExercise(exercise._id, index)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      className="m-2" // Añadir margen por los cuatro lados
                      onClick={() => handleDeleteMyExercise(exercise._id)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay ejercicios disponibles.</p>
            )}
          </Col>
        </Form.Group>

        {errMessage && <p>{errMessage}</p>}

        <Button type="submit" className="mt-3">
          Editar
        </Button>
      </Form>
    </div>
  );
}

export default EditRoutine;
