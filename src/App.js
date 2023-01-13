import React from "react";
import "./App.css";
import Mapbox from "./components/Mapbox";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
// import Team from "./pages/Team";
// import Publications from "./pages/Publications";


function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* <Route path="/team" element={<Team />} /> */}
        {/* <Route path="/publications" element={<Publications />} /> */}
        <Route path="/" element={<Mapbox />} />
      </Routes>
      {/* <Legend color={colormap} range={activeRange} /> */}
    </div>
  );
}

export default App;
