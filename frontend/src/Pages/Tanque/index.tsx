import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";
import ButtonAdd from '../../Components/ButtonAdd';
import ButtonAct from '../../Components/ButtonAct';
import { Props } from '../../Types';
import { Tanque as ITanque } from '../../Interfaces';
import { useState, useEffect } from 'react';
import Api from '../../Services/Api';
import { useLocation } from 'react-router-dom';

const Tanque = ({ Logo, UserImg, Responsive, BtnState, HambClick }: Props) => {
    const location = useLocation();

    const [Tanques, setTanques] = useState<ITanque[]>([]);

    useEffect(() => {
        Api.get('/tanques')
            .then((response) => {
                setTanques(response.data);
            })
    }, [location]);

    const customFotoRender = (value: string) => {
        return (
            <img className="img-tanque" src={value} alt="Foto" />
        );
    }

    const customAcoesRender = (value: string) => {
        return (
            <div className="div-act">
                <ButtonAct to={`/tanque/produtores/${value}`} type="produtores" />
                <ButtonAct to={`/tanque/edit/${value}`} type="editar" />
                <ButtonAct to={`/tanque/details/${value}`} type="detalhes" />
            </div>
        );
    }

    const columns = [
        {
            name: "FotoPath",
            label: "Foto",
            options: {
                filter: false,
                sort: false,
                customBodyRender: customFotoRender
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
        },
        {
            name: "TanqueId",
            label: "Ações",
            options: {
                filter: true,
                sort: false,
                customBodyRender: customAcoesRender
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
                <MUIDataTable
                    title="Tanques"
                    data={Tanques}
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