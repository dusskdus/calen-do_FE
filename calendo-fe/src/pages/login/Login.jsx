import React from "react";
import { useNavigate } from "react-router-dom";
import '../login/Login.css';
import googleIcon from "../../assets/images/google.svg";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider: "google" }),
      });

      if (!response.ok) {
        throw new Error("로그인 실패");
      }
      
      const data = await response.json(); // ✅ 서버 응답에서 사용자 데이터 가져오기
      const email = data.email || "unknown@gmail.com"; // 이메일 기본값 설정
      const nickname = email.split("@")[0]; // ✅ 이메일에서 닉네임 추출

      // ✅ 사용자 정보 `localStorage`에 저장
      localStorage.setItem("email", email);
      localStorage.setItem("nickname", nickname);

      navigate("/whole-schedule"); // 로그인 성공 시 일정 페이지로 이동
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">당신의 일정을 한눈에<br />캘린두 📅</h2>
      <p className="login-subtitle">
        일정과 to-do list를 한번에 관리하는 편리함 <br />
        캘린두에서는 유캔두잇 <br />
        환영해요!
      </p>
      
      <hr className="divider" />
      
      <div className="google-login-container" onClick={handleGoogleLogin}>
      <p className="google-login-text">구글 자동 로그인</p>
      <img src={googleIcon} alt="Google 로그인" className="google-login-button" />
        
      </div>
    </div>
  );
};

export default Login;

