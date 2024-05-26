import "./App.css";
import React from "react";
import { NavBar } from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router basename="/whereIsIt">
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
