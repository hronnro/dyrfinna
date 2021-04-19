import * as React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import styled from "styled-components/native";

const Container = styled.View`
  width: 100%;
`;
const PickerValueContainerView = styled.View`
  width: 100%;
  margin-top: 10px;
  background-color: white;
  height: 36px;
  border-radius: 18px;
  padding-horizontal: 10px;
  justify-content: center;
`;
const DatePickerContainer = styled.View`
  position: absolute;
  margin-top: 10px;
  padding-left: 12px;
  left: 0px;
  bottom: 0px;
  top: 0px;
  width: 50%;
  height: 10%;
`;
const PickerValue = styled.Text`
  font-family: "MontserratRegular";
  font-size: 14px;
`;
export default function DateInputField({ dateValue, setValue }) {
  return (
    <Container>
      <DatePickerContainer>
        <DateTimePicker
          testID="dateTimePicker"
          value={dateValue}
          display="default"
          onChange={(event, date) => setValue(date)}
          maximumDate={Date.now()}
        />
      </DatePickerContainer>
      <PickerValueContainerView pointerEvents={"none"}>
        <PickerValue>{dateValue.toLocaleDateString()}</PickerValue>
      </PickerValueContainerView>
    </Container>
  );
}
