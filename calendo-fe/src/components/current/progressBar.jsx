import React from 'react';
import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  width: 80%;
  height: 20px;
  background: #eee;
  border-radius: 10px;
  margin: 10px 0;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: #EA6B6B;
  transition: width 0.3s ease-in-out;
`;

const ProgressBar = ({ headCount, participants }) => {
  const progress = (participants.length / headCount) * 100;

  return (
    <ProgressBarWrapper>
      <Progress progress={progress} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
