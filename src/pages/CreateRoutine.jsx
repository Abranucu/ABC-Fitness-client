import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import Search from "../components/Search";

function CreateRoutine() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([]);
  const [repetitions, setRepetitions] = useState([]);
  const [weight, setWeight] = useState([]);
  const [rest, setRest] = useState([]);
  const [errMessage, setErrMessage] = useState(null);

  const handleExerciseSelect = (exerciseId) => {
    // Aquí podrías agregar lógica para manejar la selección de ejercicios
  };

  const handleAddExercise = () => {
    // Aquí podrías agregar lógica para agregar un nuevo ejercicio a la rutina
  };

  const handleSetsChange = (e, index) => {
    // Aquí podrías manejar el cambio en el número de sets para un ejercicio específico
  };

  // Aquí podrías definir funciones similares para manejar los cambios en repeticiones, peso y descanso

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRoutine = {
      name,
      description,
      exercises,
    };

    try {
      await service.post("/routines", newRoutine);
      navigate("/routines");
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
      <h2>Crear rutina</h2>
      <form onSubmit={handleSubmit}>
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
          <button onClick={handleAddExercise}>Agregar</button>
          {/* Aquí podrías renderizar la lista de ejercicios y campos para sets, repeticiones, peso y descanso */}
        </div>
        {errMessage && <p>{errMessage}</p>}
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CreateRoutine;
