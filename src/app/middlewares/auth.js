// Middleware responsável por verificar se o usuário está autenticado
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // TODO verificar como esta sendo feito esse método promissify, pois está gerando erro
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Incluir id do usuário nas requisições depois de decodificar
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid.' });
  }
};
