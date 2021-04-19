import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import styled from "styled-components/native";
import { mainBackgroundColor, mainOrange } from "../constants/StyleColors";

const BaseContainer = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${mainBackgroundColor};
`;
const NewSearchButton = styled.TouchableOpacity`
  width: 50%;
  height: 40px;
  background-color: ${mainOrange};
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

const NewSearchText = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
  color: black;
`;
const HeaderText = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
  color: black;
`;

export default function ActiveSearchesScreen() {
  const navigation = useNavigation();
  return (
    <BaseContainer>
      <NewSearchButton
        onPress={() => navigation.navigate("ReportLostPetScreen")}
      >
        <NewSearchText>{"Búa til leit"}</NewSearchText>
      </NewSearchButton>
    </BaseContainer>
  );
}
