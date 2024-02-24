import { createContext, useState } from "react";
import { TravelsProvider } from "./Context/TravelsProvider";

import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";


function App() {
  return (
    <>
      <TravelsProvider>
        <AppRoutes />
      </TravelsProvider>
    </>
  );
}

export default App;
