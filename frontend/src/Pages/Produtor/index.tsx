import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Api from '../../Services/Api';
import { Props } from '../../Types';
import { Produtor as IProdutor, RowsDeleted } from '../../Interfaces';
import ButtonAct from '../../Components/ButtonAct';
import { useDispatch } from 'react-redux';
import { ProdutoresActive } from '../../Actions/PageActiveActions';

const Produtor = ({ Logo, UserImg }: Props) => {
    const dispatch = useDispatch();

    dispatch(ProdutoresActive());

    const location = useLocation();

    const [produtores, setProdutores] = useState<IProdutor[]>([]);

    useEffect(() => {
        Api.get('/produtores')
            .then(response => {
                setProdutores(response.data);
            });
    }, [location]);

    const customAcoesRender = (value: string) => {
        return (
            <div className="div-act">
                <ButtonAct to={`/produtor/contas/${value}`} type="contas" />
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

    const onRowsDelete = (rowsDeleted: RowsDeleted, newTableData: any) => {

        rowsDeleted.data.map(async (row) => {

            let produtor = produtores[row.dataIndex];

            await Api.delete(`/produtores/${produtor.ProdutorId}`)
                .then((response) => {
                    alert(response.data.Message);
                })
                .catch(() => {
                    alert("Error");
                });
        });

    }

    const options = {
        setRowProps,
        onRowsDelete
    };

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside UserImg={UserImg} />
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