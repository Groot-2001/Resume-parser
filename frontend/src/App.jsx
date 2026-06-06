import { Routes, Route } from "react-router-dom";
import './App.css'

import LandingPage from './Pages/LandingPage';
import Analysis from "./Pages/Analysis";
import Ats from "./Pages/Ats";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/analysis/:id" element={<Analysis/>}/>
      <Route path="/ats/:id" element={<Ats/>}/>
    </Routes>
  )
}

export default App;
