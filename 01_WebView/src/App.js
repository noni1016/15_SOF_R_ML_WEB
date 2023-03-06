import React from "react";
import Home from "./Home";
import DataSetDetail from "./DataSetDetail";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={'/DataSetDetail/:dataSetId'} element={<DataSetDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
