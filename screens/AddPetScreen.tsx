import * as React from "react";
import styled from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Coordinates, Pet, User } from "../FirestoreModels";
import {
  errorRed,
  mainBackgroundColor,
  mainOrange,
  placeholder,
  textDark,
} from "../constants/StyleColors";
import Header from "../components/Header";
import LocationPicker from "./LocationPicker";
import { createPet } from "../api/PetStore";
import { Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BaseContainer = styled.TouchableOpacity`
  height: 100%;
  align-items: center;
  background-color: ${mainBackgroundColor};
`;

const InfoContainer = styled.View`
  margin-top: 20px;
  width: 85%;
`;
const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const InfoInput = styled.TextInput`
  margin-top: 10px;
  font-family: "MontserratRegular";
  font-size: 14px;
  background-color: white;
  width: 49%;
  height: 36px;
  border-radius: 18px;
  padding-horizontal: 10px;
`;
const MissingPickerValueContainer = styled.TouchableOpacity`
  margin-top: 10px;
  font-family: "MontserratRegular";
  font-size: 14px;
  background-color: white;
  width: 49%;
  height: 36px;
  border-radius: 18px;
  padding-horizontal: 10px;
  justify-content: center;
`;
const MissingPickerValueText = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
  color: ${placeholder};
`;

const DescriptionInput = styled(InfoInput)`
  padding-top: 10px;
  padding-left: 10px;
  height: 60px;
  width: 100%;
`;

const LocationContainer = styled.View`
  position: absolute;
`;
const LocationButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 49%;
  height: 36px;
  border-color: ${mainOrange};
  border-width: 2px;
  align-self: center;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
const LocationButtonText = styled.Text`
  font-family: "MontserratBold";
  font-size: 16px;
  color: ${mainOrange};
`;

const PickerValueContainer = styled.TouchableOpacity`
  width: 49%;
  margin-top: 10px;
  background-color: white;
  width: 49%;
  height: 36px;
  border-radius: 18px;
  padding-horizontal: 10px;
  justify-content: center;
`;

const PickerValueContainerView = styled.View`
  width: 49%;
  margin-top: 10px;
  background-color: white;
  width: 49%;
  height: 36px;
  border-radius: 18px;
  padding-horizontal: 10px;
  justify-content: center;
`;

const PickerValue = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
`;

const DatePickerContainer = styled.View`
  position: absolute;
  margin-top: 10px;
  padding-left: 12px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  width: 50%;
  height: 10%;
`;

const PickerBackground = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #00000066;
`;
const PickerContainer = styled.View`
  background-color: ${mainBackgroundColor};
  padding-vertical: 40px;
  width: 70%;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
`;

const PickerItem = styled.TouchableOpacity`
  background-color: white;
  margin: 5px;
  padding: 5px;
  width: 60%;
  height: 30px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  border-color: ${mainOrange};
  border-width: 1px;
`;
const PickerItemText = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
  color: ${textDark};
`;

const SubmitButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  width: 80%;
  height: 55px;
  background-color: ${mainOrange};
  align-self: center;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const SubmitButtonText = styled.Text`
  font-family: "MontserratBold";
  color: white;
  font-size: 20px;
`;

const ErrorContainer = styled.View`
  width: 85%;
  margin-top: 15px;
`;
const ErrorMessage = styled.Text`
  font-family: "MontserratRegular";
  color: ${errorRed};
  font-size: 14px;
`;
type pickerType = {
  label: string;
  value: string;
};

let petGenders: Array<pickerType> = [
  {
    label: "Kvenkyns",
    value: "female",
  },
  {
    label: "Karlkyns",
    value: "male",
  },
];

let petCategories: Array<pickerType> = [
  {
    label: "Hundur",
    value: "dog",
  },
  {
    label: "Köttur",
    value: "cat",
  },
  {
    label: "Páfagaukur",
    value: "parrot",
  },
  {
    label: "Hamstur",
    value: "hamster",
  },
];

let petSizes: Array<pickerType> = [
  {
    label: "Lítið",
    value: "small",
  },
  {
    label: "Miðlungs",
    value: "medium",
  },
  {
    label: "Stórt",
    value: "large",
  },
];

export default function AddPetScreen({ user }: { user: User }) {
  let [petName, setPetName] = React.useState("");
  let [chipNumber, setChipNumber] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [petCategory, setPetCategory] = React.useState<pickerType | null>(null);
  let [petAge, setPetAge] = React.useState(new Date());
  let [petBreed, setPetBreed] = React.useState("");
  let [petGender, setPetGender] = React.useState<pickerType | null>(null);
  let [petSize, setPetSize] = React.useState<pickerType | null>(null);
  let [petAddress, setPetAddress] = React.useState<undefined | Coordinates>(
    undefined
  );
  let [showLocation, setShowLocation] = React.useState(false);
  let [showCategoryPicker, setShowCategoryPicker] = React.useState(false);
  let [showGenderPicker, setShowGenderPicker] = React.useState(false);
  let [showSizePicker, setShowSizePicker] = React.useState(false);
  let [errorMessage, setErrorMessage] = React.useState<null | string>(null);
  const navigation = useNavigation();
  const validate = () => {
    if (petName != "" && petCategory && petGender && petSize) {
      let pet: Pet = {
        id: "" /* ID gets generated by firebase */,
        name: petName,
        ownerId: user.id,
        photos: undefined,
        chipId: chipNumber,
        petType: petCategory.value,
        gender: petGender.value,
        breed: petBreed,
        birthDate: petAge,
        homeAddress: petAddress,
        size: petSize.value,
        description: description,
      };
      createPet(user, pet);
    } else {
      let errors = [];
      if (petName == "") {
        errors.push("nafn");
      }
      if (petAddress == undefined) {
        errors.push("heimilisfang");
      }
      if (!petCategory) {
        errors.push("tegund");
      }
      if (!petGender) {
        errors.push("kyn");
      }
      if (!petSize) {
        errors.push("stærð");
      }
      let msg = `* Vinsamlegast fyllið inn eftirfarandi:${errors.map(
        (err) => ` ${err}`
      )}`;
      setErrorMessage(msg);
    }
  };

  const onClear = () => {
    Keyboard.dismiss();
    setShowCategoryPicker(() => false);
    setShowGenderPicker(() => false);
    setShowSizePicker(() => false);
  };

  return (
    <BaseContainer activeOpacity={1} onPress={() => onClear()}>
      <Header title={"Skrá dýr"} />
      <InfoContainer>
        <RowContainer>
          <InfoInput
            placeholder={"Nafn"}
            onChangeText={(text) => setPetName(text)}
          />
          <InfoInput
            placeholder={"Örmerkjanúmer"}
            onChangeText={(text) => setChipNumber(text)}
          />
        </RowContainer>
        <RowContainer>
          {petCategory ? (
            <PickerValueContainer
              onPress={() => {
                onClear();
                setShowCategoryPicker(showCategoryPicker ? false : true);
              }}
            >
              <PickerValue>{petCategory.label}</PickerValue>
            </PickerValueContainer>
          ) : (
            <MissingPickerValueContainer
              onPress={() => {
                onClear();
                setShowCategoryPicker(showCategoryPicker ? false : true);
              }}
            >
              <MissingPickerValueText>{"Tegund"}</MissingPickerValueText>
            </MissingPickerValueContainer>
          )}
          {petGender ? (
            <PickerValueContainer
              onPress={() => {
                onClear();
                setShowGenderPicker(showGenderPicker ? false : true);
              }}
            >
              <PickerValue>{petGender.label}</PickerValue>
            </PickerValueContainer>
          ) : (
            <MissingPickerValueContainer
              onPress={() => {
                onClear();
                setShowGenderPicker(showGenderPicker ? false : true);
              }}
            >
              <MissingPickerValueText>{"Kyn"}</MissingPickerValueText>
            </MissingPickerValueContainer>
          )}
        </RowContainer>
        <RowContainer>
          <InfoInput
            placeholder={"Undirtegund"}
            onChangeText={(text) => setPetBreed(text)}
          />
          <DatePickerContainer>
            <DateTimePicker
              testID="dateTimePicker"
              value={petAge}
              display="default"
              onChange={(event, date) => setPetAge(date)}
              maximumDate={Date.now()}
            />
          </DatePickerContainer>
          <PickerValueContainerView pointerEvents={"none"}>
            <PickerValue>{petAge.toLocaleDateString()}</PickerValue>
          </PickerValueContainerView>
        </RowContainer>
        <RowContainer>
          {petSize ? (
            <PickerValueContainer
              onPress={() => {
                onClear();
                setShowSizePicker(showSizePicker ? false : true);
              }}
            >
              <PickerValue>{petSize.label}</PickerValue>
            </PickerValueContainer>
          ) : (
            <MissingPickerValueContainer
              onPress={() => {
                onClear();
                setShowSizePicker(showSizePicker ? false : true);
              }}
            >
              <MissingPickerValueText>{"Stærð"}</MissingPickerValueText>
            </MissingPickerValueContainer>
          )}
          <LocationButton
            onPress={() => {
              onClear();
              setShowLocation(true);
            }}
          >
            <LocationButtonText>{"Skrá heimili"}</LocationButtonText>
          </LocationButton>
        </RowContainer>
        <RowContainer>
          <DescriptionInput
            placeholder={"Frekari upplýsingar"}
            multiline={true}
            onChangeText={(text) => setDescription(text)}
          ></DescriptionInput>
        </RowContainer>
      </InfoContainer>
      {errorMessage && (
        <ErrorContainer>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </ErrorContainer>
      )}
      <SubmitButton onPress={() => validate()}>
        <SubmitButtonText>{"Skrá dýr"}</SubmitButtonText>
      </SubmitButton>
      {showCategoryPicker ? (
        <PickerBackground>
          <PickerContainer>
            {petCategories.map((item) => {
              return (
                <PickerItem
                  key={item.label}
                  onPress={() => {
                    setPetCategory(item);
                    setShowCategoryPicker(false);
                  }}
                >
                  <PickerItemText>{item.label}</PickerItemText>
                </PickerItem>
              );
            })}
          </PickerContainer>
        </PickerBackground>
      ) : null}
      {showGenderPicker ? (
        <PickerBackground>
          <PickerContainer>
            {petGenders.map((item) => {
              return (
                <PickerItem
                  key={item.label}
                  onPress={() => {
                    setPetGender(item);
                    setShowGenderPicker(false);
                  }}
                >
                  <PickerItemText>{item.label}</PickerItemText>
                </PickerItem>
              );
            })}
          </PickerContainer>
        </PickerBackground>
      ) : null}
      {showSizePicker ? (
        <PickerBackground>
          <PickerContainer>
            {petSizes.map((item) => {
              return (
                <PickerItem
                  key={item.label}
                  onPress={() => {
                    setPetSize(item);
                    setShowSizePicker(false);
                  }}
                >
                  <PickerItemText>{item.label}</PickerItemText>
                </PickerItem>
              );
            })}
          </PickerContainer>
        </PickerBackground>
      ) : null}
      {showLocation ? (
        <LocationContainer>
          <LocationPicker
            initialLocation={petAddress}
            onLocation={(location: Coordinates) => {
              setPetAddress(location);
              setShowLocation(false);
            }}
            onCancel={() => setShowLocation(false)}
          />
        </LocationContainer>
      ) : null}
    </BaseContainer>
  );
}
