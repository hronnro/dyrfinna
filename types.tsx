export type LoggedOutParamList = {
  Onboarding: undefined;
  WelcomeApp: undefined;
  UserInfo: undefined;
  Authentication: undefined;
};

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  MyProfile: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type MyProfileParamList = {
  MyProfileScreen: {
    user: string
  };
};
