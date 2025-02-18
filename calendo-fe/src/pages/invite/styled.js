import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    background-color: #fefdfb;
`;

export const Header = styled.header`
    width: 95%;
    height: 44px;
    display: flex;
    align-items: center;
    position: relative;     
    padding: 20px;
`;

export const BackButton = styled.button`
    position: absolute;
    background: none;
    border: none;
    cursor: pointer;
`;

export const Nav = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    align-items: center;
    margin-bottom: 10px;
    width: 90%;
    height: 100vh;
    background-color: #fff;
    border-radius: 10px;
`;


export const ResultItem = styled.div`
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    padding: 15px 5px;
    font-size: 20px;
`;

export const AddFriendButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        color: #f88b8b;
    }
`;
