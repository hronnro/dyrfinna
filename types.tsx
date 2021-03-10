import { User } from "./FirestoreModels";
export type LoggedOutParamList = {
  Onboarding: undefined;
  WelcomeApp: undefined;
  UserInfo: undefined;
  Authentication: {
    userInfo?: User;
  };
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
    user: string;
  };
};
