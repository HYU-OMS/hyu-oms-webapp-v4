import * as createError from 'http-errors';
import * as express from 'express';
import * as asyncify from 'express-asyncify';
import * as helmet from 'helmet';
import * as jwt from 'jsonwebtoken';

/* To use Typescript types */
import { Application } from 'express';
import { CustomRequest, CustomResponse } from '../../../custom-types';

/* API v4 config file */
import config from '../../../config';

/* MongoDB models */
import User from '../../../database/models/user';

/* Controllers for each routes */
import user_controller from './routes/user';

const app: Application = asyncify(express());

/* 기본 설정 */
app.use(helmet());

/* JWT 가 Authorization header 또는 URL query 'jwt' 에 존재하는지 확인 */
app.use(async (req: CustomRequest, res: CustomResponse, next: any) => {
  if(Boolean(req.get('Authorization')) === true || Boolean(req.query['jwt']) === true) {
    let token: string = undefined;

    if (Boolean(req.get('Authorization')) === true) {
      const authorization: Array<string> = req.get('Authorization').split(' ');
      if (authorization[0] !== 'Bearer' || authorization.length !== 2) {
        throw createError(400, '\'Authorization\' must be \'Bearer [token]\'.', {
          state: 'AUTH_HEADER_FORMAT_ERR',
          info: ['Authorization']
        });
      }

      token = authorization[1];
    } else {
      token = req.query['jwt'];
    }

    /*
     * 아직 JWT payload 형식을 확정하지 않아서 지금은 any type 으로 지정함.
     * 이후에 payload 형식 확정 시 해당 type 정의해서 any 대신에 사용할 것.
     */
    // TODO: payload 형식 정하기
    let decoded_token: any = undefined;
    try {
      decoded_token = jwt.verify(token, config['v4']['jwt']['secret_key']);
    } catch(err) {
      switch (err.name) {
        case 'TokenExpiredError':
          throw createError(400, err.message, {
            state: 'JWT_EXPIRED_ERR',
            info: ['Authorization']
          });

        case 'JsonWebTokenError':
          throw createError(400, err.message, {
            state: 'JWT_VERIFY_ERR',
            info: ['Authorization']
          });

        default:
          throw err;
      }
    }

    // TODO: 'auth_uuid' 값 검증 프로세스 추가

    /* JWT 에 담긴 User 정보를 검증한다. (존재 여부 및 enabled 상태 확인) */
    const user_info: any = await User.findById(decoded_token['id']);
    if(user_info === null) {
      throw createError(400, 'Request user in JWT not found.', {
        state: 'JWT_USER_NOT_FOUND_ERR',
        info: ['Authorization']
      });
    }
    else if(user_info['enabled'] === false) {
      throw createError(400, 'Request user in JWT is disabled.', {
        state: 'JWT_USER_DISABLED_ERR',
        info: ['Authorization']
      });
    }

    req.user_info = user_info;
  }

  next();
});

/* Attach controllers to each routes */
app.use('/user', user_controller);

/* 서버 Alive 체크를 위한 것 */
app.get('/', async (req: CustomRequest, res: CustomResponse) => {
  res.status(200);
  res.json({
    'version': '4.0'
  });
});

export default app;