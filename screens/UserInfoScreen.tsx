import * as React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import {
  mainBackgroundColor,
  mainOrange,
  textDark,
  textDarkLighter,
} from "../constants/StyleColors";

const BaseContainer = styled.View`
  background-color: ${mainBackgroundColor};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  width: 80%;
`;

const HeaderText = styled.Text`
  color: ${textDark};
  font-family: "MontserratBold";
  font-size: 30px;
  margin-vertical: 20px;
`;

const InputBox = styled.TextInput`
  height: 40px;
  background-color: #ffffff;
  border-radius: 24px;
  margin-vertical: 7px;
  padding-horizontal: 20px;
  font-family: "MontserratRegular";
  color: ${textDark};
`;
const SubmitButton = styled.TouchableOpacity`
  height: 47px;
  width: 100px;
  background-color: ${mainOrange};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border-radius: 23px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const BottomContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  left: 40px;
`;

const AlreadyHaveAccount = styled.Text`
  color: ${textDark};
  font-family: "MontserratRegular";
  font-size: 12px;
`;

export default function UserInfoScreen({ onPress }: { onPress: Function }) {
  let [username, setUsername] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [phoneNumber, setPhoneNumber] = React.useState("");

  return (
    <BaseContainer>
      <Container>
        <HeaderText>{"Nýskráning"}</HeaderText>
        <InputBox
          placeholder="Notendanafn"
          onChangeText={(text) => setUsername(() => text)}
          value={username}
          placeholderTextColor={`${textDarkLighter}`}
        />
        <InputBox
          placeholder="Netfang"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(() => text)}
          value={email}
          placeholderTextColor={`${textDarkLighter}`}
        />
        <InputBox
          placeholder="Farsímanúmer"
          keyboardType="numeric"
          onChangeText={(text) => setPhoneNumber(() => text)}
          value={phoneNumber}
          placeholderTextColor={`${textDarkLighter}`}
        />
        <SubmitButton
          disabled={username === ""}
          onPress={() =>
            onPress({
              id: "",
              name: username,
              email: email,
              phoneNumber: phoneNumber,
            })
          }
        >
          <Ionicons name="arrow-forward-outline" size={36} color="white" />
        </SubmitButton>
      </Container>
      <BottomContainer onPress={() => onPress(null)}>
        <AlreadyHaveAccount>
          {"Áttu aðgang nú þegar? Smelltu hér."}
        </AlreadyHaveAccount>
      </BottomContainer>
    </BaseContainer>
  );
}
