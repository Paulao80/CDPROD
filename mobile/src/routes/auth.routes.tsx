import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SingIn from "../pages/SignIn";

export type RootStackParamList = {
  SingIn: undefined;
};

const AuthRotes = () => {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SingIn" component={SingIn} />
    </Navigator>
  );
};

export default AuthRotes;
