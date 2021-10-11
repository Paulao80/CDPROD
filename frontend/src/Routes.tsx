import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Landing from './Pages/Landing';
import Login from './Pages/Account/login';
import Register from './Pages/Account/register';
import Manage from './Pages/Account/manage';
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

                {/* -------------------------------------------------------- */}

                <Route path="/account/login" component={Login} exact />
                <PrivateRoute path="/account/register" component={Register} exact />
                <PrivateRoute path="/account/manage" component={Manage} exact />

                {/* -------------------------------------------------------- */}

                <PrivateRoute path="/dashboard" component={Dashboard} />

                {/* -------------------------------------------------------- */}

                <PrivateRoute path="/produtor/create" component={CreateProdutor} />
                <PrivateRoute path="/produtor/details/:id" component={DetailsProdutor} />
                <PrivateRoute path="/produtor/edit/:id" component={EditProdutor} />
                <PrivateRoute path="/produtor/contas/add/:id" component={AddContas} />
                <PrivateRoute path="/produtor/contas/:id" component={Contas} />
                <PrivateRoute path="/produtor" component={Produtor} />

                {/* -------------------------------------------------------- */}

                <PrivateRoute path="/propriedade/create" component={CreatePropriedade} />
                <PrivateRoute path="/propriedade/details/:id" component={DetailsPropriedade} />
                <PrivateRoute path="/propriedade/edit/:id" component={EditPropriedade} />
                <PrivateRoute path="/propriedade" component={Propriedade} />

                {/* -------------------------------------------------------- */}

                <PrivateRoute path="/tanque/create" component={CreateTanque} />
                <PrivateRoute path="/tanque/details/:id" component={DetailsTanque} />
                <PrivateRoute path="/tanque/edit/:id" component={EditTanque} />
                <PrivateRoute path="/tanque/produtores/add/:id" component={AddProdutorTanque} />
                <PrivateRoute path="/tanque/produtores/:id" component={ProdutoresTanques} />
                <PrivateRoute path="/tanque" component={Tanque} />

                {/* -------------------------------------------------------- */}

                <PrivateRoute path="/relatorios" component={Relatorios} />

            </Switch>
        </BrowserRouter>
    );
}

export default Routes;