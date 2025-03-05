import { GlobalStyle } from "./styles/globalStyles";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Routes"; // ✅ 수정

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
      
    </>
  );
}

export default App;

