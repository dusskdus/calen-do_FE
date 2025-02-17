import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";
import bigprofileIcon from "../assets/images/bigprofile.svg"; // 기본 프로필 아이콘
import { FaArrowLeft } from "react-icons/fa"; // 뒤로 가기 아이콘
import backIcon from "../assets/images/backicon.svg";

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", nickname: "" });

  useEffect(() => {
    // ✅ `localStorage`에서 사용자 정보 가져오기
    const email = localStorage.getItem("email") || "unknown@gmail.com";
    const nickname = localStorage.getItem("nickname") || "unknown";

    setUser({ email, nickname });
  }, []);

  return (
    <div className="mypage-container">
      {/* 상단 네비게이션 */}
      <div className="mypage-header">
        <img src={backIcon} className="back-icon" onClick={() => navigate(-1)} />
      </div>

      {/* 프로필 영역 */}
      <div className="profile-section">
        <div className="profile-container">
          <img src={bigprofileIcon} alt="프로필 아이콘" className="profile-icon" />
        </div>
      </div>

   {/* 유저 정보 */}
   <div className="user-info">
        <h3 className="section-title">내 정보</h3>

        <div className="info-box">
          <label className="info-label">닉네임 :</label>
          <input type="text" value={user.nickname} readOnly className="info-input" />
        </div>

        <div className="info-box">
          <label className="info-label">이메일 :</label>
          <input type="text" value={user.email} readOnly className="info-input" />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
