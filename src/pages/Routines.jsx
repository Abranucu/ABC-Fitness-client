import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
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
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      {routines.map((eachRoutine, index) => (
        <div key={index}>
          <h2>{eachRoutine.name}</h2>
          <p>{eachRoutine.description}</p>
          <button
            onClick={() => navigate(`/routine-details/${eachRoutine._id}`)}
          >
            Ver rutina
          </button>
        </div>
      ))}
    </div>
  );
}

export default Routines;
