import * as React from "react";
import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

import { User } from "../FirestoreModels";
import { mainBackgroundColor, whiteOpague } from "../constants/StyleColors";
import Header from "../components/Header";

const BaseContainer = styled.View`
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

const PickerValue = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
`;

const PickerContainer = styled.View`
  position: absolute;
  bottom: 0px;
  height: 30%;
  width: 100%;
`;

type petCategoryType = {
  label: string;
  value: string;
};

let petCategories: Array<petCategoryType> = [
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

export default function AddPetScreen({ user }: { user: User }) {
  let [petName, setPetName] = React.useState("");
  let [chipNumber, setChipNumber] = React.useState("");
  let [description, setDescription] = React.useState("");
  let [petCategory, setPetCategory] = React.useState(petCategories[0]);
  let [petAge, setPetAge] = React.useState("");
  let [petBreed, setPetBreed] = React.useState("");
  let [petSex, setPetSex] = React.useState(null);
  let [petAllergies, setPetAllergies] = React.useState("");
  let [petSize, setPetSize] = React.useState(null);

  let [showPicker, setShowPicker] = React.useState(false);
  console.log("selected petCategory", petCategory);
  return (
    <BaseContainer>
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
          <PickerValueContainer onPress={() => setShowPicker(true)}>
            <PickerValue>{petCategory.label}</PickerValue>
          </PickerValueContainer>
        </RowContainer>
      </InfoContainer>
      {showPicker ? (
        <PickerContainer>
          <Picker
            selectedValue={petCategory}
            onValueChange={(item: petCategoryType, index) => {
              console.log("ITEM", item);
              setPetCategory(petCategories[index]);
              setShowPicker(false);
            }}
            // style={{
            //   position: "absolute",
            //   bottom: 100,
            //   height: 100,
            //   width: "100%",
            // }}
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
    </BaseContainer>
  );
}
