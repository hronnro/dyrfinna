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
  LoggedOut: undefined;
  AddPetScreen: {
    user: string;
  };
};

export type BottomTabParamList = {
  ActiveSearches: undefined;
  MyProfile: undefined;
};

export type ActiveSearchesParamList = {
  ActiveSearchesScreen: undefined;
};

export type MyProfileParamList = {
  MyProfileScreen: {
    user: string;
  };
  AddPetScreen: {
    user: string;
  };
};
export type pickerType = {
  label: string;
  value: string;
};
