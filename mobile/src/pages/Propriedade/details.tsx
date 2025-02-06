import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import Container from "../../components/container";
import DataView from "../../components/dataView";
import Header from "../../components/header";
import Panel from "../../components/panel";
import { Propriedade } from "../../interfaces";

type PropriedadeDetailsProp = NativeStackScreenProps<
  RootStackParamList,
  "PropriedadeDetails"
>;

const PropriedadeDetails = (props: PropriedadeDetailsProp) => {
  const { route } = props;
  const propriedade = route.params?.item as Propriedade | undefined;

  return (
    <Container>
      <Header title="VISUALIZAR PROPRIEDADE" />
      <Panel background>
        <DataView name="NIRF" value={propriedade?.Nirf} />
        <DataView name="Nome" value={propriedade?.Nome} />
        <DataView name="Inscrição" value={propriedade?.InscEstadual} />
        <DataView name="Endereço" value={propriedade?.Endereco} />
        <DataView name="Municipio" value={propriedade?.Municipio} />
        <DataView name="Estado" value={propriedade?.Estado} />
        <DataView name="Produtor" value={propriedade?.Produtor?.Nome} />
      </Panel>
    </Container>
  );
};

export default PropriedadeDetails;
