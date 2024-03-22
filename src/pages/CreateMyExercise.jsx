import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import Search from "../components/Search";
import service from "../services/config.services";

function CreateMyExercise() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  const [exerciseDetails, setExerciseDetails] = useState({
    sets: 0,
    repetitions: 0,
    weight: 0,
    rest: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");
  const [createdExercises, setCreatedExercises] = useState([]);

  const allMyExercises = async () => {
    try {
      const res = await service.get(`/routines/${routineId}/exercises`);
      setCreatedExercises(res.data);
    } catch (error) {
      console.error(error);
      setError("Hubo un error al obtener los ejercicios personalizados.");
    }
  };

  useEffect(() => {
    allMyExercises();
  }, [routineId]);

  const handleSelectExercise = (exercise) => {
    setSelectedExerciseId(exercise._id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newMyExercise = {
        ...exerciseDetails,
        routine: routineId,
        exercise: selectedExerciseId,
      };

      const res = await service.post(
        `/routines/${routineId}/exercises`,
        newMyExercise
      );

      setExerciseDetails({
        sets: 0,
        repetitions: 0,
        weight: 0,
        rest: 0,
      });
      setError(null);
      setCreatedExercises([...createdExercises, res.data]);

      // Llamar a allMyExercises nuevamente para actualizar la lista de ejercicios
      allMyExercises();
    } catch (error) {
      console.error(error);
      setError(
        "Hubo un error al crear el ejercicio. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizadoClick = () => {
    navigate(`/routine-details/${routineId}`);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Crear Ejercicio Personalizado</h2>
          <div className="text-center mb-4">
            <Search onSelectExercise={handleSelectExercise} />
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="sets">
              <Form.Label>Series:</Form.Label>
              <Form.Control
                type="number"
                name="sets"
                value={exerciseDetails.sets}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="repetitions">
              <Form.Label>Repeticiones:</Form.Label>
              <Form.Control
                type="number"
                name="repetitions"
                value={exerciseDetails.repetitions}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="weight">
              <Form.Label>Peso:</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={exerciseDetails.weight}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="rest">
              <Form.Label>Descanso entre series:</Form.Label>
              <Form.Control
                type="number"
                name="rest"
                value={exerciseDetails.rest}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button type="submit" disabled={loading} className="m-2">
                {loading ? "Creando..." : "Crear Ejercicio"}
              </Button>
            </div>
          </Form>
          <div>
            <h3 className="text-center mt-4">Ejercicios Creados:</h3>
            <ul className="list-unstyled">
              {createdExercises.map((exercise, index) => (
                <li key={index}>
                  <strong>{exercise.exercise.name}</strong> - Series:{" "}
                  {exercise.sets}, Repeticiones: {exercise.repetitions}, Peso:{" "}
                  {exercise.weight}, Descanso: {exercise.rest}
                </li>
              ))}
            </ul>
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="text-center mt-4">
            <Button onClick={handleFinalizadoClick} className="m-2">
              Ver mi rutina
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMyExercise;
