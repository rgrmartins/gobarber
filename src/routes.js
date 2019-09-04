import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

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

// Rota para Agendamento
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

// Rota para listar Agendamento do prestador de serviço
routes.get('/schedule', ScheduleController.index);

// Rota de carregamento de notificações do provider
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Rota de Upload de arquivos
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
