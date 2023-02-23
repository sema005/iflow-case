import React, { useState } from "react";
import ShowWorkHours from "./pages/ShowWorkHours";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ShowWorkHours data={data} setData={setData} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
