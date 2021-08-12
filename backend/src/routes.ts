import { Router } from 'express';
import ProdutoresControllers from './controllers/ProdutoresControllers';
import ContasControllers from './controllers/ContasControllers';


const routes = Router();

routes.get('/produtores',ProdutoresControllers.index);
routes.get('/produtores/:id',ProdutoresControllers.show);
routes.post('/produtores', ProdutoresControllers.create);
routes.get('/contas',ContasControllers.index);
routes.get('/contas/:id', ContasControllers.show);
routes.post('/contas',ContasControllers.create);

export default routes;