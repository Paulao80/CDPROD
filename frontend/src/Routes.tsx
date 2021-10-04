import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logoImg from './Assets/images/logo.png';
import userImg from './Assets/images/anonimos.jpg';
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
import Contas from './Pages/Produtor/contas';
import AddContas from './Pages/Produtor/add';
import CreatePropriedade from './Pages/Propriedade/create';
import DetailsPropriedade from './Pages/Propriedade/details';
import EditPropriedade from './Pages/Propriedade/edit';
import CreateTanque from './Pages/Tanque/create';
import DetailsTanque from './Pages/Tanque/details';
import EditTanque from './Pages/Tanque/edit';
import ProdutoresTanques from './Pages/Tanque/produtores';
import AddProdutorTanque from './Pages/Tanque/add';

const Routes = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Landing} exact />

                <Route path="/login" component={Login} exact />

                <Route path="/dashboard">
                    <Dashboard Logo={logoImg} UserImg={userImg} />
                </Route>

                <Route path="/produtor">
                    <Produtor Logo={logoImg} UserImg={userImg} />
                    <Route path="/produtor/create">
                        <CreateProdutor Logo={logoImg} UserImg={userImg} />
                    </Route>
                    <Route path="/produtor/details/:id">
                        <DetailsProdutor Logo={logoImg} UserImg={userImg} />
                    </Route>
                    <Route path="/produtor/edit/:id">
                        <EditProdutor Logo={logoImg} UserImg={userImg} />
                    </Route>
                    <Route path="/produtor/contas">
                        <Route path="/produtor/contas/:id">
                            <Contas Logo={logoImg} UserImg={userImg} />
                        </Route>
                        <Route path="/produtor/contas/:id/add">
                            <AddContas Logo={logoImg} UserImg={userImg} />
                        </Route>
                    </Route>
                </Route>

                <Route path="/propriedade">
                    <Propriedade Logo={logoImg} UserImg={userImg} />
                    <Route path="/propriedade/create">
                        <CreatePropriedade Logo={logoImg} UserImg={userImg} />
                    </Route>
                    <Route path="/propriedade/details/:id">
                        <DetailsPropriedade Logo={logoImg} UserImg={userImg} />
                    </Route>
                    <Route path="/propriedade/edit/:id">
                        <EditPropriedade Logo={logoImg} UserImg={userImg} />
                    </Route>
                </Route>

                <Route path="/tanque">
                    <Tanque Logo={logoImg} UserImg={userImg} />
                    <Route path="/tanque/create">
                        <CreateTanque Logo={logoImg} UserImg={userImg} />
                    </Route>
                    <Route path="/tanque/details/:id">
                        <DetailsTanque Logo={logoImg} UserImg={userImg} />
                    </Route>
                    <Route path="/tanque/edit/:id">
                        <EditTanque Logo={logoImg} UserImg={userImg} />
                    </Route>
                    <Route path="/tanque/produtores">
                        <Route path="/tanque/produtores/:id">
                            <ProdutoresTanques Logo={logoImg} UserImg={userImg} />
                        </Route>

                        <Route path="/tanque/produtores/:id/add">
                            <AddProdutorTanque Logo={logoImg} UserImg={userImg} />
                        </Route>
                    </Route>
                </Route>

                <Route path="/relatorios">
                    <Relatorios Logo={logoImg} UserImg={userImg} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;