import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import UsersControllers from './controllers/UsersControllers';
import ProdutoresControllers from './controllers/ProdutoresControllers';
import ContasControllers from './controllers/ContasControllers';
import PropriedadesControllers from './controllers/PropriedadesControllers';
import TanquesControllers from './controllers/TanquesControllers';
import ProdutoresTanquesControllers from './controllers/ProdutoresTanquesControllers';
import InfoControllers from './controllers/InfoControllers';
import RelatorioControllers from './controllers/RelatorioControllers';
import Auth from './controllers/AuthController';


const routes = Router();
const upload = multer(uploadConfig);

routes.post('/user/register', upload.single('image'), UsersControllers.register);
routes.post('/user/login', UsersControllers.login);
routes.get('/user/:id', Auth.verify, UsersControllers.show);

routes.get('/produtores', Auth.verify, ProdutoresControllers.index);
routes.get('/produtores/:id', Auth.verify, ProdutoresControllers.show);
routes.post('/produtores', Auth.verify, ProdutoresControllers.create);
routes.put('/produtores', Auth.verify, ProdutoresControllers.update);
routes.delete('/produtores/:id', Auth.verify, ProdutoresControllers.delete);

routes.get('/contas', Auth.verify, ContasControllers.index);
routes.get('/contas/:id', Auth.verify, ContasControllers.show);
routes.post('/contas', Auth.verify, ContasControllers.create);
routes.put('/contas', Auth.verify, ContasControllers.update);
routes.delete('/contas/:id', Auth.verify, ContasControllers.delete);

routes.get('/propriedades', Auth.verify, PropriedadesControllers.index);
routes.get('/propriedades/:id', Auth.verify, PropriedadesControllers.show);
routes.post('/propriedades', Auth.verify, PropriedadesControllers.create);
routes.put('/propriedades', Auth.verify, PropriedadesControllers.update);
routes.delete('/propriedades/:id', Auth.verify, PropriedadesControllers.delete);

routes.get('/tanques', Auth.verify, TanquesControllers.index);
routes.get('/tanques/:id', Auth.verify, TanquesControllers.show);
routes.post('/tanques', Auth.verify, upload.single('image'), TanquesControllers.create);
routes.put('/tanques', Auth.verify, upload.single('image'), TanquesControllers.update);
routes.delete('/tanques/:id', Auth.verify, TanquesControllers.delete);

routes.get('/prodtanques', Auth.verify, ProdutoresTanquesControllers.index);
routes.get('/prodtanques/:id', Auth.verify, ProdutoresTanquesControllers.show);
routes.post('/prodtanques', Auth.verify, ProdutoresTanquesControllers.create);
routes.delete('/prodtanques/:id', Auth.verify, ProdutoresTanquesControllers.delete);

routes.get('/info', Auth.verify , InfoControllers.index);

routes.get('/relatorio', Auth.verify, RelatorioControllers.gerar);

export default routes;