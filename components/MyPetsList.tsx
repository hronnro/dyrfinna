import * as React from "react";
import styled from "styled-components/native";

import { mainOrange } from "../constants/StyleColors";
import { Pet } from "../FirestoreModels";

const MyPetsContainer = styled.ScrollView`
  width: 100%;
  height: 140px;
`;
const MyPetContainer = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-color: ${mainOrange};
  border-width: 2px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-horizontal: 15px;
  margin-top: 20px;
`;
const MyPetContainerSelected = styled(MyPetContainer)`
  border-width: 5px;
`;
const MyPetName = styled.Text`
  font-size: 14px;
  font-family: "MontserratBold";
`;

export default function MyPetsList({
  pets,
  onPetPress,
  selectedPet,
}: {
  pets: Pet[];
  onPetPress: Function;
  selectedPet: Pet | null;
}) {
  return (
    <MyPetsContainer horizontal={true}>
      {pets.map((pet) => {
        if (selectedPet && selectedPet.id == pet.id) {
          return (
            <MyPetContainerSelected
              key={pet.id}
              onPress={() => onPetPress(pet)}
            >
              <MyPetName>{pet.name}</MyPetName>
            </MyPetContainerSelected>
          );
        } else {
          return (
            <MyPetContainer key={pet.id} onPress={() => onPetPress(pet)}>
              <MyPetName>{pet.name}</MyPetName>
            </MyPetContainer>
          );
        }
      })}
    </MyPetsContainer>
  );
}
