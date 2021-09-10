import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { TanquesData } from '../../Util/Data';


type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const Tanque = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const history = useHistory();

    const customBodyRender = (value: string) => {
        return (
            <img className="img-tanque" src={value} alt="Foto" />
        )
    }

    const columns = [
        {
            name: "FotoPath",
            label: "Foto",
            options: {
                filter: false,
                sort: false,
                customBodyRender
            }
        },
        {
            name: "TanqueId",
            label: "ID",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Capacidade",
            label: "Capacidade (L)",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Marca",
            label: "Marca",
            options: {
                filter: true,
                sort: false,
            }
        }
    ];

    const renderExpandableRow = (rowData: any, rowMeta: any) => {

        const tanque = TanquesData.filter(obj => obj.TanqueId === rowData[1])[0];

        const GetTipoTanque = (TipoTanque: number) => {
            switch (TipoTanque) {
                case 1: return "Individual";
                case 2: return "Comunitário";
                default: return "Error";
            }
        }

        return (
            <>
                <tr>
                    <td colSpan={6}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Rota
                                        </TableCell>
                                        <TableCell>
                                            Média Diária
                                        </TableCell>
                                        <TableCell>
                                            Tipo
                                        </TableCell>
                                        <TableCell>
                                            Nº de Série
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={tanque.TanqueId}>
                                        <TableCell>
                                            {tanque.Rota}
                                        </TableCell>
                                        <TableCell>
                                            {tanque.MediaDiaria}
                                        </TableCell>
                                        <TableCell>
                                            {GetTipoTanque(tanque.TipoTanque)}
                                        </TableCell>
                                        <TableCell>
                                            {tanque.NumeroSerie}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </td>
                </tr>
            </>
        )
    }

    const setRowProps = () => {
        return {
            style: { cursor: 'pointer' }
        }
    }

    const onRowClick = (rowData: any) => {
        history.push(`/tanque/details/${rowData[1]}`)
    }

    const options = {
        setRowProps,
        onRowClick,
        expandableRows: true,
        renderExpandableRow
    };

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="tanque" responsive={Responsive} />
            <Main>
                <MUIDataTable
                    title="Tanques"
                    data={TanquesData}
                    columns={columns}
                    options={options}
                />
            </Main>
            <ButtonAdd to="/tanque/create" />
            <Footer />
        </>
    )
}

export default Tanque;