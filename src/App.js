import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataBase from "./components/DataBase";
import Update from "./components/Update";
// import { createContext, useState } from "react";

// export const UpdateContext = createContext();

function App() {
  // const [data, setData] = useState({});
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          {/* <UpdateContext.Provider value={{ data, setData }}> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<DataBase />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
          {/* </UpdateContext.Provider> */}
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
