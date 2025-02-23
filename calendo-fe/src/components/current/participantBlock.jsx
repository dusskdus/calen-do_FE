import React from 'react';
import styled from 'styled-components';

const Participant = styled.div`
  display: inline-block;
  padding: 8px 12px;
  margin: 5px;
  color: ${({ isFilled }) => (isFilled ? "#EA6B6B" : "#ddd")};
  border-radius: 5px;
  font-size: 14px;
`;

const ParticipantsBlock = ({ participant }) => {
  return <Participant isFilled={participant !== "?"}>{participant}</Participant>;
};

export default ParticipantsBlock;
