import * as React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { mainOrange } from "../constants/StyleColors";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const BaseContainer = styled.View`
  background-color: ${mainOrange};
  height: 100px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-end;
  border-bottom-left-radius: 50px;
`;
const TitleContainer = styled.View`
  margin-left: 20px;
  flex-direction: row;
`;
const TitleText = styled.Text`
  color: white;
  font-family: "MontserratBold";
  font-size: 28px;
  margin-left: 15px;
  margin-bottom: 10px;
`;
export default function Header({ title }: { title: String }) {
  const navigation = useNavigation();
  return (
    <BaseContainer>
      <TitleContainer>
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        >
          <Ionicons name="chevron-back-outline" size={35} color="white" />
        </TouchableOpacity>
        <TitleText>{title}</TitleText>
      </TitleContainer>
    </BaseContainer>
  );
}
