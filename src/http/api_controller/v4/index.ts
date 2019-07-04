import * as createError from 'http-errors';
import * as express from 'express';
import * as asyncify from 'express-asyncify';
import * as helmet from 'helmet';
import * as jwt from 'jsonwebtoken';

/* To use Typescript types */
import { Application, Request, Response } from 'express';

const app: Application = asyncify(express());

/* 기본 설정 */
app.use(helmet());

// TODO: 여기에 각 route 에 해당하는 controller 를 연결하게 된다.

/* 서버 Alive 체크를 위한 것 */
app.get("/", async (req: Request, res: Response, next: any) => {
  res.status(200);
  res.json({
    "version": "4.0"
  });
});

export default app;