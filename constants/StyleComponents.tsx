import styled from "styled-components/native";

import {
  mainBackgroundColor,
  mainOrange,
  textDark,
  textDarkLighter,
} from "./StyleColors";

export const InputBox = styled.TextInput`
  height: 40px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 24px;
  margin-vertical: 7px;
  padding-horizontal: 20px;
  font-family: "MontserratRegular";
  color: ${textDark};
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 47px;
  width: 100%;
  background-color: ${mainOrange};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border-radius: 23px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const TextSmall = styled.Text`
  font-family: "MontserratRegular";
  color: ${textDark};
  font-size: 14px;
`;
