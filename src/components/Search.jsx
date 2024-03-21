import { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap"; // Importamos componentes de React Bootstrap
import service from "../services/config.services";

function Search({ onSelectExercise }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await service.get(`/exercises?search=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching for exercises:", error);
    }
  };

  const handleSelectExercise = (exerciseId) => {
    onSelectExercise(exerciseId);
  };

  return (
    <div>
      {/* Utilizamos el componente Form de React Bootstrap para el input y el button */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
      </Form.Group>
      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
      {/* Utilizamos el componente ListGroup de React Bootstrap para la lista de resultados */}
      <ListGroup>
        {searchResults.map((exercise) => (
          <ListGroup.Item
            key={exercise._id}
            onClick={() => handleSelectExercise(exercise)}
            action // Esto hace que el item tenga un estilo de enlace
          >
            {exercise.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Search;
