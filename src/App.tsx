import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import { GlobalStyle } from "./style/GlobalStyle";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
