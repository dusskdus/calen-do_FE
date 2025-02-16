import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";
import bigprofileIcon from "../assets/images/bigprofile.svg"; // 기본 프로필 아이콘
import { FaArrowLeft } from "react-icons/fa"; // 뒤로 가기 아이콘
import backIcon from "../assets/images/backicon.svg";

const MyPage = () => {
  const navigate = useNavigate();

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
        <div className="info-row">
          <span className="info-label">닉네임 정보</span>
          <span className="info-value">suhyeon</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">이메일</span>
          <span className="info-value">suhyeon@gmail.com</span>
        </div>
      </div>

      {/* 1:1 문의 */}
      <div className="inquiry-section">
        <span className="inquiry-label">1:1 문의</span>
      </div>
    </div>
  );
};

export default MyPage;
