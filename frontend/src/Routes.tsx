import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logoImg from './Assets/images/logo.png';
import userImg from './Assets/images/anonimos.jpg';
import { useState } from 'react';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Produtor from './Pages/Produtor';
import Propriedade from './Pages/Propriedade';
import Tanque from './Pages/Tanque';
import Relatorios from './Pages/Relatorios';
import CreateProdutor from './Pages/Produtor/create';
import DetailsProdutor from './Pages/Produtor/details';
import EditProdutor from './Pages/Produtor/edit';
import CreatePropriedade from './Pages/Propriedade/create';
import DetailsPropriedade from './Pages/Propriedade/details';
import EditPropriedade from './Pages/Propriedade/edit';
import CreateTanque from './Pages/Tanque/create';
import DetailsTanque from './Pages/Tanque/details';
import ProdutoresTanques from './Pages/Tanque/produtores';
import AddProdutorTanque from './Pages/Tanque/add';

const Routes = () => {
    const [responsive, setResponsive] = useState('responsive-none');
    const [btnState, SetBtnState] = useState('btn-off');

    const HambClick = () => {
        if (responsive === 'responsive-none' && btnState === 'btn-off') {
            setResponsive('responsive-show');
            SetBtnState('btn-on');
        }
        else {
            setResponsive('responsive-none');
            SetBtnState('btn-off');
        }
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />

                <Route path="/login" component={Login} exact />

                <Route path="/dashboard">
                    <Dashboard Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                </Route>

                <Route path="/produtor">
                    <Produtor Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    <Route path="/produtor/create">
                        <CreateProdutor Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    </Route>
                    <Route path="/produtor/details/:id">
                        <DetailsProdutor Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    </Route>
                    <Route path="/produtor/edit/:id">
                        <EditProdutor Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    </Route>
                </Route>

                <Route path="/propriedade">
                    <Propriedade Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    <Route path="/propriedade/create">
                        <CreatePropriedade Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    </Route>
                    <Route path="/propriedade/details/:id">
                        <DetailsPropriedade Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    </Route>
                    <Route path="/propriedade/edit/:id">
                        <EditPropriedade Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    </Route>
                </Route>

                <Route path="/tanque">
                    <Tanque Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    <Route path="/tanque/create">
                        <CreateTanque Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    </Route>
                    <Route path="/tanque/details/:id">
                        <DetailsTanque Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                    </Route>
                    <Route path="/tanque/produtores">
                        <Route path="/tanque/produtores/:id">
                            <ProdutoresTanques Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                        </Route>

                        <Route path="/tanque/produtores/:id/add">
                            <AddProdutorTanque Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                        </Route>
                    </Route>
                </Route>

                <Route path="/relatorios">
                    <Relatorios Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;