import * as React from "react";
import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Coordinates, Pet, User } from "../FirestoreModels";
import { mainBackgroundColor, mainOrange } from "../constants/StyleColors";
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

const LocationContainer = styled.View`
  position: absolute;
`;
const LocationButton = styled.TouchableOpacity`
  width: 60%;
  height: 45px;
  background-color: ${mainOrange};
  align-self: center;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
const LocationButtonText = styled.Text`
  font-family: "MontserratBold";
  font-size: 16px;
  color: white;
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

const PickerContainer = styled.View`
  position: absolute;
  background-color: ${mainBackgroundColor};
  bottom: 0px;
  height: 30%;
  width: 100%;
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
  let [petCategory, setPetCategory] = React.useState(petCategories[0]);
  let [petAge, setPetAge] = React.useState(new Date());
  let [petBreed, setPetBreed] = React.useState("");
  let [petGender, setPetGender] = React.useState(petGenders[0]);
  let [petSize, setPetSize] = React.useState(petSizes[0]);
  let [petAddress, setPetAddress] = React.useState<undefined | Coordinates>(
    undefined
  );
  let [showLocation, setShowLocation] = React.useState(false);
  let [showCategoryPicker, setShowCategoryPicker] = React.useState(false);
  let [showGenderPicker, setShowGenderPicker] = React.useState(false);
  let [showSizePicker, setShowSizePicker] = React.useState(false);
  const navigation = useNavigation();
  function createNewPet() {
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
    };
    createPet(user, pet);
    navigation.navigate("MyProfileScreen");
  }
  const onClear = () => {
    Keyboard.dismiss();
    setShowCategoryPicker(() => false);
    setShowGenderPicker(() => false);
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
          <PickerValueContainer
            onPress={() => {
              onClear();
              setShowCategoryPicker(showCategoryPicker ? false : true);
            }}
          >
            <PickerValue>{petCategory.label}</PickerValue>
          </PickerValueContainer>
          <PickerValueContainer
            onPress={() => {
              onClear();
              setShowGenderPicker(showGenderPicker ? false : true);
            }}
          >
            <PickerValue>{petGender.label}</PickerValue>
          </PickerValueContainer>
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
            />
          </DatePickerContainer>
          <PickerValueContainerView pointerEvents={"none"}>
            <PickerValue>{petAge.toLocaleDateString()}</PickerValue>
          </PickerValueContainerView>
        </RowContainer>
        <RowContainer>
          <PickerValueContainer
            onPress={() => {
              onClear();
              setShowSizePicker(showSizePicker ? false : true);
            }}
          >
            <PickerValue>{petSize.label}</PickerValue>
          </PickerValueContainer>
        </RowContainer>
      </InfoContainer>
      <InfoContainer>
        <LocationButton
          onPress={() => {
            onClear();
            setShowLocation(true);
          }}
        >
          <LocationButtonText>{"Skrá heimili"}</LocationButtonText>
        </LocationButton>
      </InfoContainer>
      <SubmitButton onPress={() => createNewPet()}>
        <SubmitButtonText>{"Skrá dýr"}</SubmitButtonText>
      </SubmitButton>
      {showCategoryPicker ? (
        <PickerContainer>
          <Picker
            selectedValue={petCategory.value}
            onValueChange={(item: pickerType, index) => {
              setPetCategory(petCategories[index]);
              setShowCategoryPicker(false);
            }}
          >
            {petCategories.map((item) => {
              return (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </PickerContainer>
      ) : null}
      {showGenderPicker ? (
        <PickerContainer>
          <Picker
            selectedValue={petGender.value}
            onValueChange={(item: pickerType, index) => {
              setPetGender(petGenders[index]);
              setShowGenderPicker(false);
            }}
          >
            {petGenders.map((item) => {
              return (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </PickerContainer>
      ) : null}
      {showSizePicker ? (
        <PickerContainer>
          <Picker
            selectedValue={petSize.value}
            onValueChange={(item: pickerType, index) => {
              setPetSize(petSizes[index]);
              setShowSizePicker(false);
            }}
          >
            {petSizes.map((item) => {
              return (
                <Picker.Item
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </PickerContainer>
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
