import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logoImg from './Assets/images/logo.png';
import userImg from './Assets/images/anonimos.jpg';
import { useState } from 'react';
import Home from './Pages/Home';
import Produtor from './Pages/Produtor';
import Propriedade from './Pages/Propriedade';
import Tanque from './Pages/Tanque';
import Relatorios from './Pages/Relatorios';

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
                <Route path="/" exact>
                    <Home Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                </Route>
                <Route path="/produtor">
                    <Produtor Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                </Route>
                <Route path="/propriedade">
                    <Propriedade Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                </Route>
                <Route path="/tanque">
                    <Tanque Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                </Route>
                <Route path="/relatorios">
                    <Relatorios Logo={logoImg} UserImg={userImg} Responsive={responsive} BtnState={btnState} HambClick={HambClick} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;