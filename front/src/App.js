import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Quiz from "./components/Quiz";
import Dashboard from "./components/Dashboard";

export default function App() {
  const navigate = useNavigate();
  return (
    //Use Routes to define application routes
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/preference" element={<Quiz onDone={() => navigate("/dashboard")} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  );
}