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
    height: 100vh;
    background: #FFFDFD;
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
    justify-content: space-around;
    width: 90%;
    margin: 10px 0;
`;

export const Select = styled.select`
    width: 28%;
    padding: 6px;
    border-radius: 8px;
    border: 1px solid #ccc;
`;

export const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin: 8px 0;
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
export const Body = styled.div`
    position: relative;
    margin-top: 30px;
    width: 85%;
    padding-bottom: 20px;
    height: calc(100vh - 100px); 
    overflow: auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: separate; /* ✅ 셀의 경계를 개별적으로 유지 */
    border-spacing: 0; /* ✅ 셀 사이의 간격 제거 */
    text-align: center;
    color: #545454;
    background-color: #FFFFFF;
    margin-bottom: 60px;
    table-layout: fixed;
    border-radius: 10px;
    border: 1px solid ##dfdfdf; /* ✅ 테이블 전체 테두리 */
    overflow: hidden;

    th, td {
        width: 70px;
        height: 23px;
        font-weight: 400;
        line-height: 130%;
        overflow: hidden;
        white-space: nowrap;
        border: 1px solid #dfdfdf; /* ✅ 개별 셀 테두리 유지 */
    }

    /* ✅ 테이블 상단 헤더 스타일 */
    thead {
        position: sticky;
        height: 33px;
        font-size: 15px;
        top: 0;
        z-index: 20;
        background-color: #FFFFFF;
        border-bottom: 1px solid #dfdfdf; /* ✅ 헤더와 본문을 구분하는 선 추가 */
    }

    /* ✅ 첫 번째 열(시간) 스타일 */
    td:first-child, th:first-child {
        width: 55px;
        position: sticky;
        font-size: 13px;
        left: 0;
        z-index: 15;
        background-color: #FFFFFF;
        border-right: 1px solid #dfdfdf; /* ✅ 시간 칸의 오른쪽 테두리를 더 두껍게 설정 */
    }

    /* ✅ 둥근 테두리 적용 */
    thead th:first-child {
        border-top-left-radius: 10px;
    }

    thead th:last-child {
        border-top-right-radius: 10px;
    }

    tbody tr:last-child td:first-child {
        border-bottom-left-radius: 10px;
    }

    tbody tr:last-child td:last-child {
        border-bottom-right-radius: 10px;
    }
        
    thead {
        position: sticky;
        background-color: #FFFFFF;
        top: 0;
        z-index: 20;
    }

    td:first-child, th:first-child {
        position: sticky;
        left: 0;
        z-index: 15;
        background-color: #FFFFFF; /* 고정된 열의 배경색 */
    }

    .selected {
        background-color: pink; /* ✅ 선택된 시간 칸 스타일 */
    }
`;


export const Bottom = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 0px;
    max-width: 412px;
    width: 100%;
    height: 80px;
    background:#FFF8F8;
    border-radius: 14px 14px 0 0;
    z-index: 100;
`;

export const SelectButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 80px);
    height: 44px;
    margin: 0px auto;
    background-color: #EA6B6B;
    color: white;
    font-size: 20px;
    font-weight: 600;
    border: none;
    border-radius: 7px;
`;
