import * as React from "react";
import styled from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { getMyPets } from "../api/PetStore";
import Header from "../components/Header";
import MyPetsList from "../components/MyPetsList";
import { mainBackgroundColor } from "../constants/StyleColors";
import { Coordinates, Pet, User } from "../FirestoreModels";
import DateInputField from "../components/DateInputField";

const BaseContainer = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: ${mainBackgroundColor};
`;
const Container = styled.View`
  height: 100%;
  width: 90%;
`;
const MyPetsContainer = styled.View`
  margin-top: 20px;
`;
const MyPetsHeader = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
`;
const LastSeenInfoContainer = styled.View`
  margin-top: 20px;
`;
const InputContainer = styled.View`
  margin-top: 20px;
`;
const InfoText = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
`;
export default function ReportLostPetScreen({ user }: { user: User }) {
  const [myPets, setMyPets] = React.useState<null | Pet[]>(null);
  const [lastSeenDate, setLastSeenDate] = React.useState(new Date());
  const [lastSeenLocation, setLastSeenLocation] = React.useState<
    undefined | Coordinates
  >(undefined);
  let [selectedPet, setSelectedPet] = React.useState<Pet | null>(null);
  const fetchPets = async () => {
    const result = await getMyPets(user).then((pets) => {
      return pets;
    });
    setMyPets(result);
  };
  React.useEffect(() => {
    fetchPets();
  }, [user.pets]);
  return (
    <BaseContainer>
      <Header title={"Ný leit"} />
      <Container>
        {myPets && myPets.length > 0 ? (
          <MyPetsContainer>
            <MyPetsHeader>
              {"Þú getur valið þitt dýr eða búið til nýtt dýr"}
            </MyPetsHeader>
            <MyPetsList
              pets={myPets}
              onPetPress={(pet: Pet) => {
                selectedPet && selectedPet.id == pet.id
                  ? setSelectedPet(null)
                  : setSelectedPet(pet);
              }}
              selectedPet={selectedPet}
            />
          </MyPetsContainer>
        ) : null}
        {selectedPet ? (
          <LastSeenInfoContainer>
            <InputContainer>
              <InfoText>{`Hvar sást ${selectedPet.name} síðast?`}</InfoText>
            </InputContainer>
            <InputContainer>
              <InfoText>{`Hvenær sást ${selectedPet.name} síðast?`}</InfoText>
              <DateInputField
                dateValue={lastSeenDate}
                setValue={(value) => setLastSeenDate(value)}
              />
            </InputContainer>
            <InputContainer>
              <InfoText>{`Frekari upplýsingar`}</InfoText>
            </InputContainer>
          </LastSeenInfoContainer>
        ) : null}
      </Container>
    </BaseContainer>
  );
}
