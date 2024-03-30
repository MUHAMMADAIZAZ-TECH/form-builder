import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "./routes/routes";
import { Layout } from "./pages";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} >
          {AppRoutes &&
            AppRoutes.map((route, index) => (
              <Route
                index={route.index}
                key={index}
                path={!route.index ? `${route.path}` : undefined}
                element={route.element}
              />
            ))}
        </Route>
      </Routes>
    </div>
  );
};


export default App;
