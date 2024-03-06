import React from "react";
import styled from "styled-components";

const TodoHeader: React.FC = () => {
  return (
    <>
      <StTodoHeader>
        <StTodoHeaderTitle>나의 헤더</StTodoHeaderTitle>
      </StTodoHeader>
    </>
  );
};

export default TodoHeader;

const StTodoHeader = styled.header`
  text-align: center;
`;

const StTodoHeaderTitle = styled.h1`
  font-family: "Courier New", Courier, monospace;
  padding: 2.5rem;
`;
