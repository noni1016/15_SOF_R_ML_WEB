import React from "react";
import Home from "./Home";
import DataSetDetail from "./DataSetDetail";
import TestResult from "./TestResult";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={'/DataSetDetail/:dataSetId'} element={<DataSetDetail />} />
          <Route path={'/TestResult'} element={<TestResult />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
