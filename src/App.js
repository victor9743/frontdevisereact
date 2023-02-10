import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Devise from "./components/pages/Devise";
import NewDevise from "./components/pages/NewDevise";

function App() {
  return (
    <div className="container">
      <Router>
          <Routes>
              <Route exact path="/" element={<Devise />} />
              <Route path="/new" element={<NewDevise />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
