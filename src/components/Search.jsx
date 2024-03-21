import { useState } from "react";
import service from "../services/config.services";

function Search({ onExerciseSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchExercises = async () => {
    try {
      setLoading(true);
      const res = await service.get(`/exercises?q=${searchQuery}`);
      setSearchResults(res.data.exercises);
    } catch (error) {
      console.error("Error al buscar ejercicios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      await searchExercises();
    } else {
      setSearchResults([]);
    }
  };

  const handleExerciseSelect = (exercise) => {
    onExerciseSelect(exercise._id);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar ejercicio"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        Buscar
      </button>
      {loading && <span>Cargando...</span>}
      <div>
        {searchResults.map((exercise) => (
          <div
            key={exercise._id}
            onClick={() => handleExerciseSelect(exercise)}
          >
            <span>{exercise.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
