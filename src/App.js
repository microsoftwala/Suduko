import "./App.css";
import Suduko from "./components/suduko";
import Sorting from "./components/sorting";
import Home from "./components/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path = "" element={<Home/>}/>
          <Route path="/sudoko" element={<Suduko />} />
          <Route path="/sort" element={<Sorting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
