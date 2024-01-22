import {STATUS_CODES} from 'http';

import {User} from '@/models';

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
  const user = await User.findOne({
    'token.key': values[1],
  });
  if (!user) {
    return response.status(403).json({detail: STATUS_CODES[403]});
  }
  request.user = user;
  return next();
}
