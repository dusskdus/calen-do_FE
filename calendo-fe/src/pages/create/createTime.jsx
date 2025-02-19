import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styled";
import backIcon from "../../assets/icons/backbtn.svg";

function CreateTime() {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, startTime, endTime } = location.state || {}; // ✅ 전달된 데이터 받기
    const [selectedTimes, setSelectedTimes] = useState(new Set()); // ✅ 선택된 시간 저장
    const [isMouseDown, setIsMouseDown] = useState(false);

    //시간 목록 생성
    const generateTimeSlots = () => {
        if (!startTime || !endTime) return [];
        const times = [];
        let start = parseInt(startTime);
        let end = parseInt(endTime);
        if (isNaN(start) || isNaN(end) || start > end) return [];

        for (let hour = start; hour <= end; hour++) {
            times.push(`${hour}:00`);
            times.push(`${hour}:30`);
        }
        return times;
    };

    //날짜 목록 생성
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

    //클릭 시 선택/해제
    const handleMouseDown = (time) => {
        setIsMouseDown(true);
        setSelectedTimes(prev => {
            const newSet = new Set(prev);
            newSet.has(time) ? newSet.delete(time) : newSet.add(time);
            return newSet;
        });
    };

    //드래그 시 선택 추가
    const handleMouseMove = (time) => {
        if (isMouseDown) {
            setSelectedTimes(prev => {
                const newSet = new Set(prev);
                newSet.add(time);
                return newSet;
            });
        }
    };

    //check 페이지로 시간 데이터 전송
    const handleCreate = () => {
        navigate("/check", { state: { date, startTime, endTime, selectedTimes: Array.from(selectedTimes) } });
    };
    

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    return (
        <S.Container>
            <S.Header>
                <S.BackButton onClick={()=> navigate(-1)}>
                    <img src={backIcon} alt="Back" width="32" height="32" />
                </S.BackButton>
                <S.Title>New Plan Name</S.Title>
            </S.Header>
            <S.Body>
                <S.Table onMouseUp={handleMouseUp}>
                    <thead>
                        <tr>
                            <th></th>
                            {dateColumns.map((day, index) => (
                                <th key={index}>{day.getMonth() + 1}월 {day.getDate()}일</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((time, i) => (
                            <tr key={i}>
                                <td>{time}</td>
                                {dateColumns.map((_, j) => {
                                    const timeKey = `${time}-${j}`;
                                    return (
                                        <td 
                                            key={j} 
                                            className={selectedTimes.has(timeKey) ? "selected" : ""}
                                            onMouseDown={() => handleMouseDown(timeKey)}
                                            onMouseMove={() => handleMouseMove(timeKey)}
                                        />
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </S.Table>
            </S.Body>
            <S.Bottom>
                <S.SelectButton onClick={handleCreate}>선택 완료</S.SelectButton>
            </S.Bottom>
        </S.Container>
    );
}

export default CreateTime;
