import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../index";
import Container from "../../../components/container";
import DataView from "../../../components/dataView";
import Header from "../../../components/header";
import Panel from "../../../components/panel";
import { ContaBancaria } from "../../../interfaces";

type ContaDetailsProp = NativeStackScreenProps<
  RootStackParamList,
  "ContaDetails"
>;

const ContaDetails = (props: ContaDetailsProp) => {
  const { route } = props;
  const conta = route.params?.item as ContaBancaria;

  return (
    <Container>
      <Header title="VISUALIZAR CONTA" />
      <Panel background>
        <DataView name="Nome pertence" value={conta?.NomePertence} />
        <DataView name="Banco" value={conta?.Banco} />
        <DataView name="Agência" value={conta?.Agencia} />
        <DataView name="Conta" value={conta?.Conta} />
      </Panel>
    </Container>
  );
};

export default ContaDetails;
