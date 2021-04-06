import * as React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard, Platform, View } from "react-native";

import {
  mainBackgroundColor,
  mainOrange,
  textDark,
  textDarkLighter,
} from "../constants/StyleColors";

import { InputBox, SubmitButton } from "../constants/StyleComponents";

const BaseContainer = styled.KeyboardAvoidingView`
  background-color: ${mainBackgroundColor};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
`;

const Logo = styled.Image`
  height: 150px;
`;

const Container = styled.TouchableOpacity`
  width: 80%;
`;

const HeaderText = styled.Text`
  color: ${textDark};
  font-family: "MontserratBold";
  font-size: 30px;
  margin-vertical: 20px;
`;

const BottomContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  text-align: center;
`;

const AlreadyHaveAccount = styled.Text`
  color: ${textDark};
  font-family: "MontserratRegular";
  font-size: 12px;
  text-align: center;
`;

const NextSubmitButton = styled(SubmitButton)`
  width: 100px;
`;

export default function UserInfoScreen({ onPress }: { onPress: Function }) {
  let [username, setUsername] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [phoneNumber, setPhoneNumber] = React.useState("");

  let emailInput = React.useRef(null);
  let phoneInput = React.useRef(null);

  return (
    <BaseContainer behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Container activeOpacity={1} onPress={Keyboard.dismiss}>
        <LogoContainer>
          <Logo
            source={require("../assets/images/dyrfinna.png")}
            resizeMode={"contain"}
          />
        </LogoContainer>

        <HeaderText>{"Nýskráning"}</HeaderText>
        <InputBox
          placeholder="Notendanafn"
          onChangeText={(text) => setUsername(() => text)}
          value={username}
          placeholderTextColor={`${textDarkLighter}`}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() =>
            emailInput.current && emailInput.current.focus()
          }
        />
        <InputBox
          placeholder="Netfang"
          keyboardType="email-address"
          onChangeText={(text) => setEmail(() => text)}
          value={email}
          placeholderTextColor={`${textDarkLighter}`}
          ref={emailInput}
          blurOnSubmit={false}
          onSubmitEditing={() =>
            phoneInput.current && phoneInput.current.focus()
          }
        />
        <InputBox
          placeholder="Farsímanúmer"
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={(text) => setPhoneNumber(() => text)}
          value={phoneNumber}
          placeholderTextColor={`${textDarkLighter}`}
          ref={phoneInput}
        />
        <View style={{ alignSelf: "flex-end" }}>
          <NextSubmitButton
            disabled={username === "" || phoneNumber === ""}
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
          </NextSubmitButton>
        </View>
      </Container>
      <BottomContainer onPress={() => onPress(null)}>
        <AlreadyHaveAccount>
          {"Áttu aðgang nú þegar? Smelltu hér."}
        </AlreadyHaveAccount>
      </BottomContainer>
    </BaseContainer>
  );
}
