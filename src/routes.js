import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rota para Criar Usuários
routes.post('/users', UserController.store);
// Rota para Logar
routes.post('/sessions', SessionController.store);

//  ------- só executará nas rotas abaixo dele ----------
routes.use(authMiddleware);

// Rota para Atualizar Usuários
routes.put('/users', UserController.update);

// Rota para listar os usuários (Providers)
routes.get('/provider', ProviderController.index);

// Rota de Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
