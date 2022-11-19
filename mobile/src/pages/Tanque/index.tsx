import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TanqueList from "./list";
import TanqueAdd from "./add";
import { useTanque } from "../../hooks";
import TanqueDetails from "./details";
import TanqueEdit from "./edit";

export type RootStackParamList = {
  TanqueList: undefined;
  TanqueAdd: undefined;
  TanqueDetails?: {
    item: any;
  };
  TanqueEdit?: {
    item: any;
  };
};

const TanqueScreen = () => {
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();

  const {
    tanques,
    form,
    onSearch,
    onDel,
    onEdit,
    onAdd,
    pickFile,
    imageShow,
    region,
    selectMapPosition,
    getGeoLocation,
    setImageShowPath,
    setRegionLocation,
  } = useTanque();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="TanqueList">
        {(props) => {
          return (
            <TanqueList
              {...props}
              tanques={tanques}
              onSearch={onSearch}
              onDel={onDel}
            />
          );
        }}
      </Screen>
      <Screen name="TanqueAdd">
        {(props) => {
          return (
            <TanqueAdd
              {...props}
              form={form}
              onAdd={onAdd}
              pickFile={pickFile}
              imageShow={imageShow}
              region={region}
              selectMapPosition={selectMapPosition}
              getGeoLocation={getGeoLocation}
            />
          );
        }}
      </Screen>
      <Screen name="TanqueDetails" component={TanqueDetails} />
      <Screen name="TanqueEdit">
        {(props) => {
          return (
            <TanqueEdit
              {...props}
              form={form}
              onEdit={onEdit}
              pickFile={pickFile}
              imageShow={imageShow}
              region={region}
              getGeoLocation={getGeoLocation}
              selectMapPosition={selectMapPosition}
              setImageShowPath={setImageShowPath}
              setRegionLocation={setRegionLocation}
            />
          );
        }}
      </Screen>
    </Navigator>
  );
};

export default TanqueScreen;
