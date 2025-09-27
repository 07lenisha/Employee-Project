import WelcomePage from "./components/WelcomePage";
import ListEmployees from "./components/ListEmployees";
import Home from "./components/Home";
import Import from "./components/Import";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import EmployeeDetails from "./components/EmployeeDetails";

function App() {
  return (
    <>
      <div>
        <nav className="bottom-nav">
          <Link to="/home" className="tab">HomePage</Link>
          <Link to="/import" className="tab"> Import</Link>
        </nav>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/import" element={<Import />} />
          <Route path="/employees/:empId" element={<EmployeeDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
