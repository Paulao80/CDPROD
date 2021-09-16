import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { GetTipoPessoa, GetEstadoCivil } from '../../Util/Functions';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../Services/Api';
import { Produtor as IProdutor } from '../../Interfaces';
import ButtonAct from '../../Components/ButtonAct';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const Produtor = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {
    const history = useHistory();

    const [produtores, setProdutores] = useState<IProdutor[]>([]);

    useEffect(() => {
        Api.get('/produtores').then(response => {
            setProdutores(response.data);
        });
    }, []);

    const customAcoesRender = (value: string) => {
        return (
            <div className="div-act">
                <ButtonAct to={`/produtor/edit/${value}`} type="editar" />
                <ButtonAct to={`/produtor/details/${value}`} type="detalhes" />
            </div>
        );
    }

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
        {
            name: "ProdutorId",
            label: "Ações",
            options: {
                filter: true,
                sort: false,
                customBodyRender: customAcoesRender
            },
        },
    ];

    const setRowProps = () => {
        return {
            style: { cursor: 'pointer' }
        }
    }

    const OnRowsDeleted = (data: any) => {
        console.log(data);
    }

    const options = {
        setRowProps,
        OnRowsDeleted
    };

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="produtor" responsive={Responsive} />
            <Main>
                <MUIDataTable
                    title={"Produtores"}
                    data={produtores}
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