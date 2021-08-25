import './style.css';
import Header from '../../Components/Header';
import Aside from '../../Components/Aside';
import Footer from '../../Components/Footer';
import Main from '../../Components/Main';
import MUIDataTable from "mui-datatables";



type props = {
    Logo: string;
    UserImg: string;
    Responsive: string;
    BtnState: string;
    HambClick: Function;
}

const Produtor = ({ Logo, UserImg, Responsive, BtnState, HambClick }: props) => {

    const columns = [
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "company",
            label: "Company",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "city",
            label: "City",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "state",
            label: "State",
            options: {
                filter: true,
                sort: false,
            },
        },
    ];

    const data = [
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
        {
            name: "Joe James",
            company: "Test Corp",
            city: "Yonkers",
            state: "NY",
        },
        {
            name: "John Walsh",
            company: "Test Corp",
            city: "Hartford",
            state: "CT",
        },
        {
            name: "Bob Herm",
            company: "Test Corp",
            city: "Tampa",
            state: "FL",
        },
        {
            name: "James Houston",
            company: "Test Corp",
            city: "Dallas",
            state: "TX",
        },
    ];

    return (
        <>
            <Header logo={Logo} titulo="CDTR" responsive={Responsive} btnState={BtnState} onHambClick={HambClick} />
            <Aside UserImg={UserImg} Active="produtor" responsive={Responsive} />
            <Main>
                <MUIDataTable
                    title={"Produtores"}
                    data={data}
                    columns={columns}
                />
            </Main>
            <Footer />
        </>
    )
}

export default Produtor;