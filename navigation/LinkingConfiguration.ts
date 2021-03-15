import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "TabOneScreen",
            },
          },
          MyProfile: {
            screens: {
              MyProfileScreen: "MyProfileScreen",
              AddPetScreen: "AddPetScreen",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
