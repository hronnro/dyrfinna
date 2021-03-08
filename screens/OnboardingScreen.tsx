import * as React from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import {
  mainBackgroundColor,
  textDark,
  inactiveBullet,
  mainOrange,
} from "../constants/StyleColors";

const width = Dimensions.get("window").width;

const Container = styled.View`
  background-color: ${mainBackgroundColor};
`;

const CarouselItemContainerView = styled.View`
  background-color: ${mainBackgroundColor};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CarouselItemView = styled.View`
  justify-content: center;
  width: 90%;
  height: 100%;
`;

const CarouselItemTitleSmallText = styled.Text`
  color: ${textDark};
  font-size: 20px;
  font-family: "MontserratBold";
`;

const CarouselItemTitleLargeText = styled.Text`
  color: ${textDark};
  font-size: 35px;
  font-family: "MontserratBold";
`;

const CarouselItemCopyText = styled.Text`
  color: ${textDark};
  margin-top: 10px;
  font-family: "MontserratRegular";
  line-height: 22px;
`;
const BottomContainer = styled.View`
  position: absolute;
  bottom: 0;

  align-items: center;
  height: 15%;
  width: 100%;
`;
const IndicatorContainerView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const IndicatorInactiveView = styled.View`
  width: 8px;
  height: 8px;
  margin-horizontal: 4px;
  border-radius: 8px;
  background-color: ${inactiveBullet};
`;

const IndicatorActiveView = styled.View`
  width: 8px;
  height: 8px;
  margin-horizontal: 4px;
  border-radius: 8px;
  background-color: ${mainOrange};
`;

const NextButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 28px;
  right: 41px;
  width: 99px;
  height: 57px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${mainOrange};
`;

export default function OnboardingScreen({ onPress }: { onPress: Function }) {
  interface CarouselData {
    headerSmall: String;
    headerLarge: String;
    copy: String;
  }
  const carouselRef = React.useRef<Carousel<CarouselData>>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselData: Array<CarouselData> = [
    {
      headerSmall: "Velkomin/n í",
      headerLarge: "Dýrfinnu",
      copy:
        "Dýrfinna er smáforrit sem styður ábyrgt gæludýrahald, hjálpar týndum dýrum að komast heim og styrkir sambönd gæludýraeigenda og dýravina.",
    },
    {
      headerSmall: "Skráðu gæludýrin",
      headerLarge: "á heimilinu",
      copy:
        "Þannig getur þú auðveldlega tilkynnt dýrið týnt og fengið aðstoð frá fólki í nágrenninu við að leita eða fengið tilkynningar ef sést til dýrsins.",
    },
    {
      headerSmall: "Láttu vita ef þú sérð dýr sem",
      headerLarge: "gæti verið týnt",
      copy:
        "Kettirnir sem við sjáum daglega eru ekki alltaf týndir, en stundum eru þeir búnir að vera týndir í langan tíma. Fylgstu með köttunum í hverfinu og láttu vita ef það birtist köttur sem þú kannast ekki við.",
    },
    {
      headerSmall: "Það geta allar tegundir",
      headerLarge: "gæludýra týnst",
      copy:
        "Sum gæludýr eru ekki örmerkt og því mun erfiðara að finna eigendur, hjálpumst að að koma öllum gæludýrum heim.",
    },
  ];

  const renderItem = ({
    item,
    index,
  }: {
    item: CarouselData;
    index: Number;
  }) => {
    return (
      <CarouselItemContainerView>
        <CarouselItemView>
          <CarouselItemTitleSmallText>
            {item.headerSmall}
          </CarouselItemTitleSmallText>
          <CarouselItemTitleLargeText>
            {item.headerLarge}
          </CarouselItemTitleLargeText>
          <CarouselItemCopyText>{item.copy}</CarouselItemCopyText>
        </CarouselItemView>
      </CarouselItemContainerView>
    );
  };

  return (
    <Container>
      <Carousel
        ref={carouselRef}
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        inactiveSlideScale={1}
        onSnapToItem={(index) => setCurrentIndex(index)}
      />
      <BottomContainer>
        <IndicatorContainerView>
          {carouselData.map((element, index) => {
            if (index == currentIndex) {
              return <IndicatorActiveView />;
            } else {
              return <IndicatorInactiveView />;
            }
          })}
        </IndicatorContainerView>
        <NextButton
          onPress={() => {
            if (currentIndex === carouselData.length - 1) {
              onPress();
            } else {
              carouselRef.current?.snapToNext();
            }
          }}
        >
          <Ionicons name="arrow-forward-outline" size={36} color="white" />
        </NextButton>
      </BottomContainer>
    </Container>
  );
}
