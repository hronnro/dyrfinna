import * as React from "react";
import { useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components";
import {
  mainBackgroundColor,
  mainOrange,
  textDark,
} from "../constants/StyleColors";
import { pickerType } from "../types";

const PickerBackground = styled(Animated.View)`
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

export default function Picker({
  items,
  onPress,
}: {
  items: Array<pickerType>;
  onPress: Function;
}) {
  const animationValue = useRef(new Animated.Value(0)).current;
  let [selectedItem, setSelectedItem] = React.useState<pickerType | null>(null);
  React.useEffect(() => {
    if (!selectedItem) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 250,
        delay: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 250,
        delay: 0,
        useNativeDriver: true,
      }).start(() => onPress(selectedItem));
    }
  }, [selectedItem]);
  return (
    <PickerBackground style={{ opacity: animationValue }}>
      <PickerContainer>
        {items.map((item: pickerType) => {
          return (
            <PickerItem key={item.label} onPress={() => setSelectedItem(item)}>
              <PickerItemText>{item.label}</PickerItemText>
            </PickerItem>
          );
        })}
      </PickerContainer>
    </PickerBackground>
  );
}
