import MUIDataTable from 'mui-datatables';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Aside from '../../Components/Aside';
import ButtonAdd from '../../Components/ButtonAdd';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import Main from '../../Components/Main';
import PainelNav from '../../Components/PainelNav';
import { Produtor, RowsDeleted } from '../../Interfaces';
import Api from '../../Services/Api';
import './style.css';
import Logo from '../../Assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { ProdutoresActive } from '../../Actions/PageActiveActions';

interface Param {
    id: string;
}

const Contas = () => {
    const dispatch = useDispatch();

    dispatch(ProdutoresActive());

    const { id } = useParams<Param>();
    const location = useLocation();

    const [produtor, setProdutor] = useState<Produtor>({} as Produtor);

    useEffect(() => {
        Api.get(`/produtores/${id}`).then(response => {
            setProdutor(response.data);
        });
    }, [id, location]);

    const columns = [
        {
            name: "ContaId",
            label: "ID",
            options: {
                filter: true,
                sort: false
            },
        },
        {
            name: "NomePertence",
            label: "Nome",
            options: {
                filter: true,
                sort: true
            },
        },
        {
            name: "Banco",
            label: "Banco",
            options: {
                filter: true,
                sort: false
            },
        },
        {
            name: "Agencia",
            label: "Agencia",
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: "Conta",
            label: "Conta",
            options: {
                filter: true,
                sort: false
            }
        }
    ];

    const setRowProps = () => {
        return {
            style: { cursor: 'pointer' }
        }
    }

    const onRowsDelete = (rowsDeleted: RowsDeleted, newTableData: any) => {

        rowsDeleted.data.map(async (row) => {

            let conta = produtor.ContasBancarias ? produtor.ContasBancarias[row.dataIndex] : null;

            if (conta) {
                await Api.delete(`/contas/${conta.ContaId}`)
                    .then((response) => {
                        alert(response.data.Message);
                    })
                    .catch(() => {
                        alert("Error");
                    });
            }
        });

    }

    const options = {
        setRowProps,
        onRowsDelete
    };

    return (
        <>
            <Header logo={Logo} titulo="CDTR" />
            <Aside />
            <Main>
                <PainelNav to={`/produtor`} titulo="Contas" />
                <MUIDataTable
                    title={""}
                    data={produtor.ContasBancarias ? produtor.ContasBancarias : []}
                    columns={columns}
                    options={options}
                />
            </Main>
            <ButtonAdd to={`/produtor/contas/add/${produtor.ProdutorId}`} />
            <Footer />
        </>
    );
}

export default Contas;