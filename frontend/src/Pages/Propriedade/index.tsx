import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { useLocation } from 'react-router-dom';
import { Propriedade as IPropriedade, RowsDeleted } from '../../Interfaces';
import { useState, useEffect } from 'react';
import Api from '../../Services/Api';
import ButtonAct from '../../Components/ButtonAct';
import { useDispatch } from 'react-redux';
import { PropriedadesActive } from '../../Actions/PageActiveActions';
import Logo from '../../Assets/images/logo.png';

const Propriedade = () => {
    const dispatch = useDispatch();

    dispatch(PropriedadesActive());

    const location = useLocation();

    const [Propriedades, setPropriedades] = useState<IPropriedade[]>([]);

    useEffect(() => {
        Api.get('/propriedades')
            .then((response) => {
                setPropriedades(response.data);
            })
    }, [location]);

    const customProdutorRender = (value: IPropriedade) => {
        return value.Nome;
    }

    const customAcoesRender = (value: string) => {
        return (
            <div className="div-act">
                <ButtonAct to={`/propriedade/edit/${value}`} type="editar" />
                <ButtonAct to={`/propriedade/details/${value}`} type="detalhes" />
            </div>
        );
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
                customBodyRender: customProdutorRender
            }
        },
        {
            name: "PropriedadeId",
            label: "Ações",
            options: {
                filter: true,
                sort: false,
                customBodyRender: customAcoesRender
            }
        },
    ];

    const setRowProps = () => {
        return {
            style: { cursor: 'pointer' }
        }
    }


    const onRowsDelete = (rowsDeleted: RowsDeleted, newTableData: any) => {

        rowsDeleted.data.map(async (row) => {

            let propriedade = Propriedades[row.dataIndex];

            await Api.delete(`/propriedades/${propriedade.PropriedadeId}`)
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
            <Aside />
            <Main>
                <MUIDataTable
                    title="Propriedades"
                    data={Propriedades}
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