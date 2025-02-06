import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../index";
import Container from "../../../components/container";
import DataView from "../../../components/dataView";
import Header from "../../../components/header";
import Panel from "../../../components/panel";
import { ProdutoresTanques } from "../../../interfaces";
import { formatBooleano } from "../../../utils/formatBooleano";

type ProdTanqueDetailsProp = NativeStackScreenProps<
  RootStackParamList,
  "ProdTanqueDetails"
>;

const ProdTanqueDetails = (props: ProdTanqueDetailsProp) => {
  const { route } = props;
  const prodTanque = route.params?.item as ProdutoresTanques;

  return (
    <Container>
      <Header title="VISUALIZAR PRODUTOR DO TANQUE" />
      <Panel background>
        <DataView name="Tanque" value={prodTanque.Tanque?.TanqueId} />
        <DataView name="Nome" value={prodTanque.Produtor?.Nome} />
        <DataView name="CPF/CNPJ" value={prodTanque.Produtor?.CpfCnpj} />
        <DataView
          name="Responsavel"
          value={formatBooleano(prodTanque.Responsavel)}
        />
      </Panel>
    </Container>
  );
};

export default ProdTanqueDetails;
