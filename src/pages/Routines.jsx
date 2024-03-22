import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap"; // Importamos componentes de React Bootstrap
import service from "../services/config.services";

function Routines() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      getRoutines();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const getRoutines = async () => {
    try {
      const res = await service.get("/routines");
      setRoutines(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mb-4">Todos las rutinas</h1>
      <div className="d-flex flex-wrap justify-content-around">
        {routines.map((eachRoutine, index) => (
          <Card key={index} style={{ width: "18rem", margin: "2px" }}>
            <Card.Body>
              <Card.Title>{eachRoutine.name}</Card.Title>
              <Card.Text>{eachRoutine.description}</Card.Text>
              <Button
                onClick={() => navigate(`/routine-details/${eachRoutine._id}`)}
                variant="primary"
              >
                Ver rutina
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Routines;
