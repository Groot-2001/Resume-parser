import { Routes, Route } from "react-router-dom";
import './App.css'

import LandingPage from './Pages/LandingPage';
import Analysis from "./Pages/Analysis";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/analysis/:id" element={<Analysis/>}/>
    </Routes>
  )
}

export default App;
