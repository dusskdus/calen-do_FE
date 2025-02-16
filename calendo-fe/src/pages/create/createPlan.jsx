import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import * as S from "./styled";
import dayjs from 'dayjs';
import backIcon from "../../assets/icons/backbtn.svg";

function CreatePlan() {
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState("9:00 AM");
    const [endTime, setEndTime] = useState("22:00 PM");

    return (
        <S.Container>
            <S.Header>
                <S.BackButton>
                <img src={backIcon} alt="Back" width="24" height="24" />
                </S.BackButton>
                <S.Title>New Plan Name</S.Title>
            </S.Header>
            
            <S.Main>
                <S.CalendarWrapper>
                    <S.StyledCalendar onChange={setDate} value={date} selectRange={true}
                    formatDay ={(locale, date) => dayjs(date).format('DD')}
                    />
                </S.CalendarWrapper>
                <S.TimePickerWrapper>
                    <S.Select value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                        <option>6:00 PM</option>
                        <option>7:00 PM</option>
                        <option>8:00 PM</option>
                        <option>9:00 PM</option>
                        <option>10:00 PM</option>
                        <option>11:00 PM</option>
                        <option>12:00 M</option>
                    </S.Select>

                    <S.Select value={endTime} onChange={(e) => setEndTime(e.target.value)}>
                    <option>9:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>1:00 PM</option>
                        <option>2:00 PM</option>
                        <option>3:00 PM</option>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                        <option>6:00 PM</option>
                        <option>7:00 PM</option>
                        <option>8:00 PM</option>
                        <option>9:00 PM</option>
                        <option>10:00 PM</option>
                        <option>11:00 PM</option>
                        <option>12:00 AM</option>
                    </S.Select>
                </S.TimePickerWrapper>

                <S.DatePickerWrapper>
                    <S.Label>일정 선택 마감 시간</S.Label>
                    <S.DateInput placeholder="마감 날짜를 선택해주세요" type="date" />
                </S.DatePickerWrapper>

                <S.Button>Create</S.Button>
            </S.Main>
        </S.Container>
    );
}

export default CreatePlan;
