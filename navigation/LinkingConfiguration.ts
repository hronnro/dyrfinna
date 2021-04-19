import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          ActiveSearches: {
            screens: {
              ActiveSearchesScreen: "ActiveSearchesScreen",
              ReportLostPetScreen: "ReportLostPetScreen",
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
