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
      {routines.map((eachRoutine, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>{eachRoutine.name}</Card.Title>
            <Card.Text>{eachRoutine.description}</Card.Text>
            <Button
              variant="primary"
              onClick={() => navigate(`/routine-details/${eachRoutine._id}`)}
            >
              Ver rutina
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Routines;
