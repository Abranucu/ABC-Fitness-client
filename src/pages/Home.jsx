import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";
import logo from "../assets/ABC-fitness-logo-animado.gif";

const fitnessAdvice = [
  "Bebe suficiente agua para mantenerte hidratado durante el ejercicio.",
  "Incorpora ejercicios de fuerza en tu rutina para fortalecer los músculos.",
  "No te saltes el calentamiento antes de hacer ejercicio para prevenir lesiones.",
  "Agrega variedad a tu rutina de ejercicios para evitar el estancamiento.",
  "Escucha a tu cuerpo y descansa cuando sea necesario para permitir la recuperación.",
  "Establece metas realistas y alcanzables para mantenerte motivado.",
  "Come alimentos ricos en proteínas para ayudar en la recuperación muscular.",
  "Incorpora ejercicios de flexibilidad para mejorar la amplitud de movimiento.",
  "Duerme lo suficiente para permitir la recuperación muscular y la regeneración celular.",
  "No te compares con los demás; cada persona tiene su propio progreso.",
  "Aprende a hacer los ejercicios correctamente para maximizar los beneficios y prevenir lesiones.",
  "No te olvides de estirar después del ejercicio para mejorar la flexibilidad.",
  "Diviértete con tu rutina de ejercicio eligiendo actividades que disfrutes.",
  "Consulta a un profesional de la salud antes de comenzar un nuevo programa de ejercicios.",
  "No te castigues por un día malo; sigue adelante y enfócate en el progreso a largo plazo.",
  "Mantén un diario de entrenamiento para realizar un seguimiento de tu progreso y motivarte.",
  "No te obsesiones con la balanza; el progreso no siempre se refleja en el peso corporal.",
  "Haz ejercicio al aire libre para disfrutar de la naturaleza y mejorar tu estado de ánimo.",
  "Establece una rutina de sueño regular para mejorar el rendimiento y la recuperación.",
  "Encuentra un compañero de entrenamiento para motivarte mutuamente y hacer el ejercicio más divertido.",
];

function Home() {
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [userRoutines, setUserRoutines] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      getUserById();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const getUserById = async () => {
    try {
      const userData = await service.get("/profile", loggedUserId);
      const allUserRoutines = await service.get(
        `/routines?userId=${loggedUserId}`
      );
      setUser(userData.data);
      setUserRoutines(allUserRoutines.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const randomIndex = Math.floor(Math.random() * fitnessAdvice.length);
  const randomAdvice = fitnessAdvice[randomIndex];

  if (loading) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (isLoggedIn && !user) {
    return (
      <div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      {isLoggedIn && user ? (
        <div>
          <div>
            <h1>Bienvenido, {user.name}!</h1>
            <h2>{randomAdvice}</h2>
            {/* Esto luego meter un carrusel con todos los consejos */}
          </div>
          <div>
            <h1>Mis rutinas</h1>
            {userRoutines.map((eachRoutine, index) => (
              <div key={index}>
                <h2>{eachRoutine.name}</h2>
                <p>{eachRoutine.description}</p>
                <button
                  onClick={() =>
                    navigate(`/routine-details/${eachRoutine._id}`)
                  }
                >
                  Ver rutina
                </button>
              </div>
            ))}
            {/* Esto luego meter un carrusel con todos las rutinas */}
          </div>
          <div>
            <h1>Listas de reproducción para motivarte entrenando</h1>
            <h2>Corred insensatos</h2>
            {/* Esto luego meter un carrusel con todos las listas de reproducción para motivación de Spotify, investigar como hacerlo */}
          </div>
        </div>
      ) : (
        <div>
          <img
            src={logo}
            alt="Logo de la aplicación"
            onClick={() => {
              navigate("/login");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
