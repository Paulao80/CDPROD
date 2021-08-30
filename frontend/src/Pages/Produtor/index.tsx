import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { GetTipoPessoa, GetEstadoCivil } from '../../Util/Functions';
import { useHistory } from 'react-router-dom'

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

    const data = [
        {
            ProdutorId: 1,
            Nome: "Paulo Vinicius Costa Nogueira",
            DataNasc: "1997-09-19",
            TipoPessoa: 1,
            Nacionalidade: "Brasileiro",
            CpfCnpj: "02747861252",
            RG: "1281291",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2011-11-11",
            EstadoCivil: 1,
            Telefone: "69992642095",
            UltLaticinio: null
        },
        {
            ProdutorId: 2,
            Nome: "João das Neves Gomez",
            DataNasc: "1998-08-15",
            TipoPessoa: 1,
            Nacionalidade: "Brasileiro",
            CpfCnpj: "02847861252",
            RG: "1281295",
            OrgaoExp: "SESDC",
            EstadoExp: "SP",
            DataExp: "2012-08-12",
            EstadoCivil: 1,
            Telefone: "69993652196",
            UltLaticinio: null
        },
        {
            ProdutorId: 3,
            Nome: "Carlos de Oliveira da Silva",
            DataNasc: "1987-05-20",
            TipoPessoa: 1,
            Nacionalidade: "Brasileiro",
            CpfCnpj: "36562152547",
            RG: "1052672",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2005-02-15",
            EstadoCivil: 1,
            Telefone: "69993722558",
            UltLaticinio: null
        },
        {
            ProdutorId: 4,
            Nome: "Miguel Ramirez Santos",
            DataNasc: "1981-06-02",
            TipoPessoa: 1,
            Nacionalidade: "Boliviano",
            CpfCnpj: "26662152547",
            RG: "1072672",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2002-03-20",
            EstadoCivil: 1,
            Telefone: "69993752558",
            UltLaticinio: null
        },
        {
            ProdutorId: 5,
            Nome: "Rodrigo Damacena Sanchez",
            DataNasc: "1990-08-10",
            TipoPessoa: 1,
            Nacionalidade: "Brasileiro",
            CpfCnpj: "31562152547",
            RG: "1182672",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2008-04-02",
            EstadoCivil: 1,
            Telefone: "69993796558",
            UltLaticinio: null
        },
        {
            ProdutorId: 6,
            Nome: "Peter Parker",
            DataNasc: "1985-10-12",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "38777766622",
            RG: "1222222",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "2000-05-05",
            EstadoCivil: 1,
            Telefone: "69993896698",
            UltLaticinio: null
        },
        {
            ProdutorId: 7,
            Nome: "Anakin Skywalker",
            DataNasc: "1965-03-15",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "36775566622",
            RG: "1223223",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "1990-05-05",
            EstadoCivil: 1,
            Telefone: "69993907628",
            UltLaticinio: null
        },
        {
            ProdutorId: 8,
            Nome: "Luke Skywalker",
            DataNasc: "1985-05-25",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "37775566822",
            RG: "1226253",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "1995-06-05",
            EstadoCivil: 1,
            Telefone: "69999907628",
            UltLaticinio: null
        },
        {
            ProdutorId: 9,
            Nome: "Bruce Wayne",
            DataNasc: "1980-02-12",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "39776466822",
            RG: "1236553",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "1997-07-02",
            EstadoCivil: 1,
            Telefone: "69993914928",
            UltLaticinio: null
        },
        {
            ProdutorId: 10,
            Nome: "Oliver Queen",
            DataNasc: "1983-03-15",
            TipoPessoa: 1,
            Nacionalidade: "Estadunidense",
            CpfCnpj: "39986456822",
            RG: "1346953",
            OrgaoExp: "SESDC",
            EstadoExp: "RO",
            DataExp: "1997-07-02",
            EstadoCivil: 1,
            Telefone: "69993925998",
            UltLaticinio: null
        }
    ];

    const renderExpandableRow = (rowData: any, rowMeta: any) => {

        const produtor = data.filter(obj => obj.ProdutorId === rowData[0])[0];
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
                    data={data}
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