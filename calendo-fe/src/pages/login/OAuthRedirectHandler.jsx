import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token"); // 백엔드에서 토큰을 전달해야 함

    if (token) {
      localStorage.setItem("access_token", token); // ✅ 토큰 저장
      navigate("/whole-schedule"); // 로그인 후 이동할 페이지
    } else {
      alert("로그인 실패!");
      navigate("/login"); // 실패 시 로그인 페이지로 리디렉트
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OAuthRedirectHandler;
