import styled from "styled-components";

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

export const Nav = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;     
    position: relative;       
    width: 100%;
    padding: 10px;
    border-bottom: 1.5px solid #DEDEDE;
`;

export const BackButton = styled.button`
    position: absolute;
    left: 20px;
    background: none;
    border: none;
    cursor: pointer;
`;


export const Title = styled.h1`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    flex-grow: 1; 
    margin: 0px;
`;

export const SubTitle = styled.h1`
    font-size: 11px;
    font-weight: 500;
    text-align: center;
    color: #A1A1AA;
    flex-grow: 1; 
    margin: 0px;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;