import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config.services";

const musclesList = [
  "Músculos del cuello",
  "Trapecio",
  "Hombros",
  "Deltoides",
  "Deltoides anterior",
  "Deltoides lateral",
  "Deltoides posterior",
  "Manguito rotador",
  "Pectorales",
  "Pectorales mayores",
  "Pectorales menores",
  "Espalda",
  "Espalda alta",
  "Dorsal",
  "Dorsal ancho",
  "Romboides",
  "Espalda baja",
  "Lumbares",
  "Erectores espinales",
  "Abdominales",
  "Abdominales oblicuos",
  "Braquial",
  "Bíceps",
  "Tríceps",
  "Antebrazos",
  "Aductores",
  "Abductores",
  "Glúteos",
  "Cadera",
  "Cuádriceps",
  "Isquiotibiales",
  "Tibiales anteriores",
  "Pantorrillas",
  "Gemelos",
  "Flexores de la muñeca",
  "Extensores de la muñeca",
];

function CreateRExercise() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [initialPosition, setInitialPosition] = useState("");
  const [execution, setExecution] = useState("");
  const [advice, setAdvice] = useState("");
  const [involvedMuscles, setInvolvedMuscles] = useState("");
  const [involvedMusclesImg, setInvolvedMusclesImg] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [errMessage, setErrMessage] = useState(null);

  const handleCreateExercise = async (e) => {
    e.preventDefault();

    const newExercise = {
      name,
      initialPosition,
      execution,
      advice,
      involvedMuscles: [involvedMuscles],
      involvedMusclesImg,
      img,
      video,
    };

    try {
      await service.post("/exercises", newExercise, { new: true });
      navigate("/exercises");
    } catch (err) {
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
      <h2>Crear ejercicio</h2>
      <form onSubmit={handleCreateExercise}>
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
          <label htmlFor="initialPosition">Posición inicial:</label>
          <textarea
            id="initialPosition"
            value={initialPosition}
            onChange={(e) => setInitialPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="execution">Ejecución:</label>
          <textarea
            id="execution"
            value={execution}
            onChange={(e) => setExecution(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="advice">Consejo:</label>
          <textarea
            id="advice"
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="involvedMuscles">Músculos involucrados:</label>
          <select
            id="involvedMuscles"
            value={involvedMuscles}
            onChange={(e) => setInvolvedMuscles(e.target.value)}
            required
          >
            {musclesList.map((muscle) => (
              <option key={muscle} value={muscle}>
                {muscle}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="involvedMusclesImg">
            Imagen músculos involucrados:
          </label>
          <input
            type="text"
            id="involvedMusclesImg"
            value={involvedMusclesImg}
            onChange={(e) => setInvolvedMusclesImg(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="img">Imagen ejercicio:</label>
          <input
            type="text"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="video">Video:</label>
          <input
            type="text"
            id="video"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            required
          />
        </div>
        {errMessage && <p>{errMessage}</p>}
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CreateRExercise;
