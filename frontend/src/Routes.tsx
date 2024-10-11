import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Account/login";
import Register from "./Pages/Account/register";
import Manage from "./Pages/Account/manage";
import ForgotPassword from "./Pages/Account/forgotPassword";
import ForgotPasswordConfirmation from "./Pages/Account/forgotPasswordConfirmation";
import ResetPassword from "./Pages/Account/resetPassword";
import Dashboard from "./Pages/Dashboard";
import Produtor from "./Pages/Produtor";
import Propriedade from "./Pages/Propriedade";
import Tanque from "./Pages/Tanque";
import Relatorios from "./Pages/Relatorios";
import CreateProdutor from "./Pages/Produtor/create";
import DetailsProdutor from "./Pages/Produtor/details";
import EditProdutor from "./Pages/Produtor/edit";
import Contas from "./Pages/Produtor/contas";
import CreatePropriedade from "./Pages/Propriedade/create";
import DetailsPropriedade from "./Pages/Propriedade/details";
import EditPropriedade from "./Pages/Propriedade/edit";
import CreateTanque from "./Pages/Tanque/create";
import DetailsTanque from "./Pages/Tanque/details";
import EditTanque from "./Pages/Tanque/edit";
import ProdutoresTanques from "./Pages/Tanque/produtores";
import Protected from "./Components/Protected";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/account/login" element={<Login />} />
        <Route
          path="/account/register"
          element={<Protected Component={Register} />}
        />
        {/* <Route path="/account/register" element={<Register />} /> */}

        <Route
          path="/account/manage"
          element={<Protected Component={Manage} />}
        />
        <Route path="/account/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/account/forgot-password-confirmation"
          element={<ForgotPasswordConfirmation />}
        />
        <Route path="/account/reset-password" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={<Protected Component={Dashboard} />}
        />

        <Route
          path="/produtor/create"
          element={<Protected Component={CreateProdutor} />}
        />
        <Route
          path="/produtor/details/:id"
          element={<Protected Component={DetailsProdutor} />}
        />
        <Route
          path="/produtor/edit/:id"
          element={<Protected Component={EditProdutor} />}
        />
        <Route
          path="/produtor/contas/:id"
          element={<Protected Component={Contas} />}
        />
        <Route path="/produtor" element={<Protected Component={Produtor} />} />

        <Route
          path="/propriedade/create"
          element={<Protected Component={CreatePropriedade} />}
        />
        <Route
          path="/propriedade/details/:id"
          element={<Protected Component={DetailsPropriedade} />}
        />
        <Route
          path="/propriedade/edit/:id"
          element={<Protected Component={EditPropriedade} />}
        />
        <Route
          path="/propriedade"
          element={<Protected Component={Propriedade} />}
        />

        <Route
          path="/tanque/create"
          element={<Protected Component={CreateTanque} />}
        />
        <Route
          path="/tanque/details/:id"
          element={<Protected Component={DetailsTanque} />}
        />
        <Route
          path="/tanque/edit/:id"
          element={<Protected Component={EditTanque} />}
        />
        <Route
          path="/tanque/produtores/:id"
          element={<Protected Component={ProdutoresTanques} />}
        />
        <Route path="/tanque" element={<Protected Component={Tanque} />} />

        <Route
          path="/relatorios"
          element={<Protected Component={Relatorios} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
