import styled from 'styled-components';

export const UIContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: start;
  row-gap: 20px;
  
  background: dimgrey;
  
  position: absolute;
  bottom: 0;
  left: 0;
  
  width: 400px;
  height: calc(100vh - 60px);
  color: white;
  
  padding: 15px;
  
  z-index: 9;
`;

export const ParagraphContainer = styled.div``;

export const StyledList = styled.ul``;

export const StyledHeading = styled.h1``;

export const StyledParagraph = styled.p`
  font-size: 12px;
  font-weight: bold;
`;
