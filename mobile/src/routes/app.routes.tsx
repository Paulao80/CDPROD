import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";

const AppRoutes = () => {
  const { Screen, Navigator } = createDrawerNavigator();

  return (
    <Navigator>
      <Screen name="CDTR" component={Home} options={{ headerShown: false }} />
    </Navigator>
  );
};

export default AppRoutes;
