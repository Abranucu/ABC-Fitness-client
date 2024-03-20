import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

function UserRoutines() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userRoutines, setUserRoutines] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      getUserRoutinesById();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const getUserRoutinesById = async () => {
    try {
      const allUserRoutines = await service.get(
        `/routines/user/${loggedUserId}`
      );
      setUserRoutines(allUserRoutines.data);
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
      <h1>Mis rutinas</h1>
      {userRoutines.map((eachRoutine, index) => (
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

export default UserRoutines;
