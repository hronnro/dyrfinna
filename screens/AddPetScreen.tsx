import * as React from "react";
import styled from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Keyboard } from "react-native";

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
import Picker from "./Picker";
import { pickerType } from "../types";
import { useRoute } from "@react-navigation/native";

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

const findPickerType = (types: Array<pickerType>, item: string) => {
  return types.find((type) => type.value === item) || null;
};

export default function AddPetScreen({ user }: { user: User }) {
  const route = useRoute();
  const pet = route.params?.pet as Pet;
  let [petName, setPetName] = React.useState(pet.name ?? "");
  let [chipNumber, setChipNumber] = React.useState(pet.chipId ?? "");
  let [description, setDescription] = React.useState(pet.description ?? "");
  let [petCategory, setPetCategory] = React.useState<pickerType | null>(
    findPickerType(petCategories, pet.petType)
  );
  let [petAge, setPetAge] = React.useState(
    new Date((pet.birthdate.seconds as number) * 1000) ?? new Date()
  );
  let [petBreed, setPetBreed] = React.useState(pet.breed ?? "");
  let [petGender, setPetGender] = React.useState<pickerType | null>(
    findPickerType(petGenders, pet.gender)
  );
  let [petSize, setPetSize] = React.useState<pickerType | null>(
    findPickerType(petSizes, pet.size)
  );
  let [petAddress, setPetAddress] = React.useState<undefined | Coordinates>(
    undefined
  );
  let [showLocation, setShowLocation] = React.useState(false);
  let [showCategoryPicker, setShowCategoryPicker] = React.useState(false);
  let [showGenderPicker, setShowGenderPicker] = React.useState(false);
  let [showSizePicker, setShowSizePicker] = React.useState(false);
  let [errorMessage, setErrorMessage] = React.useState<null | string>(null);

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
            value={petName}
            placeholder={"Nafn"}
            onChangeText={(text) => setPetName(text)}
          />
          <InfoInput
            value={chipNumber}
            placeholder={"Örmerkjanúmer"}
            keyboardType={"numeric"}
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
            value={petBreed}
            placeholder={"Undirtegund"}
            onChangeText={(text) => setPetBreed(text)}
          />
          <DatePickerContainer>
            <DateTimePicker
              testID="dateTimePicker"
              value={petAge}
              display="default"
              onChange={(_event, date) => setPetAge(date)}
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
            value={description}
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
        <Picker
          items={petCategories}
          onPress={(item: pickerType) => {
            setPetCategory(item);
            setShowCategoryPicker(false);
          }}
        />
      ) : null}
      {showGenderPicker ? (
        <Picker
          items={petGenders}
          onPress={(item: pickerType) => {
            setPetGender(item);
            setShowGenderPicker(false);
          }}
        />
      ) : null}
      {showSizePicker ? (
        <Picker
          items={petSizes}
          onPress={(item: pickerType) => {
            setPetSize(item);
            setShowSizePicker(false);
          }}
        />
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
