import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import { useLocation, useParams } from 'react-router-dom';
import PainelNav from '../../Components/PainelNav';
import { Props } from '../../Types';
import { useState, useEffect } from 'react';
import Api from '../../Services/Api';
import { Tanque, Produtor, RowsDeleted } from '../../Interfaces';

interface Param {
    id: string;
}

const ProdutoresTanques = ({ Logo, UserImg, Responsive, BtnState, HambClick }: Props) => {
    const { id } = useParams<Param>();
    const location = useLocation();

    const [tanque, setTanque] = useState<Tanque>({} as Tanque);

    useEffect(() => {
        Api.get(`/tanques/${id}`).then((response) => {
            setTanque(response.data);
        });
    }, [location, id]);

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

    const onRowsDelete = (rowsDeleted: RowsDeleted, newTableData: any) => {

        rowsDeleted.data.map(async (row) => {

            let prodTanque = tanque.ProdutoresTanques[row.dataIndex];

            await Api.delete(`/prodtanques/${prodTanque.ProdutorTanqueId}`)
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