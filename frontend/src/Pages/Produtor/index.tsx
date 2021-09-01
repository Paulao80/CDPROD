import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { GetTipoPessoa, GetEstadoCivil } from '../../Util/Functions';
import { useHistory } from 'react-router-dom';
import { ProdutoresData } from '../../Util/Data';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const Produtor = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const history = useHistory();

    const columns = [
        {
            name: "ProdutorId",
            label: "ID",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "Nome",
            label: "Nome",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "CpfCnpj",
            label: "CPF/CNPJ",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "Telefone",
            label: "Telefone",
            options: {
                filter: true,
                sort: false,
            },
        },
    ];

    const renderExpandableRow = (rowData: any, rowMeta: any) => {

        const produtor = ProdutoresData.filter(obj => obj.ProdutorId === rowData[0])[0];
        console.log(produtor);

        return (
            <>
                <tr>
                    <td colSpan={6}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Tipo de Pessoa
                                        </TableCell>
                                        <TableCell>
                                            Data Nascimento
                                        </TableCell>
                                        <TableCell>
                                            Nacionalidade
                                        </TableCell>
                                        <TableCell>
                                            RG
                                        </TableCell>
                                        <TableCell>
                                            Orgão Expeditor
                                        </TableCell>
                                        <TableCell>
                                            Estado Expeditor
                                        </TableCell>
                                        <TableCell>
                                            Data Expedição
                                        </TableCell>
                                        <TableCell>
                                            Estado Civil
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={produtor.ProdutorId}>
                                        <TableCell>
                                            {GetTipoPessoa(produtor.TipoPessoa)}
                                        </TableCell>
                                        <TableCell>
                                            {produtor.DataNasc}
                                        </TableCell>
                                        <TableCell>
                                            {produtor.Nacionalidade}
                                        </TableCell>
                                        <TableCell>
                                            {produtor.RG}
                                        </TableCell>
                                        <TableCell>
                                            {produtor.OrgaoExp}
                                        </TableCell>
                                        <TableCell>
                                            {produtor.EstadoExp}
                                        </TableCell>
                                        <TableCell>
                                            {produtor.DataExp}
                                        </TableCell>
                                        <TableCell>
                                            {GetEstadoCivil(produtor.EstadoCivil)}
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
        history.push(`/produtor/details/${rowData[0]}`)
    }

    const options = {
        onRowClick,
        expandableRows: true,
        renderExpandableRow,
        setRowProps
    };

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="produtor" responsive={Responsive} />
            <Main>
                <MUIDataTable
                    title={"Produtores"}
                    data={ProdutoresData}
                    columns={columns}
                    options={options}
                />
            </Main>
            <ButtonAdd to="/produtor/create" />
            <Footer />
        </>
    )
}

export default Produtor;