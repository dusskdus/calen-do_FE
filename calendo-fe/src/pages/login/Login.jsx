import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import '../login/Login.css';
import googleIcon from "../../assets/images/google.svg";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // 🔥 OAuth2 로그인 요청 (리디렉트 방식)
    window.location.href = "/oauth2/authorization/google";
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const response = await fetch("/oauth2/authorization/google", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ provider: "google" }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("로그인 실패");
  //     }
      
  //     const userData = await response.json();
  //     const userEmail = userData.email;
  //     const nickname = userEmail.split("@")[0]; // @ 앞부분 추출
  //     const userId = userData.id;

  //     // ✅ 닉네임 설정 요청 (PUT)
  //     await fetch(`/api/users/check-nickname?nickname=${nickname}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" }
  //     });

  //     // ✅ 사용자 정보 `localStorage`에 저장
  //     localStorage.setItem("email", userEmail); // **수정됨**
  //     localStorage.setItem("nickname", nickname);
  //     localStorage.setItem("userId", userId); // ✅ userId도 저장


  //     navigate("/whole-schedule"); // 로그인 성공 시 일정 페이지로 이동
  //   } catch (error) {
  //     console.error("로그인 오류:", error);
  //     alert("로그인에 실패했습니다.");
  //   }
  // };

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

