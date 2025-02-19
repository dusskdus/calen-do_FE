import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styled";
import backIcon from "../../assets/icons/backbtn.svg";

function CreateTime() {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, startTime, endTime } = location.state || {}; // ✅ 전달된 데이터 받기
    const [selectedTimes, setSelectedTimes] = useState([]); // ✅ 선택된 시간 저장

    // 시간 목록 생성 (ex: 9:00, 9:30, 10:00 ...)
    const generateTimeSlots = () => {
        const times = [];
        let start = parseInt(startTime);
        let end = parseInt(endTime);
        for (let hour = start; hour <= end; hour++) {
            times.push(`${hour}:00`);
            times.push(`${hour}:30`);
        }
        return times;
    };

    // 날짜 목록 생성
    const generateDateColumns = () => {
        if (!date || !Array.isArray(date)) return [];
        const [startDate, endDate] = date;
        let days = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    };

    const timeSlots = generateTimeSlots();
    const dateColumns = generateDateColumns();

    // 드래그로 시간 선택
    const handleMouseDown = (time) => {
        if (selectedTimes.includes(time)) {
            setSelectedTimes(selectedTimes.filter(t => t !== time));
        } else {
            setSelectedTimes([...selectedTimes, time]);
        }
    };

    return (
        <S.Container>
            <S.Header>
                <S.BackButton onClick={()=> navigate(-1)}>
                    <img src={backIcon} alt="Back" width="32" height="32" />
                </S.BackButton>
                <S.Title>New Plan Name</S.Title>
            </S.Header>
            <S.Main>
                <S.Table>
                    <thead>
                        <tr>
                            <th>시간</th>
                            {dateColumns.map((day, index) => (
                                <th key={index}>{day.getMonth() + 1}월 {day.getDate()}일</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time, i) => (
                            <tr key={i}>
                                <td>{time}</td>
                                {dateColumns.map((_, j) => (
                                    <td 
                                        key={j} 
                                        className={selectedTimes.includes(`${time}-${j}`) ? "selected" : ""}
                                        onMouseDown={() => handleMouseDown(`${time}-${j}`)}
                                    />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </S.Table>
            </S.Main>
            <S.Button2>선택 완료</S.Button2>
        </S.Container>
    );
}

export default CreateTime;
