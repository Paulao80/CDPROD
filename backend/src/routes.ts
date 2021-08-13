import { Router } from 'express';
import ProdutoresControllers from './controllers/ProdutoresControllers';
import ContasControllers from './controllers/ContasControllers';
import PropriedadesControllers from './controllers/PropriedadesControllers';


const routes = Router();

routes.get('/produtores',ProdutoresControllers.index);
routes.get('/produtores/:id',ProdutoresControllers.show);
routes.post('/produtores', ProdutoresControllers.create);
routes.get('/contas',ContasControllers.index);
routes.get('/contas/:id', ContasControllers.show);
routes.post('/contas',ContasControllers.create);
routes.get('/propriedades', PropriedadesControllers.index);
routes.get('/propriedades/:id', PropriedadesControllers.show);
routes.post('/propriedades', PropriedadesControllers.create);

export default routes;