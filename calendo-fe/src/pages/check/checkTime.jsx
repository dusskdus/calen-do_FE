import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./styled"
import backIcon from "../../assets/icons/backbtn.svg";


function CheckTime() {
    const navigate = useNavigate();
    const location = useLocation();
    const { date, startTime, endTime, selectedTimes } = location.state || {};

    console.log("date", date)
    console.log("전달", selectedTimes)

    // 선택된 시간이 없으면 빈 Set으로 초기화
    const selectedSet = new Set(selectedTimes || []);

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

    return (
        <S.Container>
            <S.Header>
                <S.BackButton onClick={()=> navigate(-1)}>
                    <img src={backIcon} alt="Back" width="32" height="32" />
                </S.BackButton>
                <S.Title>New Plan Name</S.Title>
            </S.Header>
            <S.Body>
                <S.Table>
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
                                            className={selectedSet.has(timeKey) ? "selected" : ""}
                                        />
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </S.Table>
            </S.Body>
            <S.Bottom>
                <S.SelectButton onClick={()=> navigate(-1)}>수정하기</S.SelectButton>
            </S.Bottom>
        </S.Container>
    );

}

export default CheckTime;