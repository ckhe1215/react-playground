import React from "react";
import { styled } from "styled-components";

const Content = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loader() {
  return <Content>Loading...</Content>;
}
