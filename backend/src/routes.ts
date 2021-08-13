import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import ProdutoresControllers from './controllers/ProdutoresControllers';
import ContasControllers from './controllers/ContasControllers';
import PropriedadesControllers from './controllers/PropriedadesControllers';
import TanquesControllers from './controllers/TanquesControllers';


const routes = Router();
const upload = multer(uploadConfig);

routes.get('/produtores',ProdutoresControllers.index);
routes.get('/produtores/:id',ProdutoresControllers.show);
routes.post('/produtores', ProdutoresControllers.create);
routes.get('/contas',ContasControllers.index);
routes.get('/contas/:id', ContasControllers.show);
routes.post('/contas',ContasControllers.create);
routes.get('/propriedades', PropriedadesControllers.index);
routes.get('/propriedades/:id', PropriedadesControllers.show);
routes.post('/propriedades', PropriedadesControllers.create);
routes.get('/tanques', TanquesControllers.index);
routes.get('/tanques/:id', TanquesControllers.show);
routes.post('/tanques', upload.single('image'), TanquesControllers.create);

export default routes;