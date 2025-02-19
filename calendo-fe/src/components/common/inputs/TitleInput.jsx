import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    display: flex;
    align-items: center;
    border-radius: 7px;
    border: 0px;
    padding: 13px;
    width: 95%;
    background-color:rgb(255, 255, 255);
    outline: none;
    color:rgb(31, 31, 31);
    ${(props) =>
        props.height &&
        `
        height: ${props.height}px;
    `}
    font-size: 20px;
    font-weight: bold;
    resize: none;
    box-shadow: 0 4px 14px rgba(229, 229, 229, 100);
    margin-bottom: 30px;
`;

function TitleInput(props) {
    const { height, value, onChange, placeholder } = props;

    return (
        <StyledInput
            height={height}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}

export default TitleInput;
