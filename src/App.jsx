import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";
import RoutineDetails from "./pages/RoutineDetails";
import Routines from "./pages/Routines";
import Exercises from "./pages/Exercises";
import ExerciseDetails from "./pages/ExerciseDetails";
import EditRoutine from "./pages/EditRoutine";
import EditProfile from "./pages/EditProfile";
import EditExercise from "./pages/EditExercise";
import CreateRoutine from "./pages/CreateRoutine";
import CreateExercise from "./pages/CreateRExercise";
import Error from "./pages/err/Error";
import NotFound from "./pages/err/NotFound";

// Components
import Navbar from "./components/Navbar";
import IsAdmin from "./components/IsAdmin";
import AuthRequest from "./components/AuthRequest";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <AuthRequest>
              <Profile />
            </AuthRequest>
          }
        />
        <Route path="/routine-details" element={<RoutineDetails />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/exercise-details" element={<ExerciseDetails />} />
        <Route
          path="/edit-routine"
          element={
            <AuthRequest>
              <EditRoutine />
            </AuthRequest>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <AuthRequest>
              <EditProfile />
            </AuthRequest>
          }
        />
        <Route
          path="/edit-exercise"
          element={
            <IsAdmin>
              <EditExercise />
            </IsAdmin>
          }
        />
        <Route
          path="/create-routine"
          element={
            <AuthRequest>
              <CreateRoutine />
            </AuthRequest>
          }
        />
        <Route
          path="/create-exercise"
          element={
            <IsAdmin>
              <CreateExercise />
            </IsAdmin>
          }
        />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
