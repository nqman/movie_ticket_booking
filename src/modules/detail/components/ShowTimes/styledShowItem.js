import styled from "@emotion/styled";

export const Item = styled.div`
  background-color: ${(props) => props.backgroundColor};
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px,
    rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 5px;
  padding: ${(props) => props.p};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background-color: #e829005e;
  }
`;

export const NameCinema = styled.h3`
  color: rgb(139, 195, 74);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.167;
  letter-spacing: 0em;
`;

export const ButtonCinema = styled.button`
  color: #108f3e;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  border: 1px solid #e4e4e4;
  cursor: pointer;
  margin: 0px 16px 16px 0px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(246, 246, 246, 0.5);
  transition: all 0.3s;
  &:hover {
    color: red;
    font-weight: bold;
  }
`;
