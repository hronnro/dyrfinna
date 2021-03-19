import * as React from "react";
import styled from "styled-components/native";
import { mainBackgroundColor } from "../constants/StyleColors";

const BaseContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${mainBackgroundColor};
`;

const HeaderText = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
  color: black;
`;

export default function ActiveSearchesScreen() {
  return (
    <BaseContainer>
      <HeaderText>Here we'll show a list of all active searches</HeaderText>
    </BaseContainer>
  );
}
