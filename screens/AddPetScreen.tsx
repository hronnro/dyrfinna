import * as React from "react";
import styled from "styled-components/native";

import { User } from "../FirestoreModels";
import { mainBackgroundColor } from "../constants/StyleColors";
import Header from "../components/Header";

const BaseContainer = styled.View`
  height: 100%;
  align-items: center;
  background-color: ${mainBackgroundColor};
`;

export default function AddPetScreen({ user }: { user: User }) {
  return (
    <BaseContainer>
      <Header title={"Skrá dýr"} />
    </BaseContainer>
  );
}
