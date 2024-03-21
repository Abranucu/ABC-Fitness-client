import { useContext, useState, useEffect } from "react";
import service from "../services/config.services";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { Button, Col, Image, Spinner, Row, Carousel } from "react-bootstrap";
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
        `/routines/user/${loggedUserId}`
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
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isLoggedIn && !user) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      {!isLoggedIn ? (
        <div className="text-center mt-5">
          <Image
            src={logo}
            alt="Logo de la aplicación"
            onClick={() => {
              navigate("/login");
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : (
        <div>
          <Row className="justify-content-center mt-5">
            <Col md={8} className="text-center">
              <h1>Bienvenido, {user.name}!</h1>
              <h2>{randomAdvice}</h2>
              {/* Esto luego meter un carrusel con todos los consejos */}
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col md={8}>
              <h1 className="text-center">Mis rutinas</h1>
              <Carousel>
                {userRoutines.map((eachRoutine, index) => (
                  <Carousel.Item key={index}>
                    <div className="card mb-3" style={{ height: "200px" }}>
                      <div className="card-body">
                        <h2>{eachRoutine.name}</h2>
                        <p>{eachRoutine.description}</p>
                        <Button
                          onClick={() =>
                            navigate(`/routine-details/${eachRoutine._id}`)
                          }
                          className="w-50 mx-auto"
                          style={{ maxWidth: "200px" }}
                        >
                          Ver rutina
                        </Button>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Home;
