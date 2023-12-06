import styled from "@emotion/styled";

export const SigninAndSignup = styled.button`
  color: #9e9e9e;
  cursor: pointer;
  display: flex;
  padding: 0px 8px;
  align-items: center;
  text-decoration: none;
  border: none;
  background-color: transparent;
  font-size: 17px;
  border-right: ${(props) => props.borderRight};
  transition: all 0.5s;

  &:hover {
    color: #d32f2f;
  }
`;

export const SpanHeader = styled.span`
  margin-left: 5px;
`;
