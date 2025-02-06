import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TanqueList from "./list";
import TanqueAdd from "./add";
import { useProdutor, useTanque } from "../../hooks";
import TanqueDetails from "./details";
import TanqueEdit from "./edit";
import { useProdTanque } from "../../hooks/useProdTanque";
import ProdTanqueList from "./Produtor/list";
import ProdTanqueDetails from "./Produtor/details";
import ProdTanqueAdd from "./Produtor/add";

export type RootStackParamList = {
  TanqueList: undefined;
  TanqueAdd: undefined;
  TanqueDetails?: {
    item: any;
  };
  TanqueEdit?: {
    item: any;
  };
  ProdTanqueList?: {
    item: any;
  };
  ProdTanqueDetails?: {
    item: any;
  };
  ProdTanqueAdd?: {
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

  const {
    prodTanques,
    form: formProdTanque,
    onSearchByTanqueId,
    onDel: onDelProdTanque,
    onAdd: onAddProdTanque,
  } = useProdTanque();

  const { list } = useProdutor();

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
      <Screen name="ProdTanqueList">
        {(props) => {
          return (
            <ProdTanqueList
              {...props}
              prodTanques={prodTanques}
              onSearchByTanqueId={onSearchByTanqueId}
              onDel={onDelProdTanque}
            />
          );
        }}
      </Screen>
      <Screen name="ProdTanqueDetails" component={ProdTanqueDetails} />
      <Screen name="ProdTanqueAdd">
        {(props) => {
          return (
            <ProdTanqueAdd
              {...props}
              form={formProdTanque}
              onAdd={onAddProdTanque}
              list={list}
            />
          );
        }}
      </Screen>
    </Navigator>
  );
};

export default TanqueScreen;
