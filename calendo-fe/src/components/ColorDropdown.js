import React, { useRef } from "react";
import "../styles/CustomDropdown.css"; // 필요하면 스타일 추가

const ColorDropdown = ({ label, selected, onSelect }) => {
  const colorInputRef = useRef(null);

  const handleButtonClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click(); // 버튼 클릭 시 색상 선택창 열기
    }
  };

  return (
    <div className="custom-dropdown">
      <span>{label}</span>
      <button
        onClick={handleButtonClick}
        className="color-display-button"
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: selected,
          border: "1px solid #ccc",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      />
      <input
        ref={colorInputRef}
        type="color"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        style={{ display: "none" }} // 숨김 처리
      />
    </div>
  );
};

export default ColorDropdown;
