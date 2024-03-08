import TodoMainPage from "./components/TodoMainPage";

import { GlobalStyle } from "./style/GlobalStyle";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <TodoMainPage />
    </>
  );
};

export default App;
