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


const routes = Router();
const upload = multer(uploadConfig);

routes.post('/user/register', upload.single('image'), UsersControllers.register);
routes.post('/user/login', UsersControllers.login);

routes.get('/produtores',ProdutoresControllers.index);
routes.get('/produtores/:id',ProdutoresControllers.show);
routes.post('/produtores', ProdutoresControllers.create);
routes.put('/produtores', ProdutoresControllers.update);
routes.delete('/produtores/:id', ProdutoresControllers.delete);

routes.get('/contas',ContasControllers.index);
routes.get('/contas/:id', ContasControllers.show);
routes.post('/contas',ContasControllers.create);
routes.put('/contas',ContasControllers.update);
routes.delete('/contas/:id', ContasControllers.delete);

routes.get('/propriedades', PropriedadesControllers.index);
routes.get('/propriedades/:id', PropriedadesControllers.show);
routes.post('/propriedades', PropriedadesControllers.create);
routes.put('/propriedades', PropriedadesControllers.update);
routes.delete('/propriedades/:id', PropriedadesControllers.delete);

routes.get('/tanques', TanquesControllers.index);
routes.get('/tanques/:id', TanquesControllers.show);
routes.post('/tanques', upload.single('image'), TanquesControllers.create);
routes.put('/tanques', upload.single('image'), TanquesControllers.update);
routes.delete('/tanques/:id', TanquesControllers.delete);

routes.get('/prodtanques', ProdutoresTanquesControllers.index);
routes.get('/prodtanques/:id', ProdutoresTanquesControllers.show);
routes.post('/prodtanques', ProdutoresTanquesControllers.create);
routes.delete('/prodtanques/:id', ProdutoresTanquesControllers.delete);

routes.get('/info', InfoControllers.index);

routes.get('/relatorio', RelatorioControllers.gerar);

export default routes;