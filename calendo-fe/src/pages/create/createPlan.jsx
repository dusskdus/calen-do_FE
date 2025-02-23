import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import * as S from "./styled";
import dayjs from 'dayjs';
import "dayjs/locale/ko";
import backIcon from "../../assets/icons/backbtn.svg";

dayjs.locale("ko");

function CreatePlan() {
    const navigate = useNavigate();
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState("9:00 AM");
    const [endTime, setEndTime] = useState("22:00 PM");
    const today = new Date();

    const handleCreate = () => {
        navigate("/time", { state: { date, startTime, endTime } }); // ✅ 시간표 페이지로 데이터 전달
    };

    return (
        <S.Container className="create-plan">
            <S.Header>
                <S.BackButton onClick={()=>navigate(-1)}>
                <img src={backIcon} alt="Back" width="32" height="32" />
                </S.BackButton>
                <S.Title>New Plan Name</S.Title>
            </S.Header>
            <S.Main>
                <S.CalendarWrapper>
                    <S.StyledCalendar 
                        onChange={setDate} 
                        value={date} 
                        next2Label={null}
                        prev2Label={null}
                        selectRange={true}
                        minDate={today} 
                        formatDay ={(locale, date) => dayjs(date).format('DD')}
                        formatMonthYear={(locale, date) => dayjs(date).format('MMMM')}
                    />
                </S.CalendarWrapper>
                <S.TimePickerWrapper>
                    <S.Select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                        <option>9:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>
                        <option>00:00</option>
                    </S.Select>

                    <S.Select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
                        <option>9:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                        <option>22:00</option>
                        <option>23:00</option>
                        <option>00:00</option>
                    </S.Select>
                </S.TimePickerWrapper>

                <S.DatePickerWrapper>
                    <S.Label>일정 선택 마감 시간</S.Label>
                    <S.DateInput placeholder="마감 날짜를 선택해주세요" type="date" />
                </S.DatePickerWrapper>

                <S.Button onClick={handleCreate}>Create</S.Button>
            </S.Main>
        </S.Container>
    );
}

export default CreatePlan;
