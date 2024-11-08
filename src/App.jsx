import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Form from "./components/Form";
import Login from "./components/Login";
import Rahu from "./components/Rahu";
import AboutRahu from "./components/AboutRahu";
import Users from "./components/Users";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rahu" element={<Rahu />} />
          <Route path="/aboutrahu" element={<AboutRahu />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
