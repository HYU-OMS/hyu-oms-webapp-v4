import * as createError from 'http-errors';
import * as express from 'express';
import * as asyncify from 'express-asyncify';
import * as cors from 'cors';
import * as helmet from 'helmet';

/* To use Typescript types */
import { Application } from 'express';
import { CustomRequest, CustomResponse } from "../../custom-types";

import api_v4 from './v4';

const app: Application = asyncify(express());

/* 기본 설정 */
app.enable("trust proxy");
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API Version 4 */
app.use("/v4", api_v4);

/* catch 404 and forward to error handler */
app.use(async (req: CustomRequest, res: CustomResponse, next: any) => {
  next(createError(404, "Requested URI does not exists.", {
    state: 'URI_NOT_EXISTS'
  }));
});

/* error handler */
app.use(async (err: any, req: CustomRequest, res: CustomResponse) => {
  const status_code: number = err.status || 500;

  /* development 환경일 경우 콘솔에 error 표시 */
  if(process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  if(parseInt((status_code / 10).toString(), 10) === 50) {
    res.status(status_code);
    res.json({
      message: 'Internal server error',
      state: err.state
    });
  }
  else {
    res.status(status_code);
    res.json(err);
  }
});


export default app;