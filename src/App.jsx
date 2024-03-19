import { useContext } from "react";
import { Routes, Route, useLocation } from "react-router";
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
import { AuthContext } from "./context/auth.context";

function App() {
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);

  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  const showNavbar = isLoggedIn && !isAuthPage;

  return (
    <div>
      {showNavbar && <Navbar />}

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
        <Route
          path="/routine-details/:routineId"
          element={<RoutineDetails />}
        />
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
