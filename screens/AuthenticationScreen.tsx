import React from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components/native";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { firebaseConfig } from "../firebase";
import { createUser, getUser } from "../api/UserStore";
import { useStateContext } from "../globalState";
import { ActionType } from "../reducer";
import { mainBackgroundColor, mainOrange } from "../constants/StyleColors";
import {
  InputBox,
  SubmitButton,
  TextSmall,
} from "../constants/StyleComponents";

const BaseContainer = styled.KeyboardAvoidingView`
  background-color: ${mainBackgroundColor};
  height: 100%;
  padding: 0 10%;
  justify-content: center;
  align-items: center;
`;

const TextButtonLabel = styled(TextSmall)`
  color: white;
  font-family: "MontserratBold";
`;

const TextError = styled(TextSmall)`
  color: ${mainOrange};
`;

enum Status {
  VerifyOnMount = "VerifyOnMount",
  EnterPhoneNumber = "EnterPhoneNumber",
  SendingVerificationCode = "SendingVerificationCode",
  EnterVerificationCode = "EnterVerificationCode",
  VerifyingCode = "VerifyingCode",
}

export default function AuthenticationScreen({ route }) {
  const { userInfo } = route.params;
  const { state, dispatch } = useStateContext();

  const recaptchaVerifier = React.useRef(null);

  const getNumberWithCountryCode = (phoneNumber) => {
    if (phoneNumber == null || phoneNumber.length < 7) {
      return null;
    } else if (phoneNumber.replaceAll(" ", "").length == 7) {
      return "+354" + phoneNumber.replaceAll(" ", "");
    } else {
      return phoneNumber.replaceAll(" ", "");
    }
  };

  const [phoneNumber, setPhoneNumber] = React.useState(() =>
    userInfo == null ? null : getNumberWithCountryCode(userInfo.phoneNumber)
  );
  const [status, setStatus] = React.useState(() =>
    phoneNumber == null ? Status.EnterPhoneNumber : Status.VerifyOnMount
  );
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [message, showMessage] = React.useState(null);

  React.useEffect(() => {
    if (
      status == Status.VerifyOnMount &&
      phoneNumber != null &&
      recaptchaVerifier.current != null
    ) {
      sendVerificationCode();
    }
  }, [recaptchaVerifier.current]);

  let sendVerificationCode = async () => {
    setStatus(Status.SendingVerificationCode);
    showMessage(null);
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();

      const verificationResultId = await phoneProvider.verifyPhoneNumber(
        getNumberWithCountryCode(phoneNumber),
        recaptchaVerifier.current
      );

      setVerificationId(verificationResultId);
      setStatus(Status.EnterVerificationCode);
      showMessage({
        text: "Augnablik, staðfestingarkóðinn er á leiðinni...",
        error: false,
      });
    } catch (error) {
      console.log("verifyPhoneNumber error", error);
      setStatus(Status.EnterPhoneNumber);
      showMessage({
        text:
          "Ekki tókst að senda staðfestingarkóða. Athugaðu hvort símanúmerið sé rétt slegið inn.",
        error: true,
      });
    }
  };

  let createNewUser = (userId, phoneNumber) => {
    if (userInfo != null) {
      const user = { ...userInfo, id: userId, phoneNumber };
      createUser(user); // TODO: handle if this fails
    } else {
      setStatus(Status.EnterPhoneNumber);
      showMessage({
        text:
          "Notandi fannst ekki. Prófaðu aftur með öðru símanúmeri eða stofnaðu nýjan notanda.",
        error: true,
      });
    }
  };

  return (
    <BaseContainer behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      {message ? (
        <View>
          {message.error ? (
            <TextError
              style={{
                textAlign: "center",
                margin: 20,
              }}
            >
              {message.text}
            </TextError>
          ) : (
            <TextSmall
              style={{
                textAlign: "center",
                margin: 20,
              }}
            >
              {message.text}
            </TextSmall>
          )}
        </View>
      ) : null}
      {status == Status.EnterPhoneNumber ? (
        <>
          <TextSmall
            style={{ marginTop: 20, textAlign: "left", width: "100%" }}
          >
            Símanúmer
          </TextSmall>
          <InputBox
            style={{ marginVertical: 10, fontSize: 17 }}
            placeholder="999 9999"
            autoFocus={status == Status.EnterPhoneNumber}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            onChangeText={(number) => setPhoneNumber(number)}
          />
          <SubmitButton
            disabled={!phoneNumber}
            onPress={async () => {
              sendVerificationCode();
            }}
          >
            <TextButtonLabel>Senda staðfestingu</TextButtonLabel>
          </SubmitButton>
        </>
      ) : null}
      {status == Status.EnterVerificationCode ? (
        <>
          <TextSmall style={{ marginTop: 20 }}>Staðfestingarkóði</TextSmall>
          <InputBox
            style={{ marginVertical: 10, fontSize: 17 }}
            editable={phoneNumber != null}
            placeholder="123456"
            keyboardType="number-pad"
            autoFocus={
              status == Status.VerifyOnMount ||
              status == Status.EnterVerificationCode
            }
            onChangeText={setVerificationCode}
          />
          <SubmitButton
            disabled={!verificationId || !verificationCode}
            onPress={async () => {
              setStatus(Status.VerifyingCode);
              showMessage(null);
              try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                  verificationId,
                  verificationCode
                );
                await firebase
                  .auth()
                  .signInWithCredential(credential)
                  .then((result) => {
                    if (result.additionalUserInfo.isNewUser) {
                      createNewUser(
                        result.user.uid,
                        getNumberWithCountryCode(phoneNumber)
                      );
                    } else {
                      getUser(result.user.uid)
                        .then((user) => {
                          dispatch({
                            type: ActionType.SIGN_IN,
                            payload: user,
                          });
                        })
                        .catch(() => {
                          /**
                           * User might have tried to log in without owning an account
                           * so firebase marks the user as !isNewUser.
                           * In this case we make sure to create the account as
                           * no current account was found.
                           */
                          createNewUser(
                            result.user.id,
                            getNumberWithCountryCode(phoneNumber)
                          );
                        });
                    }
                  });
              } catch (error) {
                console.log("verify code error", error);
                setStatus(Status.EnterVerificationCode);
                showMessage({
                  text: `Staðfesting tókst ekki. Kannaðu hvort staðfestingarkóðinn sé réttur.`,
                  error: true,
                });
              }
            }}
          >
            <TextButtonLabel>Staðfesta</TextButtonLabel>
          </SubmitButton>
          <TouchableOpacity
            style={{ marginTop: 40 }}
            onPress={() => {
              showMessage(null);
              setStatus(Status.EnterPhoneNumber);
            }}
          >
            <TextSmall>Nota annað símanúmer</TextSmall>
          </TouchableOpacity>
        </>
      ) : null}
      {status == Status.SendingVerificationCode ? (
        <View>
          <TextSmall
            style={{
              textAlign: "center",
              margin: 20,
            }}
          >
            {"Sendi staðfestingarkóða..."}
          </TextSmall>
        </View>
      ) : null}
      {status == Status.VerifyingCode ? (
        <View>
          <TextSmall
            style={{
              textAlign: "center",
              margin: 20,
            }}
          >
            {"Augnablik..."}
          </TextSmall>
        </View>
      ) : null}
    </BaseContainer>
  );
}
