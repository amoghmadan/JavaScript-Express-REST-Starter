import {STATUS_CODES} from 'http';

import db from '@/models';

/**
 * Authentication middleware.
 * @param {Request} request
 * @param {Response} response
 * @param {NextFunction} next
 * @return {Promise<Response | void>}
 */
export default async function authenticate(request, response, next) {
  const authorization = request.headers?.authorization;
  if (!authorization) {
    return response.status(401).json({detail: STATUS_CODES[401]});
  }
  const values = authorization.split(' ');
  if (values.length !== 2) {
    return response.status(401).json({detail: STATUS_CODES[401]});
  }
  if ('Token'.toLowerCase() !== values[0].toLowerCase()) {
    return response.status(401).json({detail: STATUS_CODES[401]});
  }
  const token = await db.Token.findOne({
    where: {
      key: values[1],
    },
  });
  if (!token) {
    return response.status(403).json({detail: STATUS_CODES[403]});
  }
  const user = await db.User.findByPk(token.userId);
  if (!user) {
    return response.status(403).json({detail: STATUS_CODES[403]});
  }
  request.user = user;
  return next();
}
