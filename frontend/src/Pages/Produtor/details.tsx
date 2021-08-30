import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import Container from '../../Components/Container';
import BtnEdt from '../../Components/ButtonEdt';
import PainelNav from '../../Components/PainelNav';
import { useParams } from 'react-router-dom';
import { GetTipoPessoa, GetEstadoCivil } from '../../Util/Functions';

type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

interface Param {
    id: string;
}

const DetailsProdutor = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {

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

    const { id } = useParams<Param>();

    const produtor = data.filter(obj => obj.ProdutorId === parseInt(id))[0];

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="produtor" responsive={Responsive} />
            <Main>
                <PainelNav to="/produtor" titulo="Detalhes do Produtor" />
                <Container>
                    <div className="dl-ent">
                        <label>Id:</label>
                        <span>{produtor.ProdutorId}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Nome:</label>
                        <span>{produtor.Nome}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Data de Nascimento:</label>
                        <span>{produtor.DataNasc}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Tipo de Pessoa:</label>
                        <span>{GetTipoPessoa(produtor.TipoPessoa)}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Nacionalidade:</label>
                        <span>{produtor.Nacionalidade}</span>
                    </div>
                    <div className="dl-ent">
                        <label>CPF/CNPJ:</label>
                        <span>{produtor.CpfCnpj}</span>
                    </div>
                    <div className="dl-ent">
                        <label>RG:</label>
                        <span>{produtor.RG}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Orgão de Expedição:</label>
                        <span>{produtor.OrgaoExp}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Estado de Expedição:</label>
                        <span>{produtor.EstadoExp}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Data de Expedição:</label>
                        <span>{produtor.DataExp}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Estado Civil:</label>
                        <span>{GetEstadoCivil(produtor.EstadoCivil)}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Telefone:</label>
                        <span>{produtor.Telefone}</span>
                    </div>
                    <div className="dl-ent">
                        <label>Ultimo Laticinio:</label>
                        <span>{produtor.UltLaticinio}</span>
                    </div>
                </Container>
            </Main>
            <BtnEdt to={`/produtor/edit/${produtor.ProdutorId}`} />
            <Footer />
        </>
    );
}

export default DetailsProdutor;