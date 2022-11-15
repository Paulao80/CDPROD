import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { RootStackParamList } from ".";
import Container from "../../components/container";
import DataView from "../../components/dataView";
import Header from "../../components/header";
import Panel from "../../components/panel";
import { Produtor } from "../../interfaces";
import { formatDataToApp } from "../../utils/formatData";
import { formatEstadoCivil } from "../../utils/formatEstadoCivil";
import { formatTipoPessoa } from "../../utils/formatTipoPessoa";

type ProdutorListProp = NativeStackScreenProps<
  RootStackParamList,
  "ProdutorDetails"
>;

const ProtudorDetails = (props: ProdutorListProp) => {
  const { route } = props;
  const produtor = route.params?.item as Produtor;

  return (
    <Container>
      <Header title="Visualizar produtor" />
      <Panel background>
        <DataView name="Nome" value={produtor?.Nome} />
        <DataView
          name="Data de Nasc"
          value={formatDataToApp(produtor?.DataNasc)}
        />
        <DataView
          name="Tipo de pessoa"
          value={formatTipoPessoa(produtor?.TipoPessoa)}
        />
        <DataView name="Nacionalidade" value={produtor?.Nacionalidade} />
        <DataView name="CPF/CNPJ" value={produtor?.CpfCnpj} />
        <DataView name="Registro geral" value={produtor?.RG} />
        <DataView name="Estado de expedição" value={produtor?.EstadoExp} />
        <DataView name="Orgão de expedição" value={produtor?.OrgaoExp} />
        <DataView
          name="Data de expedição"
          value={formatDataToApp(produtor?.DataExp)}
        />
        <DataView
          name="Estado civil"
          value={formatEstadoCivil(produtor?.EstadoCivil)}
        />
        <DataView name="Telefone" value={produtor?.Telefone} />
        <DataView name="Último latícinio" value={produtor?.UltLaticinio} />
      </Panel>
    </Container>
  );
};

export default ProtudorDetails;
