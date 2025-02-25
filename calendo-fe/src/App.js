import AppRouter from "./Routes";
import { GlobalStyle } from "./styles/globalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import WholeSchedule from "./pages/schedule/WholeSchedule";
import OAuthRedirectHandler from "./pages/login/OAuthRedirectHandler"; // ✅ 추가


function App() {
  return (
    <>
    <GlobalStyle />
    <Router>
      {/* 🔥 `Routes` 태그 안에 `Route`를 감싸야 함 */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/oauth2/code/google" element={<OAuthRedirectHandler />} />
        <Route path="/whole-schedule" element={<WholeSchedule />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
