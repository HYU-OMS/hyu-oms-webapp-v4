import * as express from 'express';
import * as asyncify from 'express-asyncify';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as httpProxy from 'http-proxy';
import * as http from 'http';
import * as path from 'path';

/* To use Typescript types */
import { Application, Request, Response } from 'express';

import api_controller from './api_controller';

const app: Application = asyncify(express());

/* Development 일 경우 console 에 log 표시 */
if(process.env.NODE_ENV !== "production") {
  app.use(logger('dev'));
}

/* 기본 설정 */
app.enable("trust proxy");
app.use(helmet());

/* "/api" 로 들어오는 모든 요청은 아래 handler 가 처리하게 됨. */
app.use("/api", api_controller);

/*
 * 이 부분은 Static File 을 serve 하는 코드임.
 * NODE_ENV 에 따라 Static file serve 방식을 다르게 함
 */
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../', 'react-app', 'build')));
}
else {
  const proxy: httpProxy = httpProxy.createProxyServer({});
  app.use(async (req: Request, res: Response) => {
    proxy.web(req, res, { target: 'http://localhost:8899' });
  });
}

/* HTTP 서버를 생성 후 export */
const server: http.Server = http.createServer(app);
export default server;