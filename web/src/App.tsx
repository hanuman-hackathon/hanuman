import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ClassesPage from "./pages/classes/Classes";
import ClassPage from "./pages/class/Class";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/classes/:classId" element={<ClassPage />} />
        <Route path="*" element={<Navigate to="/classes" />} />
      </Routes>
    </Router>
  );
}

export default App;
