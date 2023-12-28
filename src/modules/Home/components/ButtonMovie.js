import styled from "@emotion/styled";

export const ButtonMovie = styled.button`
  box-sizing: border-box;
  font-weight: 500;
  border-radius: 10px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #fb4226;
  color: #fff;
  border-color: #fb4226;
  height: ${(props) => props.height};
  padding: 0 10px;
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  position: ${(props) => props.position};
  bottom: ${(props) => props.bot};
  left: ${(props) => props.left};
  transition: all 0.5s;

  @media (max-width: 600px) {
    position: inherit;
  }

  &:hover {
    background-color: rgb(175, 46, 26);
  }
`;
