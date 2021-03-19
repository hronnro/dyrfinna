import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";

import * as firebase from "firebase";
import { firebaseConfig } from "../firebase";
import Firebase from "../Firebase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { createUser, getUser } from "../api/UserStore";
import { User } from "../FirestoreModels";
import { useStateContext } from "../globalState";
import { ActionType } from "../reducer";

export default function AuthenticationScreen({ route }) {
  const { userInfo } = route.params;
  const { state, dispatch } = useStateContext();
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();

  const [message, showMessage] = React.useState(
    !firebaseConfig || Platform.OS === "web"
      ? {
          text:
            "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
        }
      : undefined
  );
  const attemptInvisibleVerification = true;

  function createNewUser(userId) {
    if (userInfo != null) {
      const user = { ...userInfo, id: userId };
      createUser(user); // TODO: handle if this fails
    } else {
      showMessage({
        text: `No user found - go back and fill in information!`,
        color: "red",
      });
    }
  }

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <Text style={{ marginTop: 20 }}>Enter phone number</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        placeholder="+1 999 999 9999"
        autoFocus
        autoCompleteType="tel"
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />
      <Button
        title="Send Verification Code"
        disabled={!phoneNumber}
        onPress={async () => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
              text: "Verification code has been sent to your phone.",
            });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
      <TextInput
        style={{ marginVertical: 10, fontSize: 17 }}
        editable={!!verificationId}
        placeholder="123456"
        onChangeText={setVerificationCode}
      />
      <Button
        title="Confirm Verification Code"
        disabled={!verificationId}
        onPress={async () => {
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
                  console.log("About to create new user!");
                  createNewUser(result.user.uid);
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
                      createUser(result.user.uid);
                    });
                }
              });
          } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
          }
        }}
      />
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: "center" },
          ]}
          onPress={() => showMessage(undefined)}
        >
          <Text
            style={{
              color: message.color || "blue",
              fontSize: 17,
              textAlign: "center",
              margin: 20,
            }}
          >
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : undefined}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
  );
}
