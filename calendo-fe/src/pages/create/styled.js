import styled from "styled-components";
import Calendar from "react-calendar";


/*plan css*/
export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
    width: 100%;
    max-width: 412px;
    height: calc(30px + 100vh);
    background: #FFFCFC;
    margin: 0px auto;
    overflow: hidden;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;     
    position: relative;       
    width: 95%;
    padding: 20px;
`;


export const BackButton = styled.button`
    position: absolute;
    left: 20px;
    background: none;
    border: none;
    cursor: pointer;
`;


export const Title = styled.h1`
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    flex-grow: 1; 
    margin: 0px;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
`;

export const CalendarWrapper = styled.div`
    width: 90%;
    margin: 20px 0;
    background: #ffecec;
    padding: 10px;
    border-radius: 12px;
`;



export const TimePickerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 10px 0;
`;

export const Select = styled.select`
    width: 40%;
    padding: 8px;
    border-radius: 50px;
    border: 1px solid #ccc;
`;

export const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin: 10px 0;
`;

export const Label = styled.label`
    font-size: 14px;
    color: #000;
    margin: 15px;
`;

export const DateInput = styled.input`
    width: 50%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const Button = styled.button`
    width: 50%;
    padding: 12px;
    margin-top: 20px;
    font-size: 24px;
    font-weight: 600;
    background-color: #EA6B6B;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
    }
`;

export const StyledCalendar = styled(Calendar)`
    width: 100%;
    background: #fff5f5;
    border-radius: 12px;
    padding: 30px;
    border: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    
    /* 네비게이션(월 변경 버튼 포함) */
    .react-calendar__navigation {
        display: flex; /* 네비게이션 유지 */
        font-size: 18px;
        justify-content: center; /* 가운데 정렬 */
        align-items: center;
        margin-bottom: 10px;
    }

    /* 네비게이션 안의 월/연도 버튼 스타일 */
    .react-calendar__navigation button {
        background: transparent;
        border: none;
        font-size: 20px;
        font-weight: bold;
        color: rgb(49, 49, 49);
        cursor: default;
    }

    /* 요일 (SUN, MON 등) */
    .react-calendar__month-view__weekdays {
        text-transform: uppercase;
        font-size: 13px;
        font-weight: 400;
        color: rgb(163, 163, 163);
    }

    .react-calendar__month-view__weekdays abbr[title] {
    text-decoration: none !important; /* ✅ 점선 제거 */
    border-bottom: none !important; /* ✅ 혹시 모를 밑줄 제거 */
    }


    /* 날짜 선택 */
    .react-calendar__tile {
        border-radius: 8px;
        padding: 10px;
        background: transparent;
        transition: 0.3s;
    }

    /* 오늘 날짜 */
    .react-calendar__tile--now {
        background: #FFE3E3;
        font-weight: bold;
        color: #ff6b6b;
        border-radius: 8px;
    }

    /* 선택된 날짜 */
    .react-calendar__tile--active {
        background: #EA6B6B;
        color: white;
        font-weight: bold;
        border-radius: 35px;
    }

    /* hover 시 스타일 */
    .react-calendar__tile:hover {
        background: #ff6b6b33;
        border-radius: 35px;
    }
    `;

/* time */

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: center;
    }
    .selected {
        background-color: pink; /* ✅ 선택된 시간 칸 스타일 */
    }
`;

export const Button2 = styled.button`
    width: 100%;
    padding: 10px;
    background-color: pink;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
`;
