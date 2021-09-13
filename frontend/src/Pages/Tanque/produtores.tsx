import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { useParams } from 'react-router-dom';
import { TanquesData } from '../../Util/Data';
import PainelNav from '../../Components/PainelNav';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

interface Param {
    id: string;
}

interface Produtor {
    ProdutorId: number;
    Nome: string;
    CpfCnpj: string;
}

const ProdutoresTanques = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const { id } = useParams<Param>();

    const tanque = TanquesData.filter(obj => obj.TanqueId === parseInt(id))[0];

    const columns = [
        {
            name: "Produtor",
            label: "ID",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: Produtor) => {
                    return value.ProdutorId;
                }
            },
        },
        {
            name: "Produtor",
            label: "Nome",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value: Produtor) => {
                    return value.Nome;
                }
            },
        },
        {
            name: "Produtor",
            label: "CPF/CNPJ",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: Produtor) => {
                    return value.CpfCnpj;
                }
            },
        },
        {
            name: "Responsavel",
            label: "Responsavel",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value: boolean) => {
                    if (value) {
                        return "Sim";
                    }
                    else {
                        return "Não";
                    }
                }
            }
        }
    ];

    const setRowProps = () => {
        return {
            style: { cursor: 'pointer' }
        }
    }

    const options = {
        setRowProps
    };

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="tanque" responsive={Responsive} />
            <Main>
                <PainelNav to={`/tanque`} titulo="Produtores" />
                <MUIDataTable
                    title={""}
                    data={tanque.ProdutoresTanques}
                    columns={columns}
                    options={options}
                />
            </Main>
            <ButtonAdd to={`/tanque/produtores/${tanque.TanqueId}/add`} />
            <Footer />
        </>
    )
}

export default ProdutoresTanques;