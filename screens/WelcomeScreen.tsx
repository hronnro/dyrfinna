import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";

import { mainBackgroundColor } from "../constants/StyleColors";

const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${mainBackgroundColor};
  align-items: center;
  justify-content: center;
`;

export default function WelcomeScreen({ onPress }: { onPress: Function }) {
  return (
    <Container>
      <Text>{"Welcome Screen"}</Text>
      <TouchableOpacity onPress={() => onPress(true)}>
        <Text>{"Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onPress(false)}>
        <Text>{"Signup"}</Text>
      </TouchableOpacity>
    </Container>
  );
}
