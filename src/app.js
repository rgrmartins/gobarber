import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    // Inicializando o Sentry
    Sentry.init(sentryConfig);

    // instanciando os 2 métodos
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    // Instanciando o Sentry antes de qualquer outro middleware
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    // Necessário após todas as rotas citar o error do Sentry
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // Middleware de tratamento de erros
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // Só retorna em desenvolvimento (Produção usa o Sentry)
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

export default new App().server;
