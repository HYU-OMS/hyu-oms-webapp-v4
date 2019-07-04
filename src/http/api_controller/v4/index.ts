import * as createError from 'http-errors';
import * as express from 'express';
import * as asyncify from 'express-asyncify';
import * as helmet from 'helmet';
import * as jwt from 'jsonwebtoken';

/* To use Typescript types */
import { Application } from 'express';
import { CustomRequest, CustomResponse } from '../../../custom-types';

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
        throw createError(400, "'Authorization' must be 'Bearer [token]'.", {
          state: 'AUTH_HEADER_FORMAT_ERR',
          info: ['Authorization']
        });
      }

      token = authorization[1];
    } else {
      token = req.query['jwt'];
    }

    // TODO: token decode 코드를 작성한다.
  }

  next();
});

// TODO: 여기에 각 route 에 해당하는 controller 를 연결하게 된다.

/* 서버 Alive 체크를 위한 것 */
app.get("/", async (req: CustomRequest, res: CustomResponse) => {
  res.status(200);
  res.json({
    "version": "4.0"
  });
});

export default app;