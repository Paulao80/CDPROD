import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logoImg from './Assets/images/logo.png';
import userImg from './Assets/images/anonimos.jpg';
import Home from './Pages/Home';
import Produtor from './Pages/Produtor';
import Propriedade from './Pages/Propriedade';
import Tanque from './Pages/Tanque';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home Logo={logoImg} UserImg={userImg} />
                </Route>
                <Route path="/produtor">
                    <Produtor Logo={logoImg} UserImg={userImg} />
                </Route>
                <Route path="/propriedade">
                    <Propriedade Logo={logoImg} UserImg={userImg} />
                </Route>
                <Route path="/tanque">
                    <Tanque Logo={logoImg} UserImg={userImg} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;