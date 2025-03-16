import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const LoginCallback = () => {
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get("token");

    console.log("받은 토큰:", token);

    if (token) {
      try {
        // 토큰이 JSON 형태인지 확인 후 저장
        const parsedToken = JSON.parse(token);
        if (parsedToken.access_token) {
          token = parsedToken.access_token;
        }
      } catch (error) {
        // JSON 파싱 에러 발생 시, token은 그대로 사용
      }

      localStorage.setItem("accessToken", token);
      window.history.replaceState({}, document.title, window.location.pathname);

      // 사용자 정보 가져오기
      const fetchUserData = async () => {
        try {
          const response = await api.get(`/api/users/me`);
          console.log("사용자 정보:", response.data);
          setUser(response.data);
        } catch (error) {
          if (error.response?.status === 401) {
            console.warn("🚨 401 Unauthorized: 로그인 페이지로 이동");
            handleLogout();
          } else {
            console.error("🚨 사용자 정보 로드 오류:", error);
            alert("사용자 정보를 불러올 수 없습니다.");
          }
        }
      };

      fetchUserData();

      // 로그인 성공 후 페이지 이동
      setTimeout(() => {
        navigate("/whole-schedule", { replace: true });
      }, 1000);
    } else {
      alert("로그인 실패! 다시 시도해주세요.");
      navigate("/login");
    }
  }, [navigate]);

  // 🔄 로그아웃 및 로그인 페이지로 이동
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    navigate("/login");
  };

  return (
    <div>
      <h2>로그인 중...</h2>
      {user && (
        <div>
          <p>닉네임: {user.nickName}</p>
          <p>이메일: {user.email}</p>
          <img src={user.picture} alt="프로필 이미지" width="100" />
        </div>
      )}
    </div>
  );
};

export default LoginCallback;
