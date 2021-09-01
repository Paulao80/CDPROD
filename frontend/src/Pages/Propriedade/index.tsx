import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { PropriedadesData } from '../../Util/Data';


type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

interface produtor {
    Nome: string;
}

const Propriedade = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const history = useHistory();

    const customBodyRender = (value: produtor) => {
        return value.Nome;
    }

    const columns = [
        {
            name: "PropriedadeId",
            label: "ID",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Nirf",
            label: "NIRF",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Nome",
            label: "Nome",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "Produtor",
            label: "Produtor",
            options: {
                filter: true,
                sort: false,
                customBodyRender
            }
        },
    ];

    const renderExpandableRow = (rowData: any, rowMeta: any) => {

        const propriedade = PropriedadesData.filter(obj => obj.PropriedadeId === rowData[0])[0];

        return (
            <>
                <tr>
                    <td colSpan={6}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Inscrição
                                        </TableCell>
                                        <TableCell>
                                            Endereço
                                        </TableCell>
                                        <TableCell>
                                            Municipio
                                        </TableCell>
                                        <TableCell>
                                            Estado
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={propriedade.PropriedadeId}>
                                        <TableCell>
                                            {propriedade.InscEstadual}
                                        </TableCell>
                                        <TableCell>
                                            {propriedade.Endereco}
                                        </TableCell>
                                        <TableCell>
                                            {propriedade.Municipio}
                                        </TableCell>
                                        <TableCell>
                                            {propriedade.Estado}
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
        history.push(`/propriedade/details/${rowData[0]}`)
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
            <Aside UserImg={UserImg} Active="propriedade" responsive={Responsive} />
            <Main>
                <MUIDataTable
                    title="Propriedades"
                    data={PropriedadesData}
                    columns={columns}
                    options={options}
                />
            </Main>
            <ButtonAdd to="/propriedade/create" />
            <Footer />
        </>
    )
}

export default Propriedade;