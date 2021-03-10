import * as React from "react";
import { Dimensions, Image, ImageSourcePropType } from "react-native";
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

interface CarouselData {
  headerSmall: String;
  headerLarge: String;
  img: ImageSourcePropType;
  description: String;
}

const BaseContainer = styled.View`
  background-color: ${mainBackgroundColor};
`;

const CarouselContainer = styled.View`
  background-color: ${mainBackgroundColor};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const CarouselItem = styled.View`
  justify-content: center;
  width: 90%;
  height: 100%;
`;
const CarouselItemTitle = styled.Text<{ isSmall: boolean }>`
  color: ${textDark};
  font-size: ${({ isSmall }) => (isSmall ? "20px" : "35px")};
  font-family: "MontserratBold";
`;
const CarouselItemDescription = styled.Text`
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
const IndicatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Indicator = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  margin-horizontal: 4px;
  border-radius: 8px;
  background-color: ${({ active }) => (active ? mainOrange : inactiveBullet)};
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
  const carouselRef = React.useRef<Carousel<CarouselData>>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const carouselData: Array<CarouselData> = [
    {
      headerSmall: "Velkomin/n í",
      headerLarge: "Dýrfinnu",
      img: require("../assets/images/onboarding-1.png"),
      description:
        "Dýrfinna er smáforrit sem styður ábyrgt gæludýrahald, hjálpar týndum dýrum að komast heim og styrkir sambönd gæludýraeigenda og dýravina.",
    },
    {
      headerSmall: "Skráðu gæludýrin",
      headerLarge: "á heimilinu",
      img: require("../assets/images/onboarding-1.png"),
      description:
        "Þannig getur þú auðveldlega tilkynnt dýrið týnt og fengið aðstoð frá fólki í nágrenninu við að leita eða fengið tilkynningar ef sést til dýrsins.",
    },
    {
      headerSmall: "Láttu vita ef þú sérð dýr sem",
      headerLarge: "gæti verið týnt",
      img: require("../assets/images/onboarding-1.png"),
      description:
        "Kettirnir sem við sjáum daglega eru ekki alltaf týndir, en stundum eru þeir búnir að vera týndir í langan tíma. Fylgstu með köttunum í hverfinu og láttu vita ef það birtist köttur sem þú kannast ekki við.",
    },
    {
      headerSmall: "Það geta allar tegundir",
      headerLarge: "gæludýra týnst",
      img: require("../assets/images/onboarding-1.png"),
      description:
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
      <CarouselContainer key={`${index}`}>
        <CarouselItem>
          <Image source={item.img} />
          <CarouselItemTitle isSmall={true}>
            {item.headerSmall}
          </CarouselItemTitle>
          <CarouselItemTitle isSmall={false}>
            {item.headerLarge}
          </CarouselItemTitle>
          <CarouselItemDescription>{item.description}</CarouselItemDescription>
        </CarouselItem>
      </CarouselContainer>
    );
  };

  return (
    <BaseContainer>
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
        <IndicatorContainer>
          {carouselData.map((element, index) => {
            return (
              <Indicator key={`${index}`} active={index == currentIndex} />
            );
          })}
        </IndicatorContainer>
        <NextButton
          onPress={() => {
            currentIndex === carouselData.length - 1
              ? onPress()
              : carouselRef.current?.snapToNext();
          }}
        >
          <Ionicons name="arrow-forward-outline" size={36} color="white" />
        </NextButton>
      </BottomContainer>
    </BaseContainer>
  );
}
