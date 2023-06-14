import './App.css';
import React from "react"
import { Routes, Route} from "react-router-dom"
import Home from './components/Home';
import Journey from './components/Journey';
function App() {


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/journey/:journeyName' element={<Journey />}></Route>
      </Routes>
    </div>
  );
}

export default App;
